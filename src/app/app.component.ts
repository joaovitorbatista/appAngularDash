import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularAvancado';

  minhaPromise(nome: string) : Promise<string>{
    return new Promise((resolve, reject) => {
      if (nome === 'Joao') {
        setTimeout(() => {
          resolve('Seja bem vindo ' + nome);
        }, 1000);
      }
      else {
        reject('Ops, você não é o Joao');
      }
    })
  }

  minhaObservable(nome: string) : Observable<string>{
    return new Observable(subscriber => {
      if (nome === 'Joao') {
        subscriber.next('Olá!' + nome);
        subscriber.next('Olá de novo!' + nome);
        setTimeout(() => {
          subscriber.next('Resposta com delay!');
        }, 1000);
        subscriber.complete();
      }else {
          subscriber.error("Ops! Deu erro!");
      }
    })
  }

  ngOnInit(): void {
    // this.minhaPromise('Joao')
    // .then(result => console.log(result));

    // this.minhaPromise('Vitor')
    // .then(result => console.log(result))
    // .catch(error => console.log(error))

    // this.minhaObservable('')
    // .subscribe(
    //   result => console.log(result),
    //   erro => console.log(erro)
    // );

    const observer = {
      next: valor => console.log('Next:',valor),
      error: error => console.log('Erro:', error),
      complete:() => console.log('FIM')
    }

    const obs = this.minhaObservable('Joao');
    obs.subscribe(observer);
  }

}
