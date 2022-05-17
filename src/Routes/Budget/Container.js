import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { BudgetItem } from '../../components/Budget/BudgetItem';



import './budgetPage.css'
import { Appcontext } from '../../App';


function Container() {
    const { state, dispatch } = useContext(Appcontext)
    const [budgetName, setBudgetName] = useState('')
    const [maxBudget, setMaxBudget] = useState('');
    const addBudget = () => {
        const newBudget = {
            name: budgetName,
            maxBudget,
            expenses: []
        }
        dispatch({ type: 'ADD_BUDGET', payload: newBudget })

        setBudgetName('');
        setMaxBudget('');
    }

    function renderBudgetItem(budget, index) {
        return <BudgetItem key={index} name={budget.name} expenses={budget.expenses} maxBudget={budget.maxBudget} />
    }



    return (
        <div className='container'>
            <div className='form-section'>
                <TextField
                    placeholder='Budget Name'
                    onChange={e => setBudgetName(e.target.value)}
                    value={budgetName}
                    id="outlined-basic"
                    variant="outlined"
                    style={{ backgroundColor: '#f3cbe6' }}
                />
                <TextField
                    placeholder='Budget Amount'
                    onChange={e => setMaxBudget(e.target.value)}
                    value={maxBudget} id="outlined-basic"
                    variant="outlined"
                    style={{ backgroundColor: '#f3cbe6', marginLeft: '25px' }}
                />
                <Button
                    style={{ backgroundColor: '#f3cbe6', color: 'black', marginLeft: '25px' }}
                    onClick={addBudget}
                    variant="contained">Add Budget
                </Button>





            </div>
            {state.budgets.map(renderBudgetItem)}
        </div>
    )
}
export { Container };