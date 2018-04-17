import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
// import { NavItems, ItemType, KunstItems, KunstType } from './models/nav.model';
import { NavItems, ItemType } from './models/nav.model';
import { Subscription } from "rxjs/Subscription";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { SIZE_ALL } from './reducers/size.reducer';
import { EXTRA_ALL } from './reducers/extra.reducer';
import { TREE_ALL, TREE_CLEAR } from './reducers/tree.reducer';
import { WORK_ALL, WORK_CLEAR } from './reducers/work.reducer';
import { DataService } from './services/data.service';
import { Subject } from 'rxjs/Subject';
import { ExtraService } from './services/extra.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [DataService, ExtraService]
})
export class AppComponent implements OnInit {

    SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

    @ViewChild("topDet", {read: ElementRef}) refTop: ElementRef;
    @ViewChild("boxDetT", {read: ElementRef}) refBoxT: ElementRef;
    @ViewChild("footerDet", {read: ElementRef}) refFooter: ElementRef;

    public correctieFooter = 30;

    private timerMenu;
    private subMenu: Subscription;

    private urlTree = './inventarisatie/weergave/WEERGAVE.md';
    private urlDoc = './inventarisatie/docSort.md';

    public extraInfo;
    public datamd;
    public treemd;
    public sizeI;

    private fotoNummer = 0;
    private fotoNummerOld = 0;
    private pos: any;
    private item: any;

    private subWork;
    private subTree;
    private subSizeI;
    private subExtra;

    public sizeChange: Subject<any> = new Subject();
    private sizeCounter = 0;

    private breedte = window.innerWidth;
    private hoogte = window.innerHeight;
    private breedteOld = 0;
    private hoogteOld = 0;

    public items: ItemType[];
    public helpShow = false;
    public helpHtml;

    public readyData = false;

    public show = false;
    public menuAct = 0;
    public presence = false;

    public dataSel: boolean[];

    private werk: any;
    private werkS: any[];
    public werkPlus: any[];
    private n: number;
    private l: number;

    constructor(private store: Store<any>,
                private http: HttpClient,
                private dataService: DataService,
                private extraService: ExtraService) {
        this.subWork = store.select('datamd')
            .subscribe(datamd => {
                this.datamd = datamd;
            });
        this.subTree = store.select('treemd')
            .subscribe(treemd => {
                this.treemd = treemd;
            });
        this.subSizeI = store.select('sizeI')
            .subscribe(sizeI => {
                this.sizeI = sizeI;
            });
        this.subExtra = store.select('extraInfo')
            .subscribe(extraInfo => {
                this.extraInfo = extraInfo;
            })
    }
//_____________________________________________________________________
    onNavigate(value) {
//        console.log(`${value.name} | ${sub}`);
        this.show = false;
        this.helpShow = false;

        this.dataSel = value.data['vis'];
        this.extraInfo = value;
        this.store.dispatch({type: EXTRA_ALL, payload: this.extraInfo});
    }

//_____________________________________________________________________
    sizeGeg() {
        this.breedte = window.innerWidth;
        this.hoogte = window.innerHeight;

        if ((this.breedte != this.breedteOld) || (this.hoogte != this.hoogteOld) || (this.fotoNummer != this.fotoNummerOld)) {
            this.fotoNummerOld = this.fotoNummer;
            this.sizeI['header'] = this.refTop.nativeElement.offsetTop;
            this.sizeI['boxT'] = this.refBoxT.nativeElement.offsetTop;
            this.sizeI['footer'] = this.hoogte - this.correctieFooter;
            this.sizeI['breedte'] = this.breedte;
            this.sizeI['hoogte'] = this.hoogte;

            if (this.fotoNummer >= 0) {
                this.item = this.treemd[this.fotoNummer];
                this.pos = this.extraService.pictureSize(this.sizeI, this.item, 20, 120, 25);
                this.sizeI['upperX'] = this.pos['upperX'];
                this.sizeI['upperY'] = this.pos['upperY'];
                this.sizeI['fotoWidth'] = this.pos['width'];
                this.sizeI['fotoHeight'] = this.pos['height'];
            } else {
                this.sizeI['upperX'] = 100;
                this.sizeI['upperY'] = 100;
                this.sizeI['fotoWidth'] = 0;
                this.sizeI['fotoHeight'] = 0;
            }

            this.store.dispatch({type: SIZE_ALL, payload: this.sizeI});
            this.sizeChange.next(this.sizeCounter);
            this.sizeCounter++;
            this.breedteOld = this.breedte;
            this.hoogteOld = this.hoogte;
        }

    }
//______________________________________________________________________________________
    help() {
        this.helpShow = !this.helpShow;
        if (this.helpShow) {
            this.helpHtml = this.datamd[this.extraInfo.data['page']][this.extraInfo.data['info']].secure;
        }
    }
//_____________________________________________________________________
    tickerFunc() {
        //______________________geregeld kijken of de dimensies nog kloppen
        this.sizeGeg();
    }
//_____________________________________________________________________
    onGroot(nr) {            // melding van FOTOS
        this.fotoNummer = nr;
//        console.log(`melding: ${nr}`);
    }

//_____________________________________________________________________
    ngOnInit() {
        this.timerMenu = TimerObservable.create(100,15);       //hier wordt de tijd tik tijd ingesteld
        this.subMenu = this.timerMenu.subscribe(t => this.tickerFunc());

        this.items = NavItems;
        this.extraInfo = this.items[0];
        this.dataSel = this.items[0].data['vis'];

        this.store.dispatch({type: EXTRA_ALL, payload: this.extraInfo});

        //______________________________size___________________________________
        this.sizeI = {
            'header': 30,
            'boxT': 30,
            'footer': 1000,
            'breedte': this.breedte,
            'hoogte': this.hoogte,
            'upperX': 100,
            'upperY': 100,
            'fotoWidth': 0,
            'fotoHeight': 0
        };
//_____________de gegevens inlezen over de document structuur______________________________
        this.store.dispatch({type: WORK_CLEAR});
        this.http.get(this.urlDoc)
            .subscribe(res => {
                this.werk = res;
                this.werkPlus = [];
                for (this.n = 0; this.n < this.werk.length; this.n++) {
                    this.werkS = this.dataService.addSecurity(this.werk[this.n]);
                    this.werkPlus.push(this.werkS);
                }
                this.store.dispatch({type: WORK_ALL, payload: this.werkPlus});
                this.helpHtml = this.datamd[this.extraInfo.data['page']][this.extraInfo.data['info']].secure;
                console.log('==> datamd');
                console.log(this.datamd);
                this.readyData = true;
            });
//___________de gegevens inlezen over de picture files_____________________________________
        this.http.get(this.urlTree)
            .subscribe(data => {
                this.treemd = data;
                console.log('____________________tree__________________________');
                console.log(this.treemd);
                this.store.dispatch({type: TREE_ALL, payload: this.treemd});
            })
    }
}
