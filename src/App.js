import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getRepos } from './redux';

// App.js
export class App extends Component {

  state = {
    searchKey: 'guitars',
    username: "cjNQuxvlGq"
  };

  componentDidMount() {
    this.updateRepoList(this.state.username);
  }

//  componentDidUpdate() {
//     this.updateRepoList(this.state.username);
//   }

  updateRepoList = username => {
    this.props.getRepos(username);
  }



//

  render() {
    return (
      <div>
        <h1>I AM AN ASYNC APP!!!</h1>
        <strong>Github username: </strong>
        <select
        onChange={(ev) => {
            let searching = "cjNQuxvlGq";
            let guitars = "Guitar manufacterors";
            let stars = "Rock hall of fame members";

            switch(ev.target.value) {
              case guitars:
                searching = "cjNQuxvlGq";
                break;
              case stars:
                searching = "bUWNjaXuKW";
                break;
              default:
                searching = "cjNQuxvlGq";
            }
            
            this.setState({
            username: searching
            })
            this.updateRepoList(searching);
          }
            }>
          <option value="Guitar manufacterors">Guitar manufacterors</option>
          <option value="Rock hall of fame members">Rock hall of fame members</option>
        </select>

        <ul>
          {this.props.repos.map((ob, index) => (
            <li key={index}>
                {ob.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// AppContainer.js
const mapStateToProps = (state, ownProps) => ({ repos: state.repos });
const mapDispatchToProps = { getRepos };
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
