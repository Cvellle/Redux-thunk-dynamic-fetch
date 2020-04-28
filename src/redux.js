import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

// actions.js
export const addRepos = repos => ({
  type: "ADD_REPOS",
  repos
});
export const clearRepos = () => ({ type: "CLEAR_REPOS" });

// 1
export const getRepos = urlPart => dispatch => {
  const url = `https://www.json-generator.com/api/json/get/${urlPart}?indent=2`;
  return fetch(url)
    .then(function (result) {
      if (result.status === 200) {
        return result.json();
      }
      throw "request failed";
    })
    .then(function (repos) {
      dispatch(addRepos(repos));
    });
};

// reducers.js
export const repos = (state = [], action) => {
  switch (action.type) {
    case "ADD_REPOS":
      return action.repos;
    case "CLEAR_REPOS":
      return [];
    default:
      return state;
  }
};

// store.js
export const reducers = combineReducers({ repos });
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState, applyMiddleware(thunk));
  return store;
}

export const store = configureStore();
