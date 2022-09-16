import { Component, OnInit } from '@angular/core';
import { __await } from 'tslib';
import { PokemonService } from '../pokemon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  public pokemons: any[] = [];
  public direcaoAnterior: String = '';
  public direcaoSeguinte: String = '';
  public contador = 1;
  public seguinte = true;
  public atras = false;
  primeiro = 0;
  entrada;

  constructor(private pokemonService: PokemonService) {}
  ngOnInit() {
    this.getPokemons();
  }
  getPokemons() {
    this.pokemons = [];
    this.pokemonService.buscarPokemons().subscribe((res: any) => {
      this.direcaoSeguinte = res.next;
      this.getPokemonTipo(res);
    });
  }

  getPokemonsSeguintes(valor: string) {
    this.primeiro = 0;
    this.atras = true;
    if (this.contador < 111) {
      this.contador++;
      if (this.contador == 111) {
        this.seguinte = false;
      }
    }
    this.pokemons = [];
    this.pokemonService.buscarPokemonsdirecao(valor).subscribe(
      (res: any) => {
        this.direcaoAnterior = res.previous;
        this.direcaoSeguinte = res.next;
        this.getPokemonTipo(res);
      },
      (error) => {}
    );
  }

  getPokemonsAtras(valor: string) {
    this.primeiro = 0;
    this.seguinte = true;
    if (this.contador > 1) {
      this.contador--;
      this.atras = true;
      if (this.contador == 1) {
        this.atras = false;
      }
    }
    this.pokemons = [];
    this.pokemonService.buscarPokemonsdirecao(valor).subscribe(
      (res: any) => {
        this.direcaoAnterior = res.previous;
        this.direcaoSeguinte = res.next;
        this.getPokemonTipo(res);
      },
      (error) => {}
    );
  }

  getPokemonTipo(res: any) {
    res.results.forEach((element) => {
      this.pokemonService
        .buscarPokemoNombre(element.name)
        .subscribe((resposta: any) => {
          this.pokemonService
            .buscarTipo(resposta.types[0].type.url)
            .subscribe((resposta: any) => {
              resposta.types[0].type.name = resposta.names[4].name;
              if (resposta.types[1]?.type.url) {
                this.pokemonService
                  .buscarTipo(resposta.types[1]?.type.url)
                  .subscribe((resposta: any) => {
                    resposta.types[1].type.name = resposta.names[4].name;
                  });
              }
              this.pokemonService
                .buscarPoderesPokemons(resposta.moves[0].move.url)
                .subscribe((resposta: any) => {
                  resposta.moves[0].move.name = resposta.names[5].name;
                });
              if (resposta.moves[1]?.move.url) {
                this.pokemonService
                  .buscarPoderesPokemons(resposta.moves[1].move.url)
                  .subscribe((resposta: any) => {
                    resposta.moves[1].move.name = resposta.names[5].name;
                  });
              }
              if (resposta.moves[2]?.move.url) {
                this.pokemonService
                  .buscarPoderesPokemons(resposta.moves[2].move.url)
                  .subscribe((resposta: any) => {
                    resposta.moves[2].move.name = resposta.names[5].name;
                  });
              }
              if (resposta.moves[3]?.move.url) {
                this.pokemonService
                  .buscarPoderesPokemons(resposta.moves[3].move.url)
                  .subscribe((resposta: any) => {
                    resposta.moves[3].move.name = resposta.names[5].name;
                  });
              }
            });
          this.pokemons.push(resposta);
        });
    });
  }

  getTipoPorBusca(res: any) {
    this.pokemonService
      .buscarTipo(res.types[0].type.url)
      .subscribe((resposta: any) => {
        res.types[0].type.name = resposta.names[4].name;
        if (res.types[1]?.type.url) {
          this.pokemonService
            .buscarTipo(res.types[1]?.type.url)
            .subscribe((resposta: any) => {
              res.types[1].type.name = resposta.names[4].name;
            });
        }
        this.pokemonService
          .buscarPoderesPokemons(res.moves[0].move.url)
          .subscribe((resposta: any) => {
            res.moves[0].move.name = resposta.names[5].name;
          });
        if (res.moves[1]?.move.url) {
          this.pokemonService
            .buscarPoderesPokemons(res.moves[1].move.url)
            .subscribe((resposta: any) => {
              res.moves[1].move.name = resposta.names[5].name;
            });
        }
        if (res.moves[2]?.move.url) {
          this.pokemonService
            .buscarPoderesPokemons(res.moves[2].move.url)
            .subscribe((resposta: any) => {
              res.moves[2].move.name = resposta.names[5].name;
            });
        }
        if (res.moves[3]?.move.url) {
          this.pokemonService
            .buscarPoderesPokemons(res.moves[3].move.url)
            .subscribe((resposta: any) => {
              res.moves[3].move.name = resposta.names[5].name;
            });
        }
      });
  }
  buscarPokemon(valor: string) {
    this.contador = 1;
    this.atras = false;
    if (valor.length > 0) {
      if (this.primeiro == 0) {
        this.pokemons = [];
      }
      this.primeiro++;
      this.pokemonService.buscarPokemoNombre(valor.toLowerCase()).subscribe(
        (res: any) => {
          this.getTipoPorBusca(res);
          this.pokemons.push(res);
        },
        (err) => {
          // alert(`Pokemon ${valor} nao encontrado`);
          Swal.fire({
            imageUrl:
              'https://stackblitz.com/files/angular-pokemons2/github/kmilo07/angular-pokemons2/master/src/pika.png',
            title: 'Quem é esse pokemon?',
            text: `O pokemon "${valor}" não foi encontrado`,
          });
        }
      );
    } else {
      this.primeiro = 0;
      this.getPokemons();
    }
    this.entrada = '';
  }
}
