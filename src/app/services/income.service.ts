

import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Summary } from "../components/total-budget/total-budget.component";


@Injectable({
    providedIn: 'root'
})
export class IncomeSerive {

    constructor(private http: HttpClient) { }

    public save(body: any){
        return this.http.post(`${environment.apiUrl}v1/planner/incomes`,body);
    }

    public getList(){
        return this.http.get<any>(`${environment.apiUrl}v1/planner/incomes`);
    }

    public delete(id: number){
        return this.http.delete<any>(`${environment.apiUrl}v1/planner/incomes/${id}`);
    }

    public update(id: number,body: any){
        return this.http.put(`${environment.apiUrl}v1/planner/incomes/${id}`,body);
    }
}
