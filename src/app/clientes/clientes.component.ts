import { Component } from '@angular/core';
import { Cliente } from "./cliente";
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from "rxjs/operators";


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: Cliente[] ;

  constructor(private clienteService: ClienteService){}
  
  ngOnInit(){
   this.clienteService.getClientes().pipe(
    tap(clientes => {
      console.log('ClientesComponent: tap 3')
      clientes.forEach( cliente =>{
        console.log(cliente.nombre);
      });
      })
   )
   .subscribe(clientes => this.clientes = clientes
   );
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
