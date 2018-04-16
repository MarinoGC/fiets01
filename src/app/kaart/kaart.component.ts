import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'app-kaart',
    templateUrl: './kaart.component.html',
    styleUrls: ['./kaart.component.css']
})
export class KaartComponent implements OnInit, OnDestroy {

    @Input() sizeI;

    public width = 1280;
    public height = 960;

    private timerMenu;
    private subMenu: Subscription;

    constructor() { }

    tickerFunc() {
        this.width = this.sizeI.breedte;
        this.height = (this.sizeI.hoogte - this.sizeI.header);
    }

    ngOnInit() {
        this.timerMenu = TimerObservable.create(100,500);       //hier wordt de tijd tik tijd ingesteld
        this.subMenu = this.timerMenu.subscribe(t => this.tickerFunc());
    }

    ngOnDestroy() {
        this.subMenu.unsubscribe();
    }

}
