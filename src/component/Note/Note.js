import React from 'react';
import FolderList from '../folderlist/folderlist';
import NoteContext from '../../context/NoteContext';
import {withRouter} from 'react-router-dom';

class Note extends React.Component {
  static contextType = NoteContext;

  render() {
    const { folders, notes, handleDeleteNote } = this.context;
    const noteId = this.props.match.params.noteId;
    
    const note_id = notes.find(note => note.id === noteId);

    const fullNote = notes.map((note, index) => 
      <li key={index}>
        <h3>{note.name}</h3>
        <p>{note.content}</p>
        <p>Date modified: {note.modified}</p>
      </li>
      )

    return (
      <main role="main" className="App">
      <section className="main-layout">
      <div className="left-menu">
        {/* <FolderList goBack folders={folders.filter(folder => folder.id === note.folderId)} selected={note.folderId}/> */}
      </div>
      <div className="right-content">
        
        <ul className="notes-list">
            {fullNote}
            {/* <li key={note.id}>
              <h3>{note.name}</h3>
              <p>Date modified: {note.modified}</p> */}
              <input 
                className="favorite styled"
                type="button"
                value="Delete note" 
                onClick={() => handleDeleteNote(note_id)}  
              /> 
        </ul>
      </div>
      </section>
      </main>
    )

  }
}

export default withRouter(Note);