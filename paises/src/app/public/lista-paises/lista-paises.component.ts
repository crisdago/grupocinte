import {AfterViewInit, Component, ViewChild, Inject, KeyValueDiffers} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Paises} from '../models/pais.model';
import {GetPaisesService}  from '../service/get-paises.service';

/**
 * @title Core Paises
 */
@Component({
  selector: 'app-lista-paises',
  templateUrl: './lista-paises.component.html',
  styleUrls: ['./lista-paises.component.css']
})
export class ListaPaisesComponent implements AfterViewInit {

  displayedColumns: string[] = ['Pais', 'Bandera', 'Accion'];
  dataSource :any; 
  fav = false;
  filtro:string = '';
  continentes : any = []; 
  sContinente :string='todo';


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor( 
    private getPaisesService :GetPaisesService,
    public dialog: MatDialog
    ) { }



  ngAfterViewInit() {
    
    this.consultar(); 
   
   
  }

  setFiltro(event:any){
    this.filtro=event.target.value;
    this.consultar();
  }

  consultar(){
   
    this.getPaisesService.getPaises().subscribe(resp =>{
      
      if(this.sContinente!="todo"){
          resp= Object.values(resp).filter((i: { region: string }) => ( i.region.match(this.sContinente)));       

      }



      if(this.filtro==""){      
        if(this.fav){           
          this.dataSource =new MatTableDataSource<Paises>(this.getFavoritos(Object.values(resp)));
        }else{
          this.dataSource =new MatTableDataSource<Paises>(Object.values(resp));
        }            
      }else{
        let temp =Object.values(resp).filter((i: { name: string }) => ( i.name.toLowerCase().match(this.filtro)));       

            if(this.fav){           
              this.dataSource =new MatTableDataSource<Paises>(this.getFavoritos(temp));
            }else{
              this.dataSource =new MatTableDataSource<Paises>(temp);
            }  
      
      }
       this.dataSource.paginator = this.paginator;
      this.getContinentes(this.dataSource.filteredData);
    });

  }

  

  getContinentes(data:[]){  
   
    data.map((key:any) =>  this.continentes.indexOf(key.region)==-1?key.region!=""?this.continentes.push(key.region):null:null);
    
 
    
  }

  getFavoritos(data:any){
    const local= localStorage.getItem('Favoritos');
    var array = JSON.parse(local!=null?local:"[]");  
    return data.filter(function(e:any) {
      return array.indexOf(e.name) >-1
  });
  }

  setLike(name:any){ 
    const local= localStorage.getItem('Favoritos');
    var array = JSON.parse(local!=null?local:"[]");    
    const index=array.indexOf(name);
    if (index === -1) {
      array.push(name);      
  } else if (index > -1) {
     array.splice(index,1);
  }
    localStorage.setItem('Favoritos', JSON.stringify(array));      
  }

  getLike(name:any){
    var local = localStorage.getItem('Favoritos');
    const index=JSON.parse(local!=null?local:"[]").indexOf(name);
   if(index === -1){
     return false;
   }else{
    return true;
   }    
  }

  favoritos(){
    this.fav=!this.fav;
    this.consultar();
  }
  openDialog(name:any) {
    let tempData=this.dataSource.filteredData;
    let index = tempData.map(function(e:any) { return e.name; }).indexOf(name);      
    this.dialog.open(DialogDataPais, {
      data: {
        name: tempData[index].name,
        capital: tempData[index].capital,
        region: tempData[index].region,
        languages: tempData[index].languages,
        borders:tempData[index].borders,
        flag: tempData[index].flag
      }
    });
  }



}
@Component({
  selector: 'dialog-data-pais',
  templateUrl: 'dialog-data-pais.html',
  styleUrls: ['./lista-paises.component.css']
})
export class DialogDataPais {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Paises) {}
}
