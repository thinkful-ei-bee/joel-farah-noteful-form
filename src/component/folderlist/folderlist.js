import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import NoteContext from '../../context/NoteContext';

export default class FolderList extends Component {
  static contextType = NoteContext;

  render() {
    const { folders, handleAddFolder } = this.context;
    //console.log('FOLDERS:::: ', folders);
    if (this.props.goBack) {
      const folder = this.props.folders[0];

      return (
        <>
          <ul className="folder-list folder-selected">
            <li key={folder.id}>
              <Link to={`/folder/${folder.id}`}>
                Go Back
              </Link>
           </li>
          </ul>
          <p>
           {folder.name}
          </p>
        </>
      );
    }

    return (
      <>
        <ul className="folder-list">
          {folders.map(folder =>
            <li key={folder.id} className={folder.id === this.props.selected ? 'folder-selected' : ''}>
              <Link to={`/folder/${folder.id}`}>
                {this.props.goBack ? 'Go Back' : folder.name}
              </Link>
            </li> 
          )}
        </ul>
        <Link to={`/folder/add`}>
          Add folder
        </Link>
      </>
    );
  }
}
