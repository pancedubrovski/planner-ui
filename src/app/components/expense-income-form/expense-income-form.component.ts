import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { getMouthByTitle, months } from '../../Utilites/Months';





@Component({
  selector: 'app-expense-income-form',
  templateUrl: './expense-income-form.component.html',
  styleUrl: './expense-income-form.component.scss'
})
export class ExpenseIncomeFormComponent {


  @Output() onSubmitBody = new EventEmitter<any>();
  public decimalAmount?: any;
  public selectedValue!: any;
  @Input() public kind!: string;

  public categories: any = [];
  public formGroup!: FormGroup;

  filteredOptions!: Observable<any[]>;

  @ViewChild('picker', { static: false })
  private picker!: MatDatepicker<Date>;

  public selectYear!: any;
  readonly today = new Date();
  public maxYear!: Date;

  constructor(protected categoryService: CategoryService) { }
  ngOnInit(): void {
    const date = new Date();
    date.setFullYear(2035);
    this.maxYear = date;



    this.categoryService.getCategoies({ kinds: this.kind }).subscribe((res: any) => {

      this.categories = res;

      this.formGroup = new FormGroup({
        month: new FormControl('', Validators.required),
        year: new FormControl(new Date().toISOString(), Validators.required),
        category: new FormControl(null, Validators.required),
        amount: new FormControl(0.00, Validators.required),
        kind: new FormControl(null, Validators.required)
      });
    });
  }

  public submit() {
    const body = {
      month: getMouthByTitle(this.formGroup.controls['month'].value)!.value,
      year: new Date(this.formGroup.controls['year'].value).getFullYear(),
      categoryId: this.formGroup.controls['category'].value,
      amount: this.formGroup.controls['amount'].value,
      kind: this.formGroup.controls['kind'].value,
    };
    this.formGroup.reset();
    this.onSubmitBody.emit(body);
  }

  get monthFormContorl() {
    return this.formGroup.controls['month'] as FormControl;
  }

  get yearFormControl() {
    return this.formGroup.controls['year'] as FormControl;
  }

}
