import { Injectable } from '@angular/core';

@Injectable()
export class ExtraService {

    private up: boolean;
    private shift: number;
    private max: number;
    public dVH = {shift: 0, max: 0, up: true, pause: 0};
    private pause: number;
    private pauseMax =  25;   // stel hier de pause tijd in

    private alfa: number;
    private beta: number;
    private gamma: number;
    private deltaX: number;
    private pos = [];

    constructor() {
        this.dVH = {shift: 0, max: 10, up: true, pause: 1000};
    }

    pictureSize(sizeI, item, margeLeft, margeRight, margeVert) {
        this.alfa = (sizeI.breedte - margeLeft - margeRight) / item.width;
        this.beta = (sizeI.footer - sizeI.boxT - (2 * margeVert)) / item.height;
        this.gamma = Math.min(this.alfa, this.beta);
        this.deltaX = ((sizeI.breedte + margeLeft - margeRight - (this.gamma * item.width)) / 2.0);
        this.pos['upperX'] = Math.round(margeLeft + this.deltaX);
        this.pos['upperY'] = Math.round((sizeI.footer + sizeI.boxT - (this.gamma * item.height)) / 2.0);
        this.pos['width'] = Math.round(this.gamma * item.width);
        this.pos['height'] = Math.round(this.gamma * item.height);

        return this.pos;
    }

    shiftPict(value) {
        this.up = value['up'];
        this.max = value['max'];
        this.shift = value['shift'];
        this.pause = value['pause'];

        if (this.pause < this.pauseMax) {
            this.pause++;
        } else {
            if ((this.shift <= 0) && (!this.up)) {
                this.up = true;
                this.shift = 0;
                this.pause = 0;
            } else {
                if ((this.shift >= this.max) && (this.up)){
                    this.up = false;
                    this.shift = this.max;
                    this.pause = 0;
                } else {
                    if (this.up) {
                        this.shift++;
                    } else {
                        this.shift--;
                    }
                }
            }
        }

        this.dVH['shift'] = this.shift;
        this.dVH['max'] = this.max;
        this.dVH['up'] = this.up;
        this.dVH['pause'] = this.pause;

        return this.dVH;
    }
}
