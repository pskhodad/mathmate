import { Action } from '@ngrx/store';

export interface AddQuestionParam {
    num: number,
    scroll?: any
}

export interface AddQuestionReqParam {
    num: number,
    scroll?: any
}

export interface SimilarQuestionParam {
    index: number,
    tplname: string
}

export const ActionTypes = {
    ADD_QUESTIONS_REQ: 'Add Questions Request',
    ADD_QUESTIONS: 'Add Questions',
    SIMILAR_QUESTION: 'Similar Question'
}

export class AddQuestionsAction implements Action {
  type = ActionTypes.ADD_QUESTIONS;

  constructor(public payload: AddQuestionParam) { }
}

export class AddQuestionsReqAction implements Action {
  type = ActionTypes.ADD_QUESTIONS_REQ;

  constructor(public payload: AddQuestionReqParam) { }
}

export class SimilarQuestionAction implements Action {
  type = ActionTypes.SIMILAR_QUESTION;

  constructor(public payload: SimilarQuestionParam) { }
}

export type Actions = AddQuestionsAction | AddQuestionsReqAction | SimilarQuestionAction;

