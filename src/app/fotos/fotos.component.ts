import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
    selector: 'app-fotos',
    templateUrl: './fotos.component.html',
    styleUrls: ['./fotos.component.css'],
})
export class FotosComponent implements OnInit {

    @Input() sizeI;
    @Input() treemd;
    @Output() onGroot = new EventEmitter<any>();

    public items: any[];

    private loc = './inventarisatie/weergave/';
    public n = 0;
    public nF = 0;
    public l: number;
    public lF: number;
    public groot = '';
    public showGroot = false;

    constructor() {
    }

    prev() {
        this.nF--;
        if (this.nF < 0) {
            this.nF = 0;
        }
//        console.log(`down: ${this.nF} | ${this.l}`);
        this.keuze(this.items[this.nF]);
    }

    next() {
        this.nF++;
        if (this.nF > this.lF) {
            this.nF = this.lF;
        }
//        console.log(`up: ${this.nF} | ${this.lF}`);
        this.keuze(this.items[this.nF]);
    }

    keuze(item) {
        this.groot = this.loc + item.name;
        this.nF = item.nr;
        this.showGroot = true;
        this.onGroot.emit(this.nF);
    }

    geenGroot() {
        this.showGroot = false;
        this.onGroot.emit(-1);
    }

    ngOnInit() {
        this.items = [];
        this.l = this.treemd.contents[this.loc].length - 1;
        for (this.n = 1; this.n <= this.l; this.n++) {
            this.items.push(this.treemd.contents[this.loc][this.n]);
        }
        this.lF = this.l - 1;
        console.log(this.items);
    }

}
