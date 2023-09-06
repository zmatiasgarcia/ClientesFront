import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bievenido a Angular';
  
  //Podemos no definir el tipo , pero es una buena practica hacerlo, lo mismo el ;
  curso = 'Curso Spring 5 con Angular 7';

  profesor: string = 'matias';
}
