import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Pokemon } from './pokemon.model';

import { map } from 'rxjs/operators';

@Injectable()
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemon() {
    return this.http
      .get<Pokemon[]>(`${this.baseUrl}/pokemon/?limit=949`)
      .pipe(map(res => res.results.map(p => this.setPokemon(p))));
  }

  getPoke(id) {
    return this.http
      .get(`${this.baseUrl}/pokemon/${id}/`);
  }

  private setPokemon(pokemon) {
    if(!pokemon['id']) {
      pokemon['id'] = pokemon.url.match(/\/(\d+)/)[1];
    }
    return pokemon
  }

}
