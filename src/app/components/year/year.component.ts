import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};


@Component({
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
  ],
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrl: './year.component.scss'
})
export class YearComponent implements OnInit {

  @Input() public formControl!: FormControl;

  @ViewChild('picker', { static: false })
  private picker!: MatDatepicker<Date>;

  public selectYear!: any;
  readonly today = new Date();
  public maxYear!: Date;

  public ngOnInit(){
    const date = new Date();
    date.setFullYear(2035);
    this.maxYear = date;
  }

  chosenYearHandler(ev: any, input: any) {
    let { _d } = ev;
    this.selectYear = _d;
    const year = new Date(this.selectYear).getFullYear();
    this.formControl.setValue(_d);
    this.picker.close()
  }
}



