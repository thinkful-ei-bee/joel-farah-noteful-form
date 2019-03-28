import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import './App.css';
import { browserHistory }  from 'react-router-dom';
import NoteContext from './context/NoteContext';
import Header from './component/header/header';
import HomePage from './component/homepage/homepage';
import Folder from './component/Folder/Folder';
import Note from './component/Note/Note';
import AddFolder from './component/AddFolder/AddFolder'

class App extends Component {
  state = {
    folders: [],
    notes: [],
  }
  componentDidMount() {
    this.fetchApi('folders', 'folders');
    this.fetchApi('notes', 'notes');
  }
  fetchApi(endpoint, stateKey, method = 'GET') {
    fetch(`http://localhost:9090/${endpoint}`, {
      method: method,
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(response => {
      //console.log(response);
      if(method !== 'DELETE') {
        this.setState( {[stateKey]: response} );
      } 
    })
  }
  handleDeleteNote(id) {
    // console.log(id);
    // delete noteId from api via getStuff()
    this.fetchApi(`notes/${id.noteId}`, 'notes', 'DELETE');

    // delete noteId from state, this calls re-render
    let filtered = this.state.notes.filter(note => note.id !== id.noteId)
    // console.log(filtered);
    this.setState({ notes: filtered });

    // re-route here ..
    // WHY YOU NO WORKEY !!!!
    // browserHistory.push('/');
  }
  handleAddFolder() {
    console.log('hi');
  }
  render() {
    return (
      
      <NoteContext.Provider 
        value={{
          folders: this.state.folders,
          notes: this.state.notes,
          handleDeleteNote: noteId => this.handleDeleteNote({noteId}),
        }}
      >

        <Header />
        <Route exact path="/" component={ HomePage } />
          <Switch>
            <Route exact path="/folder/add" component={ AddFolder } />
            <Route exact path="/folder/:folderId" component={ Folder } />
          </Switch>
        <Route exact path="/notes/:noteId" component={ Note } />
        
      </NoteContext.Provider>
      
    );
  }
}

export default App;
