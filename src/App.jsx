import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, {
	expensesLoader,
	expenseAction,
} from "./pages/ExpensesPage";
import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudgets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		loader: mainLoader,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Dashboard />,
				loader: dashboardLoader,
				action: dashboardAction,
				errorElement: <Error />,
			},
			{
				path: "expenses",
				element: <ExpensesPage />,
				loader: expensesLoader,
				action: expenseAction,
				errorElement: <Error />,
			},
			{
				path: "budget/:id",
				element: <BudgetPage />,
				loader: budgetLoader,
				errorElement: <Error />,
				action: budgetAction,
				children: [
					{
						path: "delete",
						action: deleteBudget,
					},
				],
			},
			{
				path: "logout",
				action: logoutAction,
			},
		],
	},
]);

function App() {
	return (
		<div>
			<RouterProvider router={router} />
			<ToastContainer />
		</div>
	);
}

export default App;
