import { useSession } from 'next-auth/client';
import React, { useState, useEffect } from 'react';

export default function Todo() {
	const [session, loading] = useSession();
	const [todos, setTodos] = useState([
		{
			id: 1,
			title: 'Learn Next.js',
			completed: false,
			date: '2020-01-01',
		},
	]);
	const [hasTodoForm, setTodoForm] = useState(false);

	function checkListItem(value) {
		todos[value].completed = !todos[value].completed;
		setTodos([...todos]);
	}

	function showTodoForm() {
		if (hasTodoForm)
			return <TodoForm callback={(value) => eventTodoCallback(value)} />;
		else return '';
	}

	function eventTodoCallback(value) {
		setTodos([...todos, value]);
		setTodoForm(false);
	}

	return (
		<>
			<ul className='list-group'>
				{todos.map((todo, index) => (
					<li
						className='list-group-item orm-check-input'
						key={todo.id}
						onClick={() => {
							checkListItem(index);
							console.log(this);
						}}>
						{todo.completed ? <strike>{todo.title}</strike> : todo.title}
						<small>{todo.date}</small>
					</li>
				))}
			</ul>

			{showTodoForm()}
		</>
	);
}
