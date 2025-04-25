import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  private readonly trackURL = environment.trackURL;
  callback: EventEmitter<any> = new EventEmitter<any>()

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);

  public audio!: HTMLAudioElement;

  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject("00:00")
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject("-00:00")
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject("paused")
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() {
    this.audio = new Audio;
    this.trackInfo$.subscribe(responseOk => {
      if (responseOk) {
        this.setAudio(responseOk);
      }
    })

    this.listenAllEvents()
  }

  private listenAllEvents(): void {
    this.audio.addEventListener("timeupdate", this.calculateTime, false);
    this.audio.addEventListener("playing", this.setPlayerStatus, false);
    this.audio.addEventListener("play", this.setPlayerStatus, false);
    this.audio.addEventListener("pause", this.setPlayerStatus, false);
    this.audio.addEventListener("ended", this.setPlayerStatus, false);
  }

  private setPlayerStatus = (state: any) => {
    console.log(state)
    switch (state.type) {
      case "play":
        this.playerStatus$.next("play");
        break;
      case "playing":
        this.playerStatus$.next("playing");
        break;
      case "paused":
        this.playerStatus$.next("paused");
        break;
      case "ended":
        this.playerStatus$.next("ended");
        break;
      default:
        this.playerStatus$.next("paused")
        break;
    }
  }

  private calculateTime = () => {
    const { duration, currentTime } = this.audio;
    this.setTimeElapsed(currentTime);
    this.setRemaining(currentTime, duration)
    this.setPercentage(currentTime, duration)
  }

  private setPercentage(currentTime: number, duration: number): void {
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage);
  }


  private setTimeElapsed(currentTime :number) :void {
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }

  private setRemaining(currentTime :number, duration :number) :void {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }

  public setAudio(track: TrackModel) {
    // console.log("🎶🎶🎶", track);
    this.audio.src = `${this.trackURL}${track.url}`;
    this.audio.play();
  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }

  public seekAudio(percentage: number): void {
    const { duration } = this.audio;
    const percentageToSecond = (percentage * duration) / 100;

    this.audio.currentTime = percentageToSecond;
  }


  // =================================================== 
  // OBSERVERS, SUBJECT AND BEHAVIOUR SUBJECT APPLICATION - EXAMPLE
  // =================================================== 

  // REGULAR OBSERVER
  // myObservable1$: Observable<any> = new Observable();
  // SUBJECT
  // myObservable1$: Subject<any> = new Subject();
  // BEHAVIOUR SUBJECT
  // myObservable1$: BehaviorSubject<any> = new BehaviorSubject("✔️");

  // constructor() {

    // setTimeout(() => {
    //   this.myObservable1$.next("✔️")
    // }, 1000)
  
    // setTimeout(() => {
    //   this.myObservable1$.error("✖️")
    // }, 2000)
    

    // SUBJECT
    // setTimeout(() => {
    //   this.myObservable1$.next("✔️")
    // }, 1000)

    // setTimeout(() => {
    //   this.myObservable1$.next("✔️")
    // }, 2000)

    // setTimeout(() => {
    //   this.myObservable1$.error("✖️")
    // }, 3500)

    // REGULAR OBSERVABLE
    // this.myObservable1$ = new Observable(
    //   (observer: Observer<any>) => {
    //     observer.next("✔️");

    //     setTimeout(() => {
    //       observer.next("✔️");
    //     }, 2500)

    //     setTimeout(() => {
    //       observer.error("✖️");
    //     }, 4500)
    //   }
    // )
  // }
}
