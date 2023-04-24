import { v4 as uuidv4 } from "uuid";

// const uuid = uuidv4();
// console.log(uuid); // outputs a random UUID

export const waait = () =>
	new Promise((res) => setTimeout(res, Math.random() * 800));

const generateRandomColor = () => {
	const existingBudgetLength = fetchData("budgets")?.length ?? 0;
	return `${existingBudgetLength * 34} 65% 50%`;
};

export const fetchData = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

// delete item
export const deleteItem = ({ key, id }) => {
	const existingData = fetchData(key);
	if (id) {
		const newData = existingData.filter((item) => item.id !== id);
		return localStorage.setItem(key, JSON.stringify(newData));
	}
	return localStorage.removeItem(key);
};

// Create budget
export const createBudget = ({ name, amount }) => {
	const newItem = {
		id: uuidv4(),
		name: name,
		createdAt: Date.now(),
		amount: +amount,
		color: generateRandomColor(),
	};
	const existingBudget = fetchData("budgets") ?? [];
	return localStorage.setItem(
		"budgets",
		JSON.stringify([...existingBudget, newItem])
	);
};

// Create expense
export const createExpense = ({ name, amount, budgetId }) => {
	const newItem = {
		id: uuidv4(),
		name: name,
		createdAt: Date.now(),
		amount: +amount,
		budgetId: budgetId,
	};
	const existingExpenses = fetchData("expenses") ?? [];
	return localStorage.setItem(
		"expenses",
		JSON.stringify([...existingExpenses, newItem])
	);
};

export const calculateSpentByBudget = (budgetId) => {
	const expenses = fetchData("expenses") ?? [];
	const budgetSpent = expenses.reduce((acc, expense) => {
		// check if expenseid === budgetId
		if (expense.budgetId !== budgetId) return acc;

		// add the current amount to my total
		return (acc += expense.amount);
	}, 0);
	return budgetSpent;
};

// get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
	const data = fetchData(category) ?? [];
	return data.filter((item) => item[key] === value);
};

export const formatCurrency = (amt) => {
	return amt.toLocaleString(undefined, {
		style: "currency",
		currency: "USD",
	});
};

export const formatPercentage = (amt) => {
	return amt.toLocaleString(undefined, {
		style: "percent",
		minimumFractionDigits: 0,
	});
};

export const formatDateToLocaleString = (epoch) =>
	new Date(epoch).toLocaleDateString();
