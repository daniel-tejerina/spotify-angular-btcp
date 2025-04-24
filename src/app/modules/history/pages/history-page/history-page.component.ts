import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  standalone: false,
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent implements OnInit {
  listResults$: Observable<any> = of([])
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    
  }

  receiveData(event: string): void {
    console.log("Estoy en el componente padre...", event)
    this.listResults$ = this.searchService.searchTracks$(event);
  }
}
