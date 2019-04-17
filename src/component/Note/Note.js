import React from 'react';
import NoteContext from '../../context/NoteContext';
import {withRouter} from 'react-router-dom';

class Note extends React.Component {
  static contextType = NoteContext;

  render() {
    const { notes, handleDeleteNote } = this.context;
    const noteId = this.props.match.params.noteId;
    console.log(noteId)


    const fullNote = notes.map((note, index) => 
      <li key={index}>
        <h3>{note.note_name}</h3>
        <p>{note.content}</p>
        <p>Date modified: {note.modified}</p>
      </li>
      )

    return (
      <main role="main" className="App">
      <section className="main-layout">
      <div className="left-menu">
      </div>
      <div className="right-content">
        
        <ul className="notes-list">
            {fullNote}
              <input 
                className="favorite styled"
                type="button"
                value="Delete note" 
                onClick={() => handleDeleteNote(noteId)}  
              /> 
        </ul>
      </div>
      </section>
      </main>
    )
  }
}

export default withRouter(Note);