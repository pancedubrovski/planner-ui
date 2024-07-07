import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Summary } from '../components/total-budget/total-budget.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor(private http: HttpClient) { }

  public calucateBuget(){
    return this.http.post<Summary>(`${environment.apiUrl}v1/planner/calculate`,{});
}
}
