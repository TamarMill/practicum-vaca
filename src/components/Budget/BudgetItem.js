import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Appcontext } from '../../App'
import { useContext, useState } from 'react'

function BudgetItem({ name, expenses, maxBudget }) {
    const [expense, setExpense] = useState('')
    const { dispatch } = useContext(Appcontext)
    function renderExpense(expense, index) {
        return (
            <div key={index}>
                <h5>{expense}</h5>
            </div>
        )
    }
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total += parseInt(expenses[i]);
    }
    function addExpense() {
        dispatch({ type: 'ADD_EXPENSE', payload: { chosenCategory: name, expense } })
        setExpense('')
    }
    function deleteBudget() {
        dispatch({ type: 'DELETE_EXPENSE', payload: name })
    }

    return (
        <div className='budget-card'>
            <Card variant="outlined">

                <h1 >{name}</h1>
                <h5> total:{total} of {maxBudget}</h5>
                <h5>List of Expense Amounts:</h5>
                <h5>{expenses.map(renderExpense)}</h5>
                <TextField
                    placeholder='Expense Amount'
                    onChange={e => setExpense(e.target.value)}
                    value={expense} id="outlined-basic"
                    variant="outlined"
                />

                <Button
                    onClick={addExpense}
                    variant="contained">Add Expense
                </Button>
                <Button
                    onClick={deleteBudget}
                    variant="contained">Delete Budget
                </Button>

            </Card>




        </div >
    )
}
export { BudgetItem };