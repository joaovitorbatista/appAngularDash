import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PokemonService {
  private url = "https://pokeapi.co/api/v2";
  constructor(private http: HttpClient) {}

  buscarPokemons(): Observable<any> {
    return this.http.get<any>(this.url.concat(`/pokemon?limit=10`));
  }
  buscarPokemoNombre(value: string): Observable<any> {
    return this.http.get<any>(this.url.concat(`/pokemon/${value}`));
  }

  buscarTipo(value: string): Observable<any> {
    return this.http.get<any>(value);
  }
  buscarPokemonsdirecao(value: string): Observable<any> {
    return this.http.get<any>(value);
  }

  buscarPoderesPokemons(value: string): Observable<any> {
    return this.http.get<any>(value);
  }
}
