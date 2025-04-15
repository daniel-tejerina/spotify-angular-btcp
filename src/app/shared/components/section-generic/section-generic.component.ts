import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/Track.model';

@Component({
  selector: 'app-section-generic',
  standalone: false,
  templateUrl: './section-generic.component.html',
  styleUrl: './section-generic.component.css'
})
export class SectionGenericComponent {
  @Input() title: string = '';
  @Input() mode: 'small' | 'big' = 'big';
  @Input() dataTracks: Array<TrackModel> = [];
  
  constructor() {}

  ngOnInit(): void {}

}
