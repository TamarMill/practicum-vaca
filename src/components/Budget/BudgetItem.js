
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Appcontext } from '../../App'
import { useContext, useState } from 'react'
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
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
            <h5>Click anywhere on the card for more budget details</h5>



            <Accordion style={{ backgroundColor: '#f5d5b1', margin: '25px' }} variant="outlined">
                <AccordionSummary

                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography> <h1 >{name} </h1>

                        <TextField
                            style={{ marginBotton: '50%' }}
                            placeholder='Expense Amount'
                            onChange={e => setExpense(e.target.value)}
                            value={expense} id="outlined-basic"
                            variant="outlined"

                        />
                        <div>
                            <Button

                                style={{ backgroundColor: '#f5d5b1', margin: '25px', color: 'black' }}
                                onClick={addExpense}
                                variant="contained" >Add Expense
                            </Button>

                        </div>

                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>

                        <h5 style={{ marginLeft: '75%' }}>List of Expense Amounts:</h5>
                        <h5 style={{ marginLeft: '75%' }}>{expenses.map(renderExpense)}</h5>
                        <h3 style={{ marginLeft: '75%' }}> total:{total} of {maxBudget}</h3>
                        <Button
                            style={{ marginLeft: '75%', backgroundColor: '#f5d5b1', color: 'black' }}
                            onClick={deleteBudget}
                            variant="contained">Delete Budget Category
                        </Button>
                    </Typography>
                </AccordionDetails>
            </Accordion>


        </div >
    )
}
export { BudgetItem };