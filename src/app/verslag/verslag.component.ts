import {Component, Input, OnInit, OnDestroy} from '@angular/core';
//import { BackFoto } from '../models/nav.model';

@Component({
    selector: 'app-verslag',
    templateUrl: './verslag.component.html',
    styleUrls: ['./verslag.component.css']
})
export class VerslagComponent implements OnInit {

    @Input() datamd;
    @Input() sizeI;

    public data = [];
    private n: number;
    private l: number;
    public select = 0;
    public dataThere = false;
    public backFoto: any;

    constructor() { }

    blog(id) {
        this.select = id;
    }

    ngOnInit() {
        this.l = this.datamd[4].length - 1;
        for (this.n = this.l; this.n >= 0; this.n--) {
            this.data.push(this.datamd[4][this.n]);
            this.dataThere = true;
        }
        console.log(this.data);
//        this.backFoto = BackFoto[10];
    }

    ngOnDestroy() {
    }

}
