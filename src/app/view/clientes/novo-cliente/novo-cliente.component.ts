import { fromEvent, merge, Observable } from 'rxjs';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Cliente } from './model/cliente';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { CustomValidators } from 'ng2-validation';
import {
  ValidationMessages,
  GenericValidator,
  DisplayMessage,
} from './generic-form-validation';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css'],
})
export class NovoClienteComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  cadastroForm: FormGroup;
  cliente: Cliente;
  formResult: string = '';
  MASKS = utilsBr.MASKS;

  ValidationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder) {
    this.ValidationMessages = {
      fantasia: {
        required: 'O campo Fantasia é requerido',
        minLength: 'O nome precisa ter no mínimo 2 caracteres',
        maxLength: 'O nome precisa ter no máximo 50 caracteres',
      },
      razao: {
        required: 'O nome é requerido',
        minLength: 'O nome precisa ter no mínimo 2 caracteres',
        maxLength: 'O nome precisa ter no máximo 50 caracteres',
      },
      cnpj: {
        required: 'O campo CNPJ é obrigatório',
        cnpj: 'CNPJ inválido',
      },
      email: {
        required: 'O campo E-mail é obrigatório',
        email: 'E-mail inválido',
      },
      senha: {
        required: 'O campo Senha é obrigatório',
        rangeLength: 'A senha de ter entre 6 e 15 caracteres',
      },
      senhaConfirmacao: {
        required: 'O campo confirmação de senha é obrigatório',
        rangeLength: 'A senha de ter entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem',
      },
    };

    this.genericValidator = new GenericValidator(this.ValidationMessages);
  }

  ngOnInit(): void {
    let senha = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
    ]);
    let senhaConfirm = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
      CustomValidators.equalTo(senha),
    ]);

    this.cadastroForm = this.fb.group({
      fantasia: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      razao: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      cnpj: ['', [Validators.required, <any>NgBrazilValidators.cnpj]],
      email: ['', [Validators.required, Validators.email]],
      senha: senha,
      senhaConfirmacao: senhaConfirm,
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements?.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(
        this.cadastroForm
      );
    });
  }

  adicionarCliente() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.cliente = Object.assign({}, this.cliente, this.cadastroForm.value);
      this.formResult = JSON.stringify(this.cadastroForm.value);
    } else {
      this.formResult = 'Não submeteu!!';
    }
  }
}
