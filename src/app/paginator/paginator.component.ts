import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html'
  
})


export class PaginatorComponent implements OnInit{
  @Input() paginador: any;

  paginas: number[];


  ngOnInit(){
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor,indice) => indice + 1);
  }
}
