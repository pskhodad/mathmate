import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { KatexCmp } from './components/katex.cmp';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    KatexCmp
  ],
  imports: [
    StoreModule.provideStore(reducer),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
