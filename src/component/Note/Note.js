import React from 'react';
import FolderList from '../folderlist/folderlist';
import NoteContext from '../../context/NoteContext';
import {withRouter} from 'react-router-dom';

class Note extends React.Component {
  static contextType = NoteContext;

  render() {

    const { folders, notes, handleDeleteNote } = this.context;

    const noteId = this.props.match.params.noteId;
    
    const note = notes.find(note => note.id === noteId);
    
    return (
      <main role="main" className="App">
      <section className="main-layout">
      <div className="left-menu">
        <FolderList goBack folders={folders.filter(folder => folder.id === note.folderId)} selected={note.folderId}/>
      </div>
      <div className="right-content">
        
        <ul className="notes-list">
          
            <li key={note.id}>
              <h3>{note.name}</h3>
              <p>Date modified: {note.modified}</p>
              <input 
                className="favorite styled"
                type="button"
                value="Delete note" 
                onClick={() => handleDeleteNote(note.id)}  
              /> 
            </li>  
            <li>
              <p>
                {note.content}
              </p>
            </li>
          
        </ul>

      </div>
      </section>
      </main>
    )

  }
}

export default withRouter(Note);