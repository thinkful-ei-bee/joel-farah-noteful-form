import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class FolderList extends Component {

  render() {
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
        <ul className="folder-list">
          {this.props.folders.map(folder =>
            <li key={folder.id} className={folder.id === this.props.selected ? 'folder-selected' : ''}>
              <Link to={`/folder/${folder.id}`}>
                {this.props.goBack ? 'Go Back' : folder.name}
              </Link>
            </li> 
          )}
        </ul>
    );
  }
}
