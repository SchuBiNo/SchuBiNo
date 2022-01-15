import { useSession } from 'next-auth/client';
import React, { useState, useEffect } from 'react';

import TodoForm from '@/components/todoForm';

import AccessDenied from '@/components/accessDenied';

var runningTimeouts = [];

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

	function completeTodo(value) {
		todos[value].completed = !todos[value].completed;
		if (todos[value].completed) {
			let timeout = setTimeout(() => removeTodo(value), 2500);
			runningTimeouts.push({
				id: value,
				timeout: timeout,
			});
		} else {
			let item = runningTimeouts.find((item) => item.id === value);
			clearTimeout(item.timeout);
			runningTimeouts.pop(item);
			console.log('cleared timeout');
		}
		setTodos([...todos]);
	}

	function removeTodo(value) {
		todos.splice(value, 1);
		setTodos([...todos]);
	}

	function showTodoForm() {
		if (hasTodoForm)
			return <TodoForm callback={(value) => eventTodoCallback(value)} />;
		else return '';
	}

	function eventTodoCallback(value) {
		setTodoForm(false);
		if (value) setTodos([...todos, value]);
	}

	if (loading) {
		return <div className='loader container'></div>;
	}
	return (
		<>
			{session ? (
				<div className='container mt-4 '>
					<ul className='list-group'>
						{todos.map((todo, index) => (
							<li
								className={`list-group-item list-group-item-action flex-column align-items-start ${
									todo.completed ? 'list-group-item-success' : ''
								}`}
								key={todo.id}
								onClick={() => {
									completeTodo(index);
								}}>
								{todo.completed ? <strike>{todo.title}</strike> : todo.title}
								<a className='mx-5 text text-right'>{todo.date}</a>
							</li>
						))}
					</ul>
					<button
						className='btn btn-primary mt-4'
						onClick={() => setTodoForm(true)}>
						Add
					</button>
					{showTodoForm()}
				</div>
			) : (
				<AccessDenied />
			)}
		</>
	);
}
