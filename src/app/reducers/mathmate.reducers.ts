import { Actions, AddQuestionParam, SimilarQuestionParam, ActionTypes } from '../actions';

import * as mathmate_templates from 'mathmate-templates';
import { sampleSize } from 'lodash';

export interface qblob {
    qtxt: string;
    cans: any;
    name: string;
}

export interface State {
    qlist: qblob[]
}

const initialState: State = {
  qlist: []
}

function getQuestions(num: number) {
    var qtxts = [];
    sampleSize(Object.keys(mathmate_templates), num).forEach(tplname => {
        let q = new mathmate_templates[tplname]();
        qtxts.push({
            name: tplname,
            qtxt: q.qtxt,
            cans: (typeof q.cans) === 'object' ? q.cans_fmt : q.cans
        });
    });
    return qtxts;
}

export function reducer(state = initialState, action: Actions): State {
    console.log(action);
    switch (action.type) {
        case ActionTypes.ADD_QUESTIONS: {
            let newQlist = getQuestions((action.payload as AddQuestionParam).num);
            if ((action.payload as AddQuestionParam).scroll) {
                (action.payload as AddQuestionParam).scroll.complete();
            }
            return Object.assign({}, state, { qlist: [...state.qlist, ...newQlist] });
        }
        case ActionTypes.SIMILAR_QUESTION: {
            let tmpQlist = state.qlist.map((tpl, index) => {
                if (index === (action.payload as SimilarQuestionParam).index) {
                    let q = new mathmate_templates[(action.payload as SimilarQuestionParam).tplname]();
                    tpl = {
                        name : (action.payload as SimilarQuestionParam).tplname,
                        qtxt: q.qtxt,
                        cans: (typeof q.cans) === 'object' ? q.cans_fmt : q.cans
                    }
                }
                return tpl;
            });
            return Object.assign({}, state, { qlist: tmpQlist });
        }
        default: {
            return state;
        }
    }
}

