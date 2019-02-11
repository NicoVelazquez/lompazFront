import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comments: any;
  @Input() rating: number;
  total5 = 0;
  total4 = 0;
  total3 = 0;
  total2 = 0;
  total1 = 0;
  flag = false;

  constructor() {
  }

  ngOnInit() {
    this.total5 = this.comments.filter(c => c.rating === 5).length;
    this.total4 = this.comments.filter(c => c.rating === 4).length;
    this.total3 = this.comments.filter(c => c.rating === 3).length;
    this.total2 = this.comments.filter(c => c.rating === 2).length;
    this.total1 = this.comments.filter(c => c.rating === 1).length;
    console.log(this.total1);
  }

  addComment() {
    this.flag = !this.flag;
  }

  saveComment($event) {
    // El usuario con el que estoy logueado lo puede agarrar desde el back
    // y la fecha tambien
    // falta el rating desde el otro componente
    console.log($event);
    const comment = {
      title: $event.title,
      comment: $event.comment,
      rating: 5,
      username: 'Prueba',
      date: '02/08/2019'
    };
    this.comments.unshift(comment);
  }

}
