import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StoreModule } from '@ngrx/store';
//import { EffectsModule } from '@ngrx/effects';

import { KatexCmp } from './components/katex.cmp';

//import { MathMateEffects } from './effects'
import { reducer } from './reducers';

//import { WebWorkerModule } from 'angular2-webworker';
//import { WorkerScriptToken, WebWorkerProvider, setupWebWorker } from 'angular2-webworker';
import { WebWorkerProvider } from './effects';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    KatexCmp
  ],
  imports: [
    StoreModule.provideStore(reducer),
    //EffectsModule.run(MathMateEffects),
    //WebWorkerModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    WebWorkerProvider

//    { provide: WorkerScriptToken, useValue: "worker.js" },
//    { provide: WebWorkerProvider, useFactory: setupWebWorker, deps: [WorkerScriptToken] }
  ]
})
export class AppModule {}
