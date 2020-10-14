import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Output() onChanged = new EventEmitter<any>();
  @Input() pageSize = 3;
  @Input() page = 1;
  @Input() count = 1;

  pageSizes = [3, 6, 9];

  ngOnInit() {

  }

  public pageChange(event) {
    this.page = event;
    this.onChanged.emit();
  }

  public sizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.onChanged.emit();
  }
}
