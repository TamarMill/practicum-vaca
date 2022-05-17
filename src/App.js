import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Container as NotesContainer } from './Routes/Notes/Container';
import { Container as BudgetContainer } from './Routes/Budget/Container';
import { Container as MapContainer } from './Routes/Map/Container';
import { useReducer, createContext } from 'react';

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



    default:
      throw new Error();
  }
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (

    <Appcontext.Provider value={{ state, dispatch }}>
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
    </Appcontext.Provider>
  );
};
export default App;