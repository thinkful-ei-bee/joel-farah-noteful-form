import React, { Component } from 'react';

import FolderList from '../folderlist/folderlist';
import NoteList from '../notelist/notelist';
import NoteContext from '../../context/NoteContext';

export default class HomePage extends Component {
  static contextType = NoteContext;

  render(){

    const { folders, notes } = this.context;
    
    return (
      <main role="main" className="App">
      <section className="main-layout">
      <div className="left-menu">
        <FolderList folders={folders} />
      </div>
      <div className="right-content">
        <NoteList notes={notes} />
      </div>
      </section>
      </main>
    )
  }
  
}