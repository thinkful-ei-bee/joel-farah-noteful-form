import React from 'react';
import FolderList from '../folderlist/folderlist';
import NoteList from '../notelist/notelist';
import NoteContext from '../../context/NoteContext';
import {withRouter} from 'react-router-dom';

class Folder extends React.Component {
  static contextType = NoteContext;

  render() {

    const { folders, notes } = this.context;
    const folderId = this.props.match.params.folderId;

    return (
      <main role="main" className="App">
      <section className="main-layout">
      <div className="left-menu">
        <FolderList folders={folders} selected={folderId}/>
      </div>
      <div className="right-content">
        <NoteList 
          filteredNotes={notes.filter(note => note.folder_id.toString() === folderId)}
          folderId = {this.folderId} />
      </div>
      </section>
      </main>
    )

  }
}

export default withRouter(Folder);
