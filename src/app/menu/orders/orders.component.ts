import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @Input() orders;

  headers: string[] = ['', 'Id', 'Estado', 'Fecha', 'Cantidad de Productos'];

  constructor() { }

  ngOnInit() {
  }

}
