import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import './App.css';
import {withRouter} from 'react-router-dom';
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
  fetchApi(endpoint, stateKey, method = 'GET', apiBody ) {
    fetch(`http://localhost:9090/${endpoint}`, {
      method: method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(apiBody)
    })
    .then(response => response.json())
    .then(response => {
      //console.log(response);
      if(method !== 'DELETE' && method !== 'POST') {
        this.setState( {[stateKey]: response} );
      } 
      if(method === 'POST') {
        //console.log(`stateKey: ${stateKey} id: ${response.id} name: ${apiBody.name}`);
        let newFolder = { id: response.id, name: apiBody.name };
        let newFolders = this.state.folders;
        newFolders.push(newFolder);
        this.setState({folders: newFolders})
      }
    })
    .catch(error => console.error('Error:', error));
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
  handleAddFolder(e) {
    // get value for api
    e.preventDefault();
    let body = { name: e.currentTarget.newFolder.value };
    console.log(JSON.stringify(body));
    // add to api
    this.fetchApi('folders', 'folders', 'POST', body);
    // redirect
    this.props.history.push('/');
  }
  render() {
    return (
      
      <NoteContext.Provider 
        value={{
          folders: this.state.folders,
          notes: this.state.notes,
          handleDeleteNote: noteId => this.handleDeleteNote({noteId}),
          handleAddFolder: (e) => this.handleAddFolder(e),
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

export default withRouter(App);
