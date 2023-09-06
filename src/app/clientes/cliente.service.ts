import { Injectable } from '@angular/core';
import { formatDate } from "@angular/common";
import { CLIENTES } from "./clientes.json";
import { Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import swal from 'sweetalert2';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router:Router) { }

  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      tap(response =>{
        let clientes = response as Cliente[];
        console.log('ClienteService: tap 1')
        clientes.forEach( cliente =>{
          console.log(cliente.nombre);
        }
          
        )
      }),
      map(response => {
      let clientes = response as Cliente[];

      return clientes.map(cliente => {
        cliente.nombre = cliente.nombre.toUpperCase();
       // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
        return cliente;
      });
      }
      ),
      tap(response =>{
        console.log('ClienteService: tap 2')
        response.forEach( cliente =>{
          console.log(cliente.nombre);
        }
          
        )
      }),
    );
  }

  create(cliente: Cliente) : Observable<Cliente>{
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeader}).pipe(
      map( (response:any) => response.cliente as Cliente),
      catchError(e => {

        if(e.status ==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    )
  }


  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      
      catchError(e => {
        this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return  throwError(e)
      })
    )
  }


  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeader}).pipe(
      catchError(e => {

        if(e.status ==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeader}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    )
  }
}







