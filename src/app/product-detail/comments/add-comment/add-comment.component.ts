import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit, OnChanges {

  @Output() cancelComment = new EventEmitter<string>();
  @Output() saveComment = new EventEmitter<any>();
  public commentForm: FormGroup;
  public rating = 1;
  public today = new Date();
  @Input() user: any;

  constructor(private fb: FormBuilder) {
    this.commentForm = fb.group({
      'title': new FormControl(null, [Validators.required]),
      'comment': new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }


  save() {
    const newComment = {comment: this.commentForm.value, rating: this.rating};
    this.saveComment.emit(newComment);
    this.cancel();
  }

  cancel() {
    this.rating = 1;
    this.commentForm.reset();
    this.cancelComment.emit();
  }

  updateRating(event: any) {
    this.rating = event.rating;
  }
}
