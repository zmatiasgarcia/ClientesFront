
import { Component } from '@angular/core';
import { Cliente  } from "./cliente";
import { ClienteService } from "./cliente.service";
import { Router, ActivatedRoute } from "@angular/router";
import  swal  from 'sweetalert2';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
  
})
export class FormComponent {
    cliente:Cliente = new Cliente();
    titulo: string = "Crear Cliente";
    errores: string [];
  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute ){
    
  }

  ngOnInit(){
    this.cargarCliente();
  }

   cargarCliente(): void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
        }
      })
   }
/*
   create(): void{
    this.clienteService.create(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con exito!`,'success')
  },
  err => {
    this.errores = err.error.errors as string [];
    console.error("Codigo del error desde el backend: " + err.status);
    console.error(err.error.errors);
  }
  );
}
*/

create(): void {
  this.clienteService.create(this.cliente).pipe(
    tap((cliente) => {
      this.router.navigate(['/clientes']);
      swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito!`, 'success');
    }),
    catchError((err) => {
      this.errores = err.error.errors as string[];
      console.error("Código del error desde el backend: " + err.status);
      console.error(err.error.errors);
      return throwError(err); // Lanzar el error nuevamente para que sea manejado por el código que llama a esta función
    })
  ).subscribe();
}







update(): void{
  this.clienteService.update(this.cliente)
  .subscribe(json =>{
    this.router.navigate(['/clientes'])
    swal.fire('Cliente Actualizado', `Cliente ${json.cliente.nombre} actualizado con exito`,'success');
  },
  err => {
    this.errores = err.error.errors as string [];
    console.error("Codigo del error desde el backend: " + err.status);
    console.error(err.error.errors);
  }
  
  )
  
}



}
