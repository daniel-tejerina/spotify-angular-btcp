import { Component } from '@angular/core';

@Component({
  selector: 'app-media-player',
  standalone: false,
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent {
  mockCover: any = {
    cover: 'https://media.senscritique.com/media/000004802973/300/demon_days.jpg',
    name: 'Demon Days',
    album: 'Gorillaz'
  }

  constructor() {}

  ngOnInit(): void {

  }

}
