import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IncomeSerive } from '../../services/income.service';
import { getMouthByTitle, months } from '../../Utilites/Months';
import { Router } from '@angular/router';
import { ExpensesService } from '../../services/expenses.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  public dataSource = [];
  public displayedColumns = ['id', 'year', 'month', 'category', 'amount', 'kind', 'edit', 'delete'];

  public monthFormContorl!: FormControl;
  public amountFormContorl!: FormControl;
  public yearFormContorl!: FormControl;

  public editIsDisabled = false;


  public isIncome = true;
  public ExisintgLabel = '';
  public NewLabel = '';

  public service!: any;

  constructor(protected incomeService: IncomeSerive,
    protected expensesService: ExpensesService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef) { }
  ngOnInit(): void {

    this.monthFormContorl = new FormControl('');
    this.amountFormContorl = new FormControl(0.00);
    this.yearFormContorl = new FormControl();

    if (this.router.url.includes('expenses')) {
      this.service = this.expensesService;
      this.isIncome = false;
      this.ExisintgLabel = 'Exising Expenses';
      this.NewLabel = 'New Expenses';
    } else {
      this.service = this.incomeService;
      this.ExisintgLabel = 'Exising Incomes';
      this.NewLabel = 'New Income';
    }
    this.fetch();
  }

  private fetch() {
    this.service.getList().subscribe((res: []) => {
      this.dataSource = res;
    })
  }

  public submit(body: any) {

    this.service.save(body).subscribe((res: any) => {
      this.fetch();
    })
  }

  public setToEdit(id: number, toEdit: boolean) {
    let element: any = this.dataSource.find((e: any) => e.id === id)!;
    element['edit'] = toEdit;
    this.editIsDisabled = toEdit;

    if (this.editIsDisabled) {
      const income = this.dataSource.find((e: any) => e.id === id)! as any;
      this.monthFormContorl = new FormControl('');
      this.amountFormContorl = new FormControl(income?.amount);
      const date = new Date().setFullYear(income?.year);
      this.yearFormContorl = new FormControl(date);
    } else {
      this.amountFormContorl.reset();
      this.yearFormContorl.reset();
      this.monthFormContorl.reset();
    }

    this.changeDetectorRefs.detectChanges();
  }

  public deleteElement(id: number) {
    this.service.delete(id).subscribe((res: any) => {

      this.dataSource = this.dataSource.filter((e: any) => e.id !== id);
    });
  }

  public saveChanges(id: number) {
    const body = {
      amount: this.amountFormContorl.value,
      mounth: getMouthByTitle(this.monthFormContorl.value)!.value,
      year: new Date(this.yearFormContorl.value).getFullYear()
    }

    this.service.update(id, body).subscribe((res: any) => {
      this.fetch();
    });
  }

  public getMonthTitle(value: number) {
    return months.find((m: any) => m?.value === value)?.title;
  }
}
