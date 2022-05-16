import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Container as NotesContainer } from './Routes/Notes/Container';
import { Container as BudgetContainer } from './Routes/Budget/Container';
import { Container as MapContainer } from './Routes/Map/Container';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import NotesList from "./components/Notes/NotesList";
import Search from './components/Notes/Search';
import { Header } from './components/header';
const App = () => {

  return (


    <BrowserRouter>

      <Link to='/notes'>Notes  </Link>
      <Link to='/budget'>Budget Calculator  </Link>
      <Link to='/map'>Map</Link>
      <Routes >
        <Route path='/notes' element={<NotesContainer />} />
        <Route path='/budget' element={<BudgetContainer />} />
        <Route path='/map' element={<MapContainer />} />

      </Routes>
    </BrowserRouter>
  );
};
export default App;