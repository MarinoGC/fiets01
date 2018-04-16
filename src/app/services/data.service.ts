import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { KunstItems, KunstType } from '../models/nav.model';

@Injectable()
export class DataService {

    constructor(private sanitizer: DomSanitizer) {
    }

    private w = 0;
    private wl = 0;
    private werkPlus: any[];
    private werkItem: any;

    addSecurity(value) {
        this.werkPlus = [];
        this.wl = value.length;
        for (this.w = 0; this.w < this.wl; this.w++) {
            this.werkItem = {
                'secure': this.sanitizer.bypassSecurityTrustHtml(value[this.w]['content2']),
                'content1': value[this.w]['content1'],
                'content2': value[this.w]['content2'],
                'pag': value[this.w]['pag'],
                'veld': value[this.w]['veld'],
                'info': (value[this.w]['content1'].length > 0),
                'titel': value[this.w]['titel'],
                'volgnr': value[this.w]['volgnr']
            };
            this.werkPlus.push(this.werkItem);
        }
        return this.werkPlus;
    }

}
