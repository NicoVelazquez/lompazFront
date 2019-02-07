import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Output() cancelComment = new EventEmitter<string>();
  @Output() saveComment = new EventEmitter<any>();
  public commentForm: FormGroup;
  public rating = 1;
  public today = new Date();

  constructor(private fb: FormBuilder) {
    this.commentForm = fb.group({
      'title': new FormControl(null, [Validators.required]),
      'comment': new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
  }


  save() {
    console.log(this.commentForm.value);
    console.log(this.rating);
    this.saveComment.emit(this.commentForm.value);    // Falta el rating...
    this.cancel();
  }

  cancel() {
    this.commentForm.reset();
    this.cancelComment.emit();
  }

  updateRating(event: any) {
    console.log(event);
  }
}
