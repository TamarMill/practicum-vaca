import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Container as NotesContainer } from './Routes/Notes/Container';
import { Container as BudgetContainer } from './Routes/Budget/Container';
import { Container as MapContainer } from './Routes/Map/Container';
import { useReducer, createContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as React from "react";

import Box from "@mui/material/Box";


import immer from 'immer';


const Appcontext = createContext()
export { Appcontext }
const initialState = {
  notes: [],
  budgets: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_NOTE':
      return immer(state, draft => {
        draft.notes.push(action.payload)
      })
    case 'DELETE_NOTE':
      return immer(state, draft => {
        draft.notes = draft.notes.filter(note => note.id !== action.payload)
      })
    case 'ADD_BUDGET':
      return immer(state, draft => {
        draft.budgets.push(action.payload)
      })
    case 'ADD_EXPENSE':
      return immer(state, draft => {
        const chosenBudget = draft.budgets.find(b => b.name === action.payload.chosenCategory)
        chosenBudget.expenses.push(action.payload.expense)
      })
    case 'DELETE_EXPENSE':
      return immer(state, draft => {
        draft.budgets = draft.budgets.filter(budget => budget.name !== action.payload)
      })
    case 'ADD_EXPENSE_DESCRIPTION':
      return immer(state, draft => {
        const chosenBudget = draft.budgets.find(b => b.name === action.payload.chosenCategory)
        chosenBudget.expenseDescriptions.push(action.payload.expenseDescription)
      })



    default:
      throw new Error();
  }
}






const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <div>

      <Appcontext.Provider value={{ state, dispatch }}>



        <BrowserRouter>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs style={{ backgroundColor: 'white' }} aria-label="basic tabs example" >
              <Link to='/'><Tab label='Notes' />  </Link>
              <Link to='/budget'><Tab label='Budget Calculator' /> </Link>
              <Link to='/map'><Tab label='Map' /></Link>
            </Tabs>

          </Box>



          <Routes >

            <Route path='/' element={<NotesContainer />} />
            <Route path='/budget' element={<BudgetContainer />} />
            <Route path='/map' element={<MapContainer />} />

          </Routes>
        </BrowserRouter>
      </Appcontext.Provider>

    </div >
  );
}

export default App;

