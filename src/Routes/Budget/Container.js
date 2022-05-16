import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { BudgetItem } from '../../components/Budget/BudgetItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import produce from 'immer'
import './budgetPage.css'
function Container() {
    const [budgets, setBudgets] = useState([])
    const [budgetName, setBudgetName] = useState('')
    const [expense, setExpense] = useState('')
    const [chosenCategory, setChosenCategory] = useState('')
    const [maxBudget, setMaxBudget] = useState('');
    const addBudget = () => {
        setBudgets(budgets => {
            return [...budgets, {
                name: budgetName,
                maxBudget,
                expenses: []

            }]
        })
        setBudgetName('');
        setMaxBudget('');
    }

    function renderBudgetItem(budget) {
        return <BudgetItem name={budget.name} expenses={budget.expenses} maxBudget={budget.maxBudget} />
    }
    function renderMenuItem(budget) {
        return <MenuItem value={budget.name}>{budget.name}</MenuItem>
    }
    function addExpense() {

        const newBudgets = produce(budgets, draft => {
            const chosenBudget = draft.find(element => element.name === chosenCategory)
            chosenBudget.expenses.push(expense)
        })
        setBudgets(newBudgets);
        setExpense('');

    }
    console.log(budgets);
    return (
        <div className='container'>
            <div className='form-section'>
                <TextField
                    placeholder='Budget Name'
                    onChange={e => setBudgetName(e.target.value)}
                    value={budgetName}
                    id="outlined-basic"
                    variant="outlined"
                />
                <TextField
                    placeholder='Budget Amount'
                    onChange={e => setMaxBudget(e.target.value)}
                    value={maxBudget} id="outlined-basic"
                    variant="outlined"
                />
                <Button
                    onClick={addBudget}
                    variant="contained">Add Budget
                </Button>


                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose Budget Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={chosenCategory}
                        label="Age"
                        onChange={e => setChosenCategory(e.target.value)}
                    >

                        {budgets.map(renderMenuItem)}

                    </Select>
                </FormControl>
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

            </div>
            {budgets.map(renderBudgetItem)}
        </div>
    )
}
export { Container };