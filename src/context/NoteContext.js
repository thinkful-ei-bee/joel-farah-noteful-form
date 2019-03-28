import React from 'react';

const NoteContext = React.createContext({
  folders: [],
  notes: [],
  handleDeleteNote: () => {},
  handleAddFolder: () => {},
  handleAddNote: () => {},
})

export default NoteContext;