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

        </div>

        <div className="right-content">
        <form onSubmit={(e) => handleAddNote(e)}>
          <label htmlFor="newNote">
            Note
            {validationMessages.noteName && (
              <p className="error">{validationMessages.noteName}</p>
            )}
          </label>
          <input id="newNote" type="text" value={noteName}
            onChange={e => this.handleVerifyNoteName(e.target.value)} />
          <select>
          {folders.map((folder) => 
            <option value="folder">{folder.name}</option>)} 
          </select>
          <button>Add</button>
        </form>
        </div>

        </section>
        )
    }
}

export default AddNote