import {
  SET_ID,
  SET_QUESTION,
  SET_HELPER,
  SET_ANSWER,
  SET_WRONG_ANSWER_1,
  SET_WRONG_ANSWER_2,
} from './actions'

const initialState = {
  id: 0,
  question: '',
  helper: '',
  answer: '',
  wrongAnswer1: '',
  wrongAnswer2: '',
}

function levelReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ID:
      return { ...state, id: action.payload }
    case SET_QUESTION:
      return { ...state, question: action.payload }
    case SET_HELPER:
      return { ...state, helper: action.payload }
    case SET_ANSWER:
      return { ...state, answer: action.payload }
    case SET_WRONG_ANSWER_1:
      return { ...state, wrongAnswer1: action.payload }
    case SET_WRONG_ANSWER_2:
      return { ...state, wrongAnswer2: action.payload }
    default:
      return state
  }
}

export default levelReducer
