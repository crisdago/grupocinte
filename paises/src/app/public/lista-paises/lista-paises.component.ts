import {AfterViewInit, Component, ViewChild, ɵConsole} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Paises} from '../models/pais.model';
import {GetPaisesService}  from '../service/get-paises.service';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-lista-paises',
  templateUrl: './lista-paises.component.html',
  styleUrls: ['./lista-paises.component.css']
})
export class ListaPaisesComponent implements AfterViewInit {

  displayedColumns: string[] = ['Pais', 'Bandera', 'Accion'];
  dataSource :any;
   
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor( 
    private getPaisesService :GetPaisesService) { }



  ngAfterViewInit() {
    
    this.consultar(""); 
   
   
  }

  consultar(event:any){
   
    this.getPaisesService.getPaises().subscribe(resp =>{
    
      if(event==""){
      
        this.dataSource = new MatTableDataSource<Paises>(Object.values(resp));
        
      }else{
        let temp =Object.values(resp).filter((i: { name: string; }) => ( i.name.toLowerCase().match(event.target.value)));
        this.dataSource =new MatTableDataSource<Paises>(temp);
     
      }
       this.dataSource.paginator = this.paginator;
      
    });

  }
}