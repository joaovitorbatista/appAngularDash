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

  minhaPromise(nome: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (nome === 'Joao') {
        setTimeout(() => {
          resolve('Seja bem vindo ' + nome);
        }, 1000);
      } else {
        reject('Ops, você não é o Joao');
      }
    });
  }

  minhaObservable(nome: string): Observable<string> {
    return new Observable((subscriber) => {
      if (nome === 'Joao') {
        subscriber.next('Olá!' + nome);
        subscriber.next('Olá de novo!' + nome);
        setTimeout(() => {
          subscriber.next('Resposta com delay!');
        }, 1000);
        subscriber.complete();
      } else {
        subscriber.error('Ops! Deu erro!');
      }
    });
  }

  usuarioObservable(nome: string, email:string): Observable<Usuario> {
    return new Observable((subscriber) => {
      if (nome === 'Admin') {

        let usuario = new Usuario(nome, email);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 1000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 2000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 3000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 4000);

        setTimeout(() => {
          subscriber.complete();
        }, 5000);

      } else {
        subscriber.error('Ops! Deu erro!');
      }
    });
  }

  ngOnInit(): void {
    // this.setupTitleListener();
    // console.log(this.name);
    // this.minhaPromise('Joao')
    //   .then(result => console.log(result));

    //   this.minhaPromise('Vitor')
    //   .then(result => console.log(result))
    //   .catch(error => console.log(error))

    //   this.minhaObservable('')
    //   .subscribe(
    //     result => console.log(result),
    //     erro => console.log(erro)
    // );

    const observer = {
      next: (valor) => console.log('Next:', valor),
      error: (error) => console.log('Erro:', error),
      complete: () => console.log('FIM'),
    };

    // const obs = this.minhaObservable('Joao');
    // obs.subscribe(observer);

    const obs = this.usuarioObservable('Admin', 'adm@adm.com');
    const subs = obs.subscribe(observer);
    //obs.subscribe(observer);

    setTimeout(() => {
      subs.unsubscribe();
      console.log('Conexão fechada: ' + subs.closed)
    }, 3500);


  }

  escrever(texto:string){
    console.log(texto);
  }

  private setupTitleListener() {
    this.router.events
      .pipe(filter((e) => e instanceof ResolveEnd))
      .subscribe((e: ResolveEnd) => {
        const { data } = getDeepestChildSnapshot(e.state.root);
        if (data?.['title']) {
          //console.log(data['title']);
          this.title.setTitle(data['title']);
        }
      });
  }

}

export class Usuario {
  constructor(nome: string, email:string) {
    this.nome = nome;
    this.email = email;
  }

  nome:string;
  email:string;
}

function getDeepestChildSnapshot(snapshot: ActivatedRouteSnapshot) {
  let deepestChild = snapshot.firstChild;
  while (deepestChild?.firstChild) {
    deepestChild = deepestChild.firstChild;
  }
  return deepestChild || snapshot;
}
