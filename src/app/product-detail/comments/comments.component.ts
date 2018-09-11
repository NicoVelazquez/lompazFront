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

  constructor() {
  }

  ngOnInit() {
    this.total5 = this.comments.filter(c => c.rating === 5).length;
    this.total4 = this.comments.filter(c => c.rating === 4).length;
    this.total3 = this.comments.filter(c => c.rating === 3).length;
    this.total2 = this.comments.filter(c => c.rating === 2).length;
    this.total1 = this.comments.filter(c => c.rating === 1).length;
  }

}
