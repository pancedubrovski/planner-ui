import { Component, Input, OnInit } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { months } from '../../Utilites/Months';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-month-autocomplite',
  templateUrl: './month-autocomplite.component.html',
  styleUrl: './month-autocomplite.component.scss'
})
export class MonthAutocompliteComponent implements OnInit {

  @Input() public formControl!: FormControl;

  filteredOptions!: Observable<any[]>;
  
  ngOnInit(): void {


    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }


  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return months.filter(option => option.title.toLowerCase().includes(filterValue));
  }
}
