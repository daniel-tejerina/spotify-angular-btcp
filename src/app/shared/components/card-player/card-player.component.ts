import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-card-player',
  standalone: false,
  templateUrl: './card-player.component.html',
  styleUrl: './card-player.component.css'
})
export class CardPlayerComponent implements OnInit {
  @Input() mode: 'small' | 'big' = 'small';
  @Input() track: TrackModel = {
    "_id": 0,
    "name": "",
    "album": "",
    "cover": "",
    "url": ""
  }

  constructor(private _multimediaSevice: MultimediaService) {}

  ngOnInit(): void {
    
  }

  sendPlay(track: TrackModel): void {
    console.log("Enviando cancion al reproductor...", track);

    this._multimediaSevice.callback.emit(track);
  }

}
