import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { TotalBudgetComponent } from './components/total-budget/total-budget.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'expenses', component: ListComponent },
  { path: 'buget', component: TotalBudgetComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
