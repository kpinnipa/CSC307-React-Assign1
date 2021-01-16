import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

class App extends Component {
    state = {
        characters: []
    };

    removeCharacter = index => {
        const { characters } = this.state
        return axios.delete('http://localhost:5000/users/'+characters[index]['id'])
       .then(function (response) {
          this.setState({
            characters: characters.filter((character, i) => {
              return i !== index
            }),
          })
          return response;
       })
       .catch(function (error) {
         console.log(error);
         return false;
       });
        
    }

    makePostCall(character){
      return axios.post('http://localhost:5000/users', character)
       .then(function (response) {
         console.log(response.data);
         return response;
       })
       .catch(function (error) {
         console.log(error);
         return false;
       });
    }

    handleSubmit = character => {
      this.makePostCall(character).then( callResult => {
         if (callResult.status === 201) {
           console.log(callResult.config.data);
            this.setState({ characters: [...this.state.characters, callResult.data.user] });
         }
      });
    }

  componentDidMount() {
      axios.get('http://localhost:5000/users')
       .then(res => {
         const characters = res.data.users_list;
         this.setState({ characters });
       })
       .catch(function (error) {
         //Not handling the error. Just logging into the console.
         console.log(error);
       });
  }

  render() {
    const { characters } = this.state;
    return (
      <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default App