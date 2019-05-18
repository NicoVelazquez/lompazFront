import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import * as UIkit from 'uikit';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input() comments: any;
  @Input() rating: number;
  @Input() productId: string;
  total5 = 0;
  total4 = 0;
  total3 = 0;
  total2 = 0;
  total1 = 0;
  flag = false;
  user: any;

  constructor(private productService: ProductService, private userService: UserService, private auth: AuthService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(data => {
      this.user = data;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.comments !== undefined) {
      if (changes.comments.currentValue !== undefined) {
        this.total5 = this.comments.filter(c => c.rating === 5).length;
        this.total4 = this.comments.filter(c => c.rating === 4).length;
        this.total3 = this.comments.filter(c => c.rating === 3).length;
        this.total2 = this.comments.filter(c => c.rating === 2).length;
        this.total1 = this.comments.filter(c => c.rating === 1).length;
      }
    }
  }

  addComment() {
    this.flag = !this.flag;
  }

  saveComment($event) {
    // TODO falta agarrar el usuario logueado
    const newComment = {
      title: $event.comment.title,
      comment: $event.comment.comment,
      rating: $event.rating,
      username: this.user.name + ' ' + this.user.lastname,
      userId: this.auth.getId(),
      date: Date.now()
    };
    this.productService.addProductComment(this.productId, newComment).then(() => {
      UIkit.notification({
        message: 'Comentario agregado exitosamente',
        status: 'primary',
        pos: 'top-right'
      });
    }).catch(err => {
      UIkit.notification({
        message: 'No se ha podido agregar el comentario',
        status: 'primary',
        pos: 'top-right'
      });
      console.log(err);
    });
  }

  deleteComment(id: string) {
    this.productService.deleteComment(this.productId, id).then(() => {
      UIkit.notification({
        message: 'Comentario eliminado exitosamente',
        status: 'primary',
        pos: 'top-right'
      });
    });
  }

}
