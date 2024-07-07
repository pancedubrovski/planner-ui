import { Component, OnInit } from '@angular/core';
import { IncomeSerive } from '../../services/income.service';
import { months } from '../../Utilites/Months';
import { CategoryService } from '../../services/category.service';
import { forkJoin } from 'rxjs';
import { CalculationService } from '../../services/calculation.service';
import { CategoryKind } from '../../models/CategoryKind';
import { Category } from '../../models/Category';

export interface Summary {
  incomes: Array<Item>
  expenses: Array<Item>
}

export interface Item {
  category: string;
  year: number;
  month: number;
  kind: string;
  amount: number;
}

@Component({
  selector: 'app-total-budget',
  templateUrl: './total-budget.component.html',
  styleUrl: './total-budget.component.scss'
})
export class TotalBudgetComponent implements OnInit {

  public incomes: Array<Item> = [];
  public expenses: Array<Item> = [];
  public isLoaded = false;

  public incomeCateogories: any[] = [];
  public expensesCategories: any[] = [];
  public currentPeriod: any;

  constructor(protected calculationService: CalculationService, protected categoryService: CategoryService) { }

  ngOnInit(): void {

    const currentMonth = new Date().getMonth();
    const currrentYear = new Date().getFullYear();

    this.currentPeriod = [
      {
        year: (currentMonth - 2) >= 0 ? currrentYear : currrentYear - 1,
        month: currentMonth - 2
      },
      {
        year: (currentMonth - 1) >= 0 ? currrentYear : currrentYear - 1,
        month: currentMonth - 1
      }, {
        year: currrentYear,
        month: currentMonth
      }
    ];

    console.log('currentPeriod', this.currentPeriod);
    forkJoin({
      requestOne: this.calculationService.calucateBuget(),
      categoris: this.categoryService.getCategoies({ kinds: 'Expenses,Income' })
    })
      .subscribe(({ requestOne, categoris }) => {
        this.incomes = requestOne.incomes;
        this.expenses = requestOne.expenses;
        this.incomeCateogories = (categoris as []).filter((c: Category) => c.kind == CategoryKind.Income);
        this.expensesCategories = (categoris as []).filter((c: Category) => c.kind == CategoryKind.Expenses)




        this.isLoaded = true;
      });

  }

  public getIncomesByCategory(isIncome: boolean, category: string, year: number, month: number, kind: string) {
    console.log(category, year, month, kind, this.incomes.find(i => i.category == category && i.year == year && i.month == month
      && i.kind == kind)?.amount);

    console.log('this.incomes', this.incomes);

    if (isIncome) {
      return this.incomes.find(i => i.category == category && i.year == year && i.month == month
        && i.kind == kind)?.amount || 0;
    }
    else {
      return this.expenses.find(i => i.category == category && i.year == year && i.month == month
        && i.kind == kind)?.amount || 0;
    }
  }

  public calcuateTotal(isIncome: boolean, year: number, month: number, kind: string) {
    const categories = (isIncome ? this.incomeCateogories : this.expensesCategories).map(c => c.value);
    if (isIncome) {
      return this.incomes.filter(i => categories.includes(i.category) && i.year == year && i.month == month
        && i.kind == kind).map(a => a.amount).reduce((c, v) => c + v, 0);
    }else {
      return this.expenses.filter(i => categories.includes(i.category) && i.year == year && i.month == month
      && i.kind == kind).map(a => a.amount).reduce((c, v) => c + v, 0);
    }
  }

  public calculateBalance(year: number, month: number, kind: string) {
    const totalIncomes = this.calcuateTotal(true, year, month, kind)
    const totalExpenses = this.calcuateTotal(false, year, month, kind);

    return totalIncomes - totalExpenses;

  }
  public getMouthTitel(numValue: number) {
    return months.find(v => v.value == numValue)?.title;
  }
}
