import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnChanges {

  @Input() orders;

  headers: string[] = ['', 'Id', 'Estado', 'Fecha', 'Cantidad de Productos', '$ Total'];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.orders.firstChange) {
      this.orders.map(o => {
        let total = 0;
        o.products.forEach(p => {
          total += p.price;
        });
        o.total = total;
      });
  }
}

}
