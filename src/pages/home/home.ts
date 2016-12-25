import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/rx';

import { qblob, State } from '../../app/reducers';
import { AddQuestionsAction, SimilarQuestionAction } from '../../app/actions';


import { Store } from '@ngrx/store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class HomePage {

  public qlist$: Observable<qblob[]>;

  constructor(
    public navCtrl: NavController,
    public store: Store<State>
    ) {
    this.qlist$ = this.store.select((state) => {
      return state.qlist;
    });
  }

  ngOnInit() {
    this.store.dispatch(new AddQuestionsAction({num: 1}));
    setTimeout(() => {
        this.store.dispatch(new AddQuestionsAction({num: 10}));
    }, 1000);
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
