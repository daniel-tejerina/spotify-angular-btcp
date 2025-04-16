import { Component } from '@angular/core';
import { TrackModel } from '@core/models/track.model';

@Component({
  selector: 'app-media-player',
  standalone: false,
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent {
  mockCover: TrackModel = {
    cover: 'https://media.senscritique.com/media/000004802973/300/demon_days.jpg',
    name: 'Demon Days',
    album: 'Gorillaz',
    url: 'https://localhost/track.mp3',
    _id: 1
  }

  constructor() {}

  ngOnInit(): void {

  }

}
