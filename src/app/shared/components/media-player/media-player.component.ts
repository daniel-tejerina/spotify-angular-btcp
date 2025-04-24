import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  standalone: false,
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  mockCover: TrackModel = {
    cover: 'https://media.senscritique.com/media/000004802973/300/demon_days.jpg',
    name: 'Demon Days',
    album: 'Gorillaz',
    url: 'https://localhost/track.mp3',
    _id: 1
  }

  listObservers$: Array<Subscription> = [];

  constructor(private _multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const observable1$ = this._multimediaService.myObservable1$
      .subscribe(
        // .next()
        (responseOk) => {
          console.log("✌️ El agua llega perfecto!")
        },
        // .error()
        (responseFail) => {
          console.log("🛑 Se tapo la tuberia!")
        }
        //  .complete()
      )
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
    console.log("🛑🛑🛑 BOOOM!")
  }

}
