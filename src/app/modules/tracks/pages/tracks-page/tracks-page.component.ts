import { Component } from '@angular/core';
import * as dataRaw from "../../../../data/tracks.json"
import { TrackModel } from '@core/models/Track.model';

@Component({
  selector: 'app-tracks-page',
  standalone: false,
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.css'
})
export class TracksPageComponent {
  mockTracksList: Array<TrackModel> = []

  ngOnInit(): void {
    const {data}: any = (dataRaw as any).default;
    this.mockTracksList = data;
  }

}
