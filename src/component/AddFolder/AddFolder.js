import React from 'react';
import NoteContext from '../../context/NoteContext';
import FolderList from '../folderlist/folderlist';
import {withRouter} from 'react-router-dom';

class AddFolder extends React.Component {
  static contextType = NoteContext;
  state = {
    folderValid: false, 
    validationMessages: {}
  };
  handleVerifyFolderName = folderName => {
    const validationMessages = {...this.state.validationMessages};
    let folderValid = true;

    if (folderName.length <= 1) { // Check if it's 9 characters long
      validationMessages.folderName = 'Folder name length must be over 1';
      folderValid = false;
    }
    this.setState({validationMessages, folderValid});
  }
  render() {
    const { folderName, validationMessages } = this.state;
    const { folders, handleAddFolder } = this.context;
    return (

        <section className="main-layout">

          <div className="left-menu">
            
          </div>

          <div className="right-content">
            <form onSubmit={(e) => handleAddFolder(e)}>
              <label htmlFor="newFolder">
                Folder name
                {validationMessages.folderName && (
                  <p className="error">{validationMessages.folderName}</p>
                )}
              </label>
              <input id="newFolder" type="text" value={folderName}
                onChange={e => this.handleVerifyFolderName(e.target.value)} />
              <button>Add</button>
            </form>
          </div>

        </section>

    );
  }
}

export default withRouter(AddFolder);
