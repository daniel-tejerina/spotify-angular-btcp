import { Component, Input } from '@angular/core';
import * as dataRaw from "../../../data/tracks.json";
import { TrackModel } from '@core/models/track.model';

@Component({
  selector: 'app-play-list-body',
  standalone: false,
  templateUrl: './play-list-body.component.html',
  styleUrl: './play-list-body.component.css'
})
export class PlayListBodyComponent {
  @Input() tracks: TrackModel[] = [];
  optionSort: { property: string | null, order: 'asc' | 'desc' } = { property: null, order: "asc"}

  ngOnInit(): void {
    // const {data}: any = (dataRaw as any).default;
    // this.tracks = data;
  }

  changeSort(property: string): void {
    const { order } =  this.optionSort
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc'
    }
    console.log(this.optionSort)
  }
}
