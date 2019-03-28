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
import AddFolder from './component/AddFolder/AddFolder';
import AddNote from './component/AddNote/AddNote';
import ErrorPage from './component/ErrorBoundries/ErrorPage';

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
        if(stateKey === 'folders') {
          let newFolder = { id: response.id, name: apiBody.name };
          this.setState({folders: [...this.state.folders, newFolder]})
        }
        if(stateKey === 'notes') {
          console.log(apiBody);
          let newNote = { id: response.id, name: apiBody.name, content: apiBody.content, folderId: apiBody.folderId };
          this.setState({notes: [...this.state.notes, newNote]})
        }
      }
    })
    .catch(error => console.error('Error:', error));
  }
  handleDeleteNote(id) {
    // console.log(id);
    // delete noteId from api via getStuff()
    this.fetchApi(`notes/${id.noteId}`, 'notes', 'DELETE', );

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
    //console.log(JSON.stringify(body));
    // add to api
    this.fetchApi('folders', 'folders', 'POST', body);
    // redirect
    this.props.history.push('/');
  }
  handleAddNote(e) {
    e.preventDefault();
    console.log(e.currentTarget.newNote);
    const noteName = e.currentTarget.newNoteName.value;
    const noteText = e.currentTarget.newNoteText.value
    const noteFolder = e.currentTarget.folderSelection.value;
    let body = { name: noteName, content: noteText, folderId: noteFolder };
    this.fetchApi('notes', 'notes', 'POST', body);
    this.props.history.push('/');
  }
  render() {
    return (
      
      <ErrorPage>
        <NoteContext.Provider 
          value={{
            folders: this.state.folders,
            notes: this.state.notes,
            handleDeleteNote: noteId => this.handleDeleteNote({noteId}),
            handleAddFolder: (e) => this.handleAddFolder(e),
            handleAddNote: (e) => this.handleAddNote(e),
          }}
        >

          <Header />
          <Route exact path="/" component={ HomePage } />
            <Switch>
              <Route exact path="/folder/add" component={ AddFolder } />
              <Route exact path="/folder/:folderId" component={ Folder } />
            </Switch>

          <Switch>
            <Route exact path="/notes/add" component={ AddNote } />
            <Route exact path="/notes/:noteId" component={ Note } />
          </Switch>
          
        </NoteContext.Provider>
      </ErrorPage>
    );
  }
}

export default withRouter(App);
