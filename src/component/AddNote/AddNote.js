import React from 'react';
import NoteContext from '../../context/NoteContext';
import FolderList from '../folderlist/folderlist';
import {withRouter} from 'react-router-dom';

class AddNote extends React.Component {
  static contextType = NoteContext;
  state = {
    noteValid: false, 
    validationMessages: {}
  };
  handleVerifyNoteName = noteName => {
    const validationMessages = {...this.state.validationMessages};
    let noteValid = true;

    if (noteName.length <= 1) { // Check if it's 9 characters long
      validationMessages.noteName = 'Folder name length must be over 1';
      noteValid = false;
    }
    this.setState({validationMessages, noteValid});
  }
  
  render() {
    const { noteName, validationMessages } = this.state;
    const { folders, handleAddNote } = this.context;

      return(
        <section className="main-layout">
          
        <div className="left-menu">
          <FolderList />
        </div>

        <div className="right-content">
        <form onSubmit={(e) => handleAddNote(e)}>

          <label htmlFor="newNoteName">
            Note name: 
            {validationMessages.noteName && (
              <p className="error">{validationMessages.noteName}</p>
            )}
          </label>
          <input id="newNoteName" type="text" value={noteName}
            onChange={e => this.handleVerifyNoteName(e.target.value)} />
          <br />

          <label htmlFor="newNoteText">
            Note text: 
            {validationMessages.noteName && (
              <p className="error">{validationMessages.noteName}</p>
            )}
          </label>
          <input id="newNoteText" type="text" value={noteName}
            onChange={e => this.handleVerifyNoteText(e.target.value)} />
          <br />
          
          Add to folder: 
          <select id="folderSelection">
          {folders.map((folder) => 
            <option value={folder.id}>{folder.name}</option>)} 
          </select>
          
          <button>Add</button>

        </form>
        </div>

        </section>
        )
    }
}

export default AddNote