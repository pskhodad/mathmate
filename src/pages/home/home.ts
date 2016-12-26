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
  public mmWorker: WebWorkerProvider;

  constructor(
    public navCtrl: NavController,
    public store: Store<State>
    ) {
    this.qlist$ = this.store.select((state) => {
      return state.qlist;
    });
  }

  ngOnInit() {
    //this.store.dispatch(new AddQuestionsReqAction({num: 1}));
    //this.store.dispatch(new AddQuestionsReqAction({num: 1}));
      
      this.mmWorker = new WebWorkerProvider();
      
      this.mmWorker
        .call('slowRandomNumber')
        .then((resp) => {
          console.log((resp as any).qlist);
          this.store.dispatch(new AddQuestionsAction((resp as any).qlist));
        });
  }

  doInfinite(infiniteScroll) {
      this.mmWorker
        .call('slowRandomNumber')
        .then((resp) => {
          console.log((resp as any).qlist);
          this.store.dispatch(new AddQuestionsAction((resp as any).qlist));
        });
      infiniteScroll.complete();  
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
