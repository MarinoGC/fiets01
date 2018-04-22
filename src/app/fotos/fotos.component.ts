import { Component, EventEmitter, OnInit, Input, Output, HostListener } from '@angular/core';
import { KEY_CODE, BackFoto } from '../models/nav.model';

@Component({
    selector: 'app-fotos',
    templateUrl: './fotos.component.html',
    styleUrls: ['./fotos.component.css'],
})
export class FotosComponent implements OnInit {

    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

    @Input() sizeI;
    @Input() treemd;
    @Output() onGroot = new EventEmitter<any>();

    private loc = './inventarisatie/weergave/';

    public n = 0;
    public nF = 0;
    public l: number;
    public lF: number;
    public groot = '';
    public showGroot = false;
    public backFoto: any;

    constructor() {
    }

//________________________________________________________
    prev() {
        this.nF--;
        if (this.nF < 0) {
            this.nF = 0;
        }
        this.keuze(this.treemd[this.nF]);
    }

    next() {
        this.nF++;
        if (this.nF > this.lF) {
            this.nF = this.lF;
        }
        this.keuze(this.treemd[this.nF]);
    }

//___________________________________________________swipe for iPhone / iPad_____________
    swipe(action = this.SWIPE_ACTION.RIGHT) {
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.nF--;
            if (this.nF < 0) {
                this.nF = 0;
            }
            this.keuze(this.treemd[this.nF]);
        }
        if (action === this.SWIPE_ACTION.LEFT) {
            this.nF++;
            if (this.nF > this.lF) {
                this.nF = this.lF;
            }
            this.keuze(this.treemd[this.nF]);
        }
    }
//____________________________voor left/right/up/down toetsen__________________
    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
//        console.log(event);
        if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
            this.next();
        }
        if (event.keyCode === KEY_CODE.LEFT_ARROW) {
            this.prev();
        }
        if (event.keyCode === KEY_CODE.UP_ARROW) {
            this.keuze(this.treemd[this.nF]);
        }
        if (event.keyCode === KEY_CODE.DOWN_ARROW) {
            this.showGroot = false;
        }
    }
//________________________________________________________
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
        this.lF = this.treemd.length -1;
        this.backFoto = BackFoto[8];
    }

}
