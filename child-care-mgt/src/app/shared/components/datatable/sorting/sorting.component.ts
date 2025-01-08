import { Component, Input } from '@angular/core';

@Component({
  selector: 'sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {
  @Input() title: string;
  @Input() sortDirection: string;

}
