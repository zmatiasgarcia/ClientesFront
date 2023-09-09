import { Component } from '@angular/core';
import { Cliente } from "./cliente";
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: Cliente[] ;
  paginador : any;

  constructor(private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute){}
  
  ngOnInit(){
    

    this.activatedRoute.paramMap.subscribe( params => {

      let page: number = +params.get('page');
      

      if(!page){
        page = 0;
      }

      this.clienteService.getClientes(page).pipe(
        tap(response => {
          console.log('ClientesComponent: tap 3');
          (response.content as Cliente[]).forEach( cliente =>{
            console.log(cliente.nombre);
          });
          })
       )
       .subscribe(response => {
        
        this.paginador = response;
        this.clientes = response.content as Cliente[]});
        

    })
 
   
  }

  delete(cliente: Cliente): void{
    Swal.fire({
      title: 'Esta seguro?',
      text: `Seguro que desea eliminar el cliente ${cliente.nombre}? ${cliente.apellido}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire('Cliente eliminado!', `Cliente ${cliente.nombre} eliminado con exito`, 'success')
          }
        )

      
      } 
    })
  }
 
}
