import React from 'react';
import NoteContext from '../../context/NoteContext';
import {withRouter} from 'react-router-dom';

class Note extends React.Component {
  static contextType = NoteContext;

  render() {
    const { notes, handleDeleteNote } = this.context;
    const noteId = this.props.match.params.noteId;
    const filteredNotes = notes.filter(note => note.id.toString() === noteId)
    
    return (
      <main role="main" className="App">
        <section className="main-layout">
          <div className="right-content">
            <ul className="notes-list">
              {filteredNotes.map((note, index) => 
                <li key={index}>
                  <h3>{note.note_name}</h3>
                  <p>{note.content}</p>
                  <p>Date modified: {note.modified}</p>
                <input 
                  className="favorite styled"
                  type="button"
                  value="Delete note" 
                  onClick={() => { handleDeleteNote(note.id)
                }}  
                  /> 
                </li> 
                )}
            </ul>
          </div>
        </section>
      </main>
    )
  }
}

export default withRouter(Note);