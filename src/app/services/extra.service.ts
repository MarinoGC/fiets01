import { Injectable } from '@angular/core';

@Injectable()
export class ExtraService {

    private up: boolean;
    private shift: number;
    private max: number;
    public dVH = {shift: 0, max: 0, up: true, pause: 0};
    private pause: number;
    private pauseMax =  25;   // stel hier de pause tijd in

    private data;
    private path: string;
    private parentPath: string;
    private n: number;
    private m: number;
    private s: string;

    private alfa: number;
    private beta: number;
    private gamma: number;
    private pos = [];

    constructor() {
        this.dVH = {shift: 0, max: 10, up: true, pause: 1000};
    }

    pictureSize(sizeI, item, margeLeft, margeRight, margeVert) {
        this.alfa = (sizeI.breedte - margeLeft - margeRight) / item.width;
        this.beta = (sizeI.footer - sizeI.boxT - (2 * margeVert)) / item.height;
        this.gamma = Math.min(this.alfa, this.beta);
        this.pos['upperX'] = Math.round(margeLeft);
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


    filterTree1(treemd, trail, column) {
        this.data = treemd;

        this.path = "./";
        this.parentPath = "./";
        this.n = this.data.trail.length;
        for (this.m = 0; this.m < this.n; this.m++) {  //bepaal PATH
            if (this.data.trail[this.m] != '') {
                this.path = this.path +  this.data.trail[this.m] + "/";
            }
            if ((this.m < (this.n - 1)) && (this.data.trail[this.m + 1] != '')) {
                this.parentPath = this.parentPath +  this.data.trail[this.m] + "/";
            }
        }
        this.data['path'] = this.path;
        this.data['parentPath'] = this.parentPath;

        for (this.m = 0; this.m < this.data.filter.length; this.m++) {  //bepaal FILTER
            this.data['filter'][this.m]['visible'] = false;
            this.data['filter'][this.m]['menu1'] = [];
            this.data['filter'][this.m]['menu2'] = [];
            this.data['filter'][this.m]['color'] = [];
            if (this.m == column) {
                this.data['filter'][this.m]['color'] = [];
            }
            for (this.n = 0; this.n < treemd['menu1'].length; this.n++) {
                if (this.data['menu1'][this.n][0] == trail[this.m]) {
                    this.data['filter'][this.m]['visible'] = true;
                    this.s = (this.data['menu1'][this.n][1]);
                    this.data['filter'][this.m]['menu1'].push(this.s);
                    if (trail[this.m + 1] == this.s) {
                        this.data['filter'][this.m]['color'].push('#fbac46');
                    } else {
                        this.data['filter'][this.m]['color'].push('#3b3c45');
                    }
                    this.s = this.s.toUpperCase();
                    this.data['filter'][this.m]['menu2'].push(this.s);
                }
            }
        }
        return this.data;
    }

}
