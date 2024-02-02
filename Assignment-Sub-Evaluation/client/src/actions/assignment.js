import {
  GET_ALL_ASSIGNMENTS,
  SUBMIT_ASSIGNMENT,
  EVALUATE_ASSIGNMENT,
  CREATE_ASSIGNMENT,
  GET_ALL_STD,
  GET_MY_ASSIGNMENT,
  CLEAR_AUTH_STATE
} from './actionTypes';

import { APIUrls } from '../helpers/urls';
import { getFormBody, getAuthTokenFromLocalStorage } from '../helpers/utils';

export function getAssignments() {
  return (dispatch) => {
    const url = APIUrls.getAllAssignments();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // dispatch action to save user

          dispatch(getAllAssignments(data.data.assignments));

          return;
        }
      });
  };
}

export function getmyAssignments(id) {
  return (dispatch) => {
    const url = APIUrls.getmyAssign();
    const token = getAuthTokenFromLocalStorage();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: getFormBody({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // dispatch action to save user

          dispatch(getmyassign(data.data.assignments));

          return;
        }
      });
  };
}

export function getAllStudents() {
  return (dispatch) => {
    const url = APIUrls.getAllStudents();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // dispatch action to save user

          dispatch(getStudents(data.data.students));

          return;
        }
      });
  };
}

export function submit(somedata) {
  return (dispatch) => {
    const url = APIUrls.submitAssignment();
    const token = getAuthTokenFromLocalStorage();

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: somedata,
    };

    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(submitAssignment(data.message));
        dispatch(getAssignments());
      });
  };
}

export function evaluate(aid, sid, grade, uid) {
  console.log('uid', uid);
  return (dispatch) => {
    const url = APIUrls.evaluateAssignment();
    const token = getAuthTokenFromLocalStorage();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: getFormBody({ aid, sid, grade }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(evaluateAssignment(data.message));
        dispatch(getmyAssignments(uid));
      });
  };
}

export function create(title, description, id) {
  console.log('eyah id dd', id);
  return (dispatch) => {
    const url = APIUrls.createAssignment();
    const token = getAuthTokenFromLocalStorage();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: getFormBody({ title, description, id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(createAssignment(data.message));
        dispatch(getmyAssignments(id));
      });
  };
}

export function getAllAssignments(assignments) {
  return {
    type: GET_ALL_ASSIGNMENTS,
    assignments,
  };
}
export function submitAssignment(message) {
  return {
    type: SUBMIT_ASSIGNMENT,
    message,
  };
}
export function evaluateAssignment(message) {
  return {
    type: EVALUATE_ASSIGNMENT,
    message,
  };
}
export function createAssignment(message) {
  return {
    type: CREATE_ASSIGNMENT,
    message,
  };
}
export function getStudents(std) {
  return {
    type: GET_ALL_STD,
    std,
  };
}
export function getmyassign(filter) {
  return {
    type: GET_MY_ASSIGNMENT,
    filter,
  };
}
export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}
