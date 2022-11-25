import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SearchComponent implements AfterViewInit {
  constructor(private router: Router) {}
  @ViewChild('searchInput') inputElement?: ElementRef;

  enteredSearchValue: string = '';
  @Output() searchTextChanged: EventEmitter<string> =
    new EventEmitter<string>();

  ngAfterViewInit() {
    if (this.inputElement) {
      fromEvent(this.inputElement?.nativeElement, 'keyup')
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(() => {
          this.searchTextChanged.emit(this.inputElement?.nativeElement.value);
        });
    }
  }
}
