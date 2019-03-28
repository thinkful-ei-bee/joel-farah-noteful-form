import React from 'react';

const NoteContext = React.createContext({
  folders: [],
  notes: [],
  handleDeleteNote: () => {},
})

export default NoteContext;