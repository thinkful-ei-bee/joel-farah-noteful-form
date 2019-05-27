import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import NoteContext from '../../context/NoteContext';

export default class NoteList extends Component {
  static contextType = NoteContext;

  renderNote(){
    const { notes, handleDeleteNote } = this.context;
    const filteredNotes = this.props.filteredNotes;
    const filteredNotesList = (!filteredNotes) ? notes : filteredNotes;
    
    return <>
      <div className='NoteList'>
        <ul className="notes-list">
            {filteredNotesList.map((note, index) =>
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
                  }}
                /> 
              </li>  
            )}
          </ul>
      </div>
    </>
  }

  render() {
    return (
      <>
        {this.renderNote()}
        <Link to={`/notes/add`}>
          Add Note
        </Link>
      </>
    );
  }
}
