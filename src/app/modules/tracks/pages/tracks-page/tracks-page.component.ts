import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  standalone: false,
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.css'
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []

  listObservers$: Array<Subscription> = []

  constructor(private _trackService: TrackService) {}

  ngOnInit(): void {
    this.loadAllData();
    this.loadDataRandom();
  }

  loadAllData() :void {
    // this.tracksTrending = await this.trackService.getAllTracks$().toPromise() <--- PROMESA
    this._trackService.getAllTracks$()
      .subscribe((response: TrackModel[]) => {
        this.tracksTrending = response;
    })
  }

  loadDataRandom() :void {
    this._trackService.getAllRandom$()
    .subscribe((response: TrackModel[]) => {
      this.tracksRandom = response;
    })
    // FORMA DE INCLUIR ERROR
    // this._trackService.getAllRandom$()
    // .subscribe((response: TrackModel[]) => {
    //   this.tracksRandom = response;
    // }, err => {
    //   console.log("Algo Malio Sal")
    // })
  }

  ngOnDestroy(): void {
    
  }

}
