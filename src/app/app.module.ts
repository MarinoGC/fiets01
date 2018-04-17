import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { environment } from './../environments/environment';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { datamd } from './reducers/work.reducer';
import { sizeI } from './reducers/size.reducer';
import { treemd } from './reducers/tree.reducer';
import { extraInfo } from './reducers/extra.reducer';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { KaartComponent } from './kaart/kaart.component';
import { VerslagComponent } from './verslag/verslag.component';
import { FotosComponent } from './fotos/fotos.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        KaartComponent,
        VerslagComponent,
        FotosComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot({datamd, sizeI, treemd, extraInfo}),
        !environment.production ? StoreDevtoolsModule.instrument({maxAge: 25}) : []
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
