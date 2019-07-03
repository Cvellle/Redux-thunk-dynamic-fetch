import { applyMiddleware, combineReducers, createStore } from "redux";

import thunk from "redux-thunk";

// actions.js
export const addRepos = repos => ({
  type: "ADD_REPOS",
  repos
});

export const clearRepos = () => ({ type: "CLEAR_REPOS" });

// 1
export const getRepos = username => dispatch => {
  const url = `http://www.json-generator.com/api/json/get/${username}?indent=2`;

  return fetch(url)
    .then(function(result) {
      //dispatch(loadingChangedAction(false));
      //if (result.status === 200) {
      return result.json();
      //}
      //throw "request failed";
    })
    .then(function(repos) {
      dispatch(addRepos(repos));
    });
};

//2
// export const getRepos = username => async dispatch => {
//   const url = `https://api.github.com/users/${username}/repos?sort=updated`;
//   const repos = await fetch(url).then(response => response.json());
//   dispatch(addRepos(repos));
// };

//3
// export const getRepos = () => {
//   return function(dispatch) {
//     //var state = getState();
//     var url = "https://api.github.com/users/Cvellle/repos?sort=updated";
//     //dispatch(loadingChangedAction(true));

//     return fetch(url)
//       .then(function(result) {
//         //dispatch(loadingChangedAction(false));

//         //if (result.status === 200) {
//           return result.json();
//         //}

//         //throw "request failed";
//       })
//       .then(function(repos) {
//         dispatch(addRepos(repos));
//       })
//       // .catch(function(err) {
//       //   sweetAlert("Oops...", "Couldn't fetch repos for user: " + state.user, "error");
//       // });
//   }
// }

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

export const reducers = combineReducers({ repos });

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState, applyMiddleware(thunk));
  return store;
}

export const store = configureStore();
