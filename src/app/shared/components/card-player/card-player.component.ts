import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/track.model';

@Component({
  selector: 'app-card-player',
  standalone: false,
  templateUrl: './card-player.component.html',
  styleUrl: './card-player.component.css'
})
export class CardPlayerComponent {
  @Input() mode: 'small' | 'big' = 'small';
  @Input() track: TrackModel = {
    "_id": 0,
    "name": "",
    "album": "",
    "cover": "",
    "url": ""
  }
}
