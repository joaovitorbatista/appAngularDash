import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';

import { PokemonService } from './pokemon.service';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { Pokemon } from './pokemon.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  pokemon: Pokemon[];
  poke;

  constructor(
    private dialog: MatDialog,
    private pokeService: PokemonService
  ) {}

  ngOnInit() {
    this.getPokeList();
  }

  getPokeList() {
    this.pokeService.getPokemon()
      .subscribe(res => this.pokemon = res);
  }

  getSinglePoke(id) {
    this.pokeService.getPoke(id)
      .subscribe(res => {
        this.poke = res
        this.openDialog(id);
      }
    );
  }

  openDialog(id) {
    this.dialog
      .open(PokemonDetailsComponent, {
        height: '270px',
        data: { singlePoke: this.poke }
      })
  }

}
