import React, { Component } from 'react';

import FolderList from '../folderlist/folderlist';
import NoteList from '../notelist/notelist';

export default class HomePage extends Component {
  render(){
    return (
      <main role="main" className="App">
        <section className="main-layout">
          <div className="left-menu">
            <FolderList />
          </div>
          <div className="right-content">
            <NoteList />
          </div>
        </section>
      </main>
    )
  }
  
}