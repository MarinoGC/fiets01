import { Component, OnInit, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { BackFoto } from '../models/nav.model';
import { ExtraService } from '../services/extra.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ExtraService],
    encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit, OnDestroy {

    @Input() datamd;
    @Input() sizeI;

    private backFoto: any;
    public aspect = true;
    public max = 0;
    private aspectFoto = 1.0;
    public aspectDisplay = 1.4;
    private aspectDisplayOld = 1.0;

    public dVH = {shift: 0, max: 0, up: true, pause: 0};
    public dT = 0;

    private sub: Subscription;
    private timer;

    public ready = false;

    constructor(private store: Store<any>,
                private extraService: ExtraService) {}

    tickerFunc() {
        this.ready = true;
        this.dVH = this.extraService.shiftPict(this.dVH);

        this.aspectDisplay = (this.sizeI.breedte / (this.sizeI.hoogte - this.sizeI.header));
        if (this.aspectDisplayOld != this.aspectDisplay) {
            this.aspectDisplayOld = this.aspectDisplay;

            this.aspect = (this.aspectFoto < this.aspectDisplay);
            if (this.aspect) {
                this.max = Math.round(this.sizeI.breedte / this.aspectFoto) - (this.sizeI.hoogte - this.sizeI.header);   // verticale beweging
            } else {
                this.max = Math.round((this.sizeI.hoogte - this.sizeI.header) * this.aspectFoto) - this.sizeI.breedte;   // horizontale beweging
            }
            this.dVH['shift'] = 0;
            this.dVH['pause'] = 0;
            this.dVH['max'] = this.max;
        }

        this.dT = this.dVH['shift'];
    }

    ngOnInit() {
        this.timer = TimerObservable.create(200, 50);       //hier wordt de tijd tik tijd ingesteld
        this.sub = this.timer.subscribe(t => this.tickerFunc());

        this.backFoto = BackFoto[5];
        this.aspectFoto = (this.backFoto['width'] / this.backFoto['height']);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
