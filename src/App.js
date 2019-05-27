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
import config from './config'

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
    let url = config.API_ENDPOINT + `/${endpoint}`
    fetch(url, {
      method: method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(apiBody)
    })
    .then(response => {
      if (method === 'DELETE') {
        return ; // if method = delete, return nothing
      } else {
        return response.json() // if method !== delete, return json response
      }
    }) 
    .then(response => {
      if(method !== 'DELETE' && method !== 'POST') {
        this.setState( {[stateKey]: response} );
      } 
      if(method === 'POST') {
        if(stateKey === 'folders') {
          let newFolder = { id: response.id, folder_name: apiBody.folder_name };
          this.setState({folders: [...this.state.folders, newFolder]})
        }
        if(stateKey === 'notes') {
          let newNote = { id: response.id, note_name: apiBody.note_name, modified: response.modified, content: apiBody.content, folder_id: apiBody.folder_id };
          this.setState({
            notes: [...this.state.notes, newNote],
            folders: [...this.state.folders],
          })
        }
      }
    })
    .catch(error => console.error('Error:', error));
  }
  handleDeleteNote(id) {
    this.fetchApi(`notes/${id.noteId}`, 'notes', 'DELETE', );
    let filtered = this.state.notes.filter(note => note.id !== id.noteId)
    this.setState({ 
      notes: filtered,
      folders: [...this.state.folders]
    },() => {return this.props.history.push('/')} )
  }

  handleAddFolder(e) {
    e.preventDefault();
    let body = { folder_name: e.currentTarget.newFolder.value };
    this.fetchApi('folders', 'folders', 'POST', body);
    this.props.history.push('/');
  }
  handleAddNote(e) {
    e.preventDefault();
    const noteName = e.currentTarget.newNoteName.value;
    const noteText = e.currentTarget.newNoteText.value
    const noteFolder = e.currentTarget.folderSelection.value;
    const noteModified = new Date();
    let body = { note_name: noteName, modified: noteModified, content: noteText, folder_id: noteFolder };
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
