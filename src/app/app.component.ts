import { Component, OnInit, VERSION } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular versão ' + VERSION.major;
  constructor(private readonly title: Title, private readonly router: Router) {}

  // minhaPromise(nome: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     if (nome === 'Joao') {
  //       setTimeout(() => {
  //         resolve('Seja bem vindo ' + nome);
  //       }, 1000);
  //     } else {
  //       reject('Ops, você não é o Joao');
  //     }
  //   });
  // }

  // minhaObservable(nome: string): Observable<string> {
  //   return new Observable((subscriber) => {
  //     if (nome === 'Joao') {
  //       subscriber.next('Olá!' + nome);
  //       subscriber.next('Olá de novo!' + nome);
  //       setTimeout(() => {
  //         subscriber.next('Resposta com delay!');
  //       }, 1000);
  //       subscriber.complete();
  //     } else {
  //       subscriber.error('Ops! Deu erro!');
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.setupTitleListener();
    console.log(this.name);
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

    // const observer = {
    //   next: (valor) => console.log('Next:', valor),
    //   error: (error) => console.log('Erro:', error),
    //   complete: () => console.log('FIM'),
    // };

    //const obs = this.minhaObservable('Joao');
    //obs.subscribe(observer);
  }

  private setupTitleListener() {
    this.router.events
      .pipe(filter((e) => e instanceof ResolveEnd))
      .subscribe((e: ResolveEnd) => {
        const { data } = getDeepestChildSnapshot(e.state.root);
        if (data?.['title']) {
          console.log(data['title']);
          this.title.setTitle(data['title']);
        }
      });
  }

}

function getDeepestChildSnapshot(snapshot: ActivatedRouteSnapshot) {
  let deepestChild = snapshot.firstChild;
  while (deepestChild?.firstChild) {
    deepestChild = deepestChild.firstChild;
  }
  return deepestChild || snapshot;
}
