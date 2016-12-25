import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
//import { Action } from '@ngrx/store';
import { ActionTypes, AddQuestionsReqAction, AddQuestionsAction } from '../actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';


//import { WebWorkerProvider } from 'angular2-webworker';
@Injectable()
export class WebWorkerProvider {
  
  port: any;
  _pendingRequests: any;
  workerscript: string;

  constructor() {

    this.workerscript = "worker.js";  

    this.port = new Worker(this.workerscript);

    // worker jobs awaiting response {callId: [resolve, reject]}
    this._pendingRequests = {};

    this.port.addEventListener('message', event => {
      const {portCallerResponseId, value, error} = event.data;

      if (!portCallerResponseId) return;

      const [resolve, reject] = this._pendingRequests[portCallerResponseId];
      delete this._pendingRequests[portCallerResponseId];

      if (error) {
        reject(new Error(error));
        return;
      }

      resolve(value);
    });

    if (this.port.start) this.port.start();

  }

  send(method, ...args) {
    this.port.postMessage({
      method,
      args
    });
  }
  call(method, ...args) {
    return new Promise((resolve, reject) => {
      const portCallerMessageId = Math.random();
      this._pendingRequests[portCallerMessageId] = [resolve, reject];

      this.port.postMessage({
        method,
        args,
        portCallerMessageId
      });
    });
  }

}

@Injectable()
export class MathMateEffects {

    constructor(
        public actions$: Actions,
        public mmWorker: WebWorkerProvider
    ) {
//        console.log(mmWorker);
//       var ww = new Worker("worker.js");
       console.log(mmWorker);
    }

    @Effect()
    addQuestions$: Observable<any> = this.actions$
        .ofType(ActionTypes.ADD_QUESTIONS_REQ)
//        .map((action: AddQuestionsReqAction) => {
//            this.mmWorker.call('slowRandomNumber').then(val => console.log(val));
//            return new AddQuestionsAction(action.payload)
//        }) 
        .map((action: AddQuestionsReqAction) => action.payload)
        .mergeMap(payload => {
            let prom = new Promise((resolve, reject) => {
                console.log('firing promise');
                this.mmWorker.call('slowRandomNumber').then(val => resolve({
                    val: val,
                    num: payload.num
                }));
                //setTimeout(() => { resolve(42) }, 5000);                 
            });
            //var subscription = Observable.fromPromise(prom);
            return Observable.fromPromise(prom); 
        })
        .map((val) => {
            console.log(val);
            return new AddQuestionsAction({num: val.num}); 
        } )

}