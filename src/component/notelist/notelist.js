import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import NoteContext from '../../context/NoteContext';

export default class NoteList extends Component {
  static contextType = NoteContext;

  render() {

    const { folders, notes, handleDeleteNote } = this.context;
    
    return (

      <>
        <ul className="notes-list">
          {notes.map(note =>
            <li key={note.id}>
              <Link to={`/notes/${note.id}`}>
                {note.name}
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
