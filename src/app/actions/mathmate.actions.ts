import { Action } from '@ngrx/store';

export interface AddQuestionParam {
    num: number,
    scroll?: any
}

export interface SimilarQuestionParam {
    index: number,
    tplname: string
}

export const ActionTypes = {
    ADD_QUESTIONS: 'Add Questions',
    SIMILAR_QUESTION: 'Similar Question'
}

export class AddQuestionsAction implements Action {
  type = ActionTypes.ADD_QUESTIONS;

  constructor(public payload: AddQuestionParam) { }
}

export class SimilarQuestionAction implements Action {
  type = ActionTypes.SIMILAR_QUESTION;

  constructor(public payload: SimilarQuestionParam) { }
}

export type Actions = AddQuestionsAction | SimilarQuestionAction;

