import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PokemonService } from '../pokemon.service';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { Pokemon } from '../pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  @Input() pokemon: Pokemon[];
  @Output() selected = new EventEmitter();
  @Output() opened = new EventEmitter();
}
