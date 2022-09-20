import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css']
})
export class NovoClienteComponent implements OnInit {

  cadastroForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.cadastroForm =  new FormGroup({
      fantasia: new FormControl('')
    });
  }

  adicionarCliente(){
    let x = this.cadastroForm.value;
  }

}
