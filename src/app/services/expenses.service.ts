import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {



   constructor(private http: HttpClient) { }

    public save(body: any){
        return this.http.post(`${environment.apiUrl}v1/planner/expenses`,body);
    }

    public getList(){
        return this.http.get<any>(`${environment.apiUrl}v1/planner/expenses`);
    }

    public delete(id: number){
        return this.http.delete<any>(`${environment.apiUrl}v1/planner/expenses/${id}`);
    }

    public update(id: number,body: any){
        return this.http.put(`${environment.apiUrl}v1/planner/expenses/${id}`,body);
    }
}
