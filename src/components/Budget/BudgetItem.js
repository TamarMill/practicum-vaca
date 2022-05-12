function BudgetItem({ name, expenses, maxBudget }) {
    function renderExpense(expense) {
        return (
            <div>
                <h1>{expense}</h1>

            </div>
        )
    }
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total += parseInt(expenses[i]);
    }
    return (
        <div>
            {name}
            <h1> total:{total} of {maxBudget}</h1>
            <h1>Expenses</h1>
            {expenses.map(renderExpense)}

        </div>
    )
}
export { BudgetItem };