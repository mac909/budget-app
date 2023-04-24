import React from "react";
import {
	calculateSpentByBudget,
	formatCurrency,
	formatPercentage,
} from "../helper";
import { Form, Link } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

const BudgetItem = ({ budget, showButton = true }) => {
	const { id, name, amount, color } = budget;
	const spent = calculateSpentByBudget(id);
	return (
		<div className="budget" style={{ "--accent": color }}>
			<div className="progress-text">
				<h3>{name}</h3>
				<p>{formatCurrency(amount)} Budgeted</p>
			</div>
			<progress max={amount} value={spent}>
				{formatPercentage(spent / amount)}
			</progress>
			<div className="progress-text">
				<small>{formatCurrency(spent)} spent</small>
				<small>{formatCurrency(amount - spent)} remaining</small>
			</div>
			{showButton ? (
				<div className="flex-sm">
					<Link to={`budget/${id}`} className="btn">
						<span>View details</span>
						<BanknotesIcon width={24} />
					</Link>
				</div>
			) : (
				<div className="flex-sm">
					<Form
						method="post"
						action="delete"
						onSubmit={(event) => {
							if (
								!confirm(
									"Are you sure you want to permanently delete this budget?"
								)
							) {
								event.preventDefault();
							}
						}}
					>
						<button type="submit" className="btn">
							<span>Delete Budget</span>
							<TrashIcon width={24} />
						</button>
					</Form>
				</div>
			)}
		</div>
	);
};

export default BudgetItem;
