import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/rx';

import { qblob, State } from '../../app/reducers';
import { AddQuestionsAction, /* AddQuestionsReqAction, */ SimilarQuestionAction } from '../../app/actions';


import { Store } from '@ngrx/store';

import { WebWorkerProvider } from '../../app/effects';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

  public qlist$: Observable<qblob[]>;

  constructor(
    public navCtrl: NavController,
    public store: Store<State>,
    public mmWorker: WebWorkerProvider
    ) {
    console.log(mmWorker);  
    this.qlist$ = this.store.select((state) => {
      return state.qlist;
    });
  }

  ngOnInit() {
    //this.store.dispatch(new AddQuestionsReqAction({num: 1}));
    //this.store.dispatch(new AddQuestionsReqAction({num: 1}));
    setTimeout(() => {
        //console.log('dispatching');
        //this.store.dispatch(new AddQuestionsReqAction({num: 10}));
      this.mmWorker
        .call('slowRandomNumber')
        .then((val) => {
          console.log(val);
          this.store.dispatch(new AddQuestionsAction({ num: 10 }));
        });
    }, 100);
  }

  doInfinite(infiniteScroll) {
    this.store.dispatch(new AddQuestionsAction({ num: 10, scroll: infiniteScroll }));
  }

  onSimilar(index: number, tplname: string) {
    this.store.dispatch(new SimilarQuestionAction({ index: index, tplname: tplname }));
  }

  presentPopover(cans: any) {
    /*
    this.popover = this.popoverController.create(AnsPopOverPage, {
      cans: cans
    });
    this.popover.present();
    */
  }  

}
