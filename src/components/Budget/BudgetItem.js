
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Appcontext } from '../../App'
import { useContext, useState } from 'react'
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
function BudgetItem({ name, expenses, maxBudget, expenseDescriptions }) {
    const [expense, setExpense] = useState('')
    const [expenseDescription, setExpenseDescription] = useState('')
    const { dispatch } = useContext(Appcontext)
    function renderExpense(expense, index) {
        return (
            <div key={index}>
                <h5>{expense}</h5>
            </div>
        )
    }
    function renderExpenseDescription(expenseDescription, index) {
        return (
            <div key={index}>
                <h5>{expenseDescription}</h5>
            </div>
        )
    }
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total += parseInt(expenses[i]);
    }
    function addExpense() {
        if (expense !== "" && expense.match(/[0-9]/i) && expenseDescription !== "") {
            dispatch({ type: 'ADD_EXPENSE', payload: { chosenCategory: name, expense } })
            setExpense('')


            dispatch({ type: 'ADD_EXPENSE_DESCRIPTION', payload: { chosenCategory: name, expenseDescription } })
            setExpenseDescription('')

        }
    }

    function deleteBudget() {
        dispatch({ type: 'DELETE_EXPENSE', payload: name })
    }

    return (

        <div className='budget-card'>
            <h5>Click anywhere on the card to add expenses and view details</h5>



            <Accordion style={{ backgroundColor: '#f5d5b1', margin: '25px' }} variant="outlined">
                <AccordionSummary

                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography> <h1 >{name} </h1>



                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div style={{ paddingLeft: '200px' }}>
                            <TextField
                                style={{ marginBotton: '50%', marginRight: '5%' }}
                                placeholder='Expense Description'
                                onChange={e => setExpenseDescription(e.target.value)}
                                value={expenseDescription} id="outlined-basic"
                                variant="outlined"

                            />
                            <TextField
                                style={{ marginBotton: '50%' }}
                                placeholder='Expense Amount'
                                onChange={e => setExpense(e.target.value)}
                                value={expense} id="outlined-basic"
                                variant="outlined"

                            />


                            <div>
                                <Button

                                    style={{ backgroundColor: '#f5d5b1', marginLeft: '17%', marginTop: '5%', color: 'black' }}
                                    onClick={addExpense}
                                    variant="contained" >Add Expense
                                </Button>

                            </div>
                        </div>

                        <div style={{ paddingBottom: '2px', display: 'inline-block' }}>

                            <div>
                                <h2 >Expense Details:</h2>
                                <div style={{ display: 'inline-block' }}>
                                    <h5 >Expense Amounts:</h5>

                                    <h5 >{expenses.map(renderExpense)}</h5>
                                </div>
                                <div style={{ display: 'inline-block', marginLeft: '50px' }}>
                                    <h5 >Expense Descriptions:</h5>
                                    <h5 >{expenseDescriptions.map(renderExpenseDescription)}</h5>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'inline-block', marginLeft: '284px' }} >
                            <h3 style={{ marginBottom: '5%' }}> Total: {total} of {maxBudget}</h3>


                            <Button
                                style={{ backgroundColor: '#f5d5b1', color: 'black' }}
                                onClick={deleteBudget}
                                variant="contained">Delete Budget Category
                            </Button>

                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>


        </div >
    )
}
export { BudgetItem };