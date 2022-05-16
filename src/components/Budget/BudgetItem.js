import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

function BudgetItem({ name, expenses, maxBudget }) {
    function renderExpense(expense) {
        return (
            <div>
                <h5>{expense}</h5>
            </div>
        )
    }
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total += parseInt(expenses[i]);
    }

    return (
        <div className='budget-card'>
            <Card variant="outlined">
                <h1 >{name}</h1>
                <h5> total:{total} of {maxBudget}</h5>
                <h5>List of Expense Amounts:</h5>
                <h5>{expenses.map(renderExpense)}</h5>
            </Card>




        </div >
    )
}
export { BudgetItem };