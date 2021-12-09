export const SET_ID = 'SET_ID'
export const SET_QUESTION = 'SET_QUESTION'
export const SET_HELPER = 'SET_HELPER'
export const SET_ANSWER = 'SET_ANSWER'
export const SET_WRONG_ANSWER_1 = 'SET_WRONG_ANSWER_1'
export const SET_WRONG_ANSWER_2 = 'SET_WRONG_ANSWER_2'
export const SET_ANSWERS = 'SET_ANSWERS'

export const setId = (id) => (dispatch) => {
  dispatch({
    type: SET_ID,
    payload: id,
  })
}

export const setQuestion = (question) => (dispatch) => {
  dispatch({
    type: SET_QUESTION,
    payload: question,
  })
}

export const setHelper = (helper) => (dispatch) => {
  dispatch({
    type: SET_HELPER,
    payload: helper,
  })
}

export const setAnswer = (answer) => (dispatch) => {
  dispatch({
    type: SET_ANSWER,
    payload: answer,
  })
}

export const setWrongAnswer1 = (wrongAnswer1) => (dispatch) => {
  dispatch({
    type: SET_WRONG_ANSWER_1,
    payload: wrongAnswer1,
  })
}

export const setWrongAnswer2 = (wrongAnswer2) => (dispatch) => {
  dispatch({
    type: SET_WRONG_ANSWER_2,
    payload: wrongAnswer2,
  })
}

export const setAnswers = (answers) => (dispatch) => {
  dispatch({
    type: SET_ANSWERS,
    payload: answers,
  })
}