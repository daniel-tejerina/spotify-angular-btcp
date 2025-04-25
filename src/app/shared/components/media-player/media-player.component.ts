import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild("progressBar") progressBar: ElementRef = new ElementRef("");
  mockCover!: TrackModel;

  listObservers$: Array<Subscription> = [];
  state: string = "paused"

  constructor(public _multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const observer1$ = this._multimediaService.playerStatus$
    .subscribe(status => this.state = status)

    this.listObservers$ = [observer1$];
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
    console.log("🛑🛑🛑 BOOOM!")
  }

  handlePosition(event: MouseEvent): void {
    // elNative: Obtiene la referencia del elemento usando el @ViewChild
    const elNative: HTMLElement = this.progressBar.nativeElement;
    // CLIENT X
    // Posicion horizontal del mouse, relativa al area visible del navegador.
    // Cuantos px hay desde el borde izquierdo hasta donde el mouse hizo click.
    const { clientX } = event;
    // .getBoundingClientRect(): devuelve un objeto con varias propiedades sobre el tamaño y posicion del elemento.
    // x, width: posicion y tamaño de la barra
    const { x, width } = elNative.getBoundingClientRect();

    // clickX: Es la distancia horizontal desde el borde izquierdo del elemento donde se hizo el click.
    const clickX = clientX - x;
    // percentageFromX: Calculo del porcentaje del click dentro del elemento. 0% a la izq | 100% a la derecha
    const percentageFromX = (clickX * 100) / width;
    // console.log(`Click(x): ${clickX}, Width: ${width}, Width Initial: ${x}`)
    console.log(`Porcentaje: ${percentageFromX}`)

    this._multimediaService.seekAudio(percentageFromX);
  }


  // =================================================== 
  // OBSERVERS, SUBJECT AND BEHAVIOUR SUBJECT APPLICATION
  // ===================================================

  // ngOnInit(): void {
  //   const observable1$ = this._multimediaService.myObservable1$
  //     .subscribe(
  //       // .next()
  //       (responseOk) => {
  //         console.log("✌️ El agua llega perfecto!")
  //       },
  //       // .error()
  //       (responseFail) => {
  //         console.log("🛑 Se tapo la tuberia!")
  //       }
  //       //  .complete()
  //     )
  // }
}
