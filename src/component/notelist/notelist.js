import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import NoteContext from '../../context/NoteContext';

export default class NoteList extends Component {
  static contextType = NoteContext;

  render() {
    const { notes, handleDeleteNote } = this.context;

    const filteredNotes = this.props.filteredNotes;
    const notesList = (!filteredNotes) ? [] : filteredNotes;
    console.log(notes.map(note => note.folder_id))
  
    
    return (
      <>
        <ul className="notes-list">
          {notes.map((note, index) =>
            <li key={index}>
              <Link to={`/notes/${note.id}`}>
                {note.note_name}
              </Link>
              <p>Date modified: {note.modified}</p>
              <input 
                className="favorite styled"
                type="button"
                value="Delete note" 
                onClick={() => {
                  handleDeleteNote(note.id)
                  //this.props.history.push('/');
                }}
              /> 
            </li>  
          )}
        </ul>
        <Link to={`/notes/add`}>
          Add Note
        </Link>
      </>
    );
  }
}
