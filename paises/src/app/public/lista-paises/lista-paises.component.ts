import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GetPaisesService } from '../service/get-paises.service'



@Component({
  selector: 'app-lista-paises',
  templateUrl: './lista-paises.component.html',
  styleUrls: ['./lista-paises.component.css']
})
export class ListaPaisesComponent implements OnInit {

  forma=new FormGroup({    
  });
  constructor(private fb: FormBuilder,private getPaisesServicel:GetPaisesService) { 
    this.crearForma();
  }

  ngOnInit(): void {
    this.consulta();
  }

  crearForma(){
    this.forma = this.fb.group({ 
     // nombre: [ '', [Validators.required] ]
    });
  }

  consulta(){
    this.getPaisesServicel.getPaises().subscribe(resp =>{
      console.log(resp);      
    });
  }

}
