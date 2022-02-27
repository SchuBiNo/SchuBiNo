import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import TodoForm from '@/components/todoForm';
import todoManager from '@/helper/todo/todoManager';

import Loader from '@/components/loader';
import AccessDenied from '@/components/accessDenied';

var runningTimeouts = [];

export default function Todo() {
	const { data: session, status } = useSession();
	const [todos, setTodos] = useState([]);
	const [hasTodoForm, setTodoForm] = useState(false);

	useEffect(() => {
		todoManager.getTodos(session?.user.name).then((todos) => {
			setTodos(todos);
		});
	}, [session]);

	function completeTodo(todo, index) {
		todos[index].completed = !todos[index].completed;
		if (todos[index].completed) {
			let timeout = setTimeout(() => removeTodo(todo), 2500);
			runningTimeouts.push({
				id: index,
				timeout: timeout,
			});
		} else {
			let item = runningTimeouts.find((item) => item.id === index);
			clearTimeout(item.timeout);
			runningTimeouts.pop(item);
		}
		setTodos([...todos]);
	}

	function removeTodo(todo) {
		todoManager.deleteTodo(session.user.name, todo.todoId).then((todos) => {
			setTodos([...todos]);
		});
	}

	function showTodoForm() {
		if (hasTodoForm)
			return <TodoForm callback={(value) => eventTodoCallback(value)} />;
		else return '';
	}

	function eventTodoCallback(value) {
		setTodoForm(false);
		if (value) {
			todoManager
				.addTodo(value.date, value.title, session?.user.name)
				.then((todos) => {
					setTodos([...todos]);
				});
		}
	}

	if (status === 'loading') {
		return <Loader />;
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
									completeTodo(todo, index);
								}}>
								{todo.completed ? <strike>{todo.title}</strike> : todo.title}
								<a
									className={`mx-5 text text-right  ${
										Date.parse(todo.date) < Date.now() ? 'text-danger' : ''
									}`}>
									{todo.date}
								</a>
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
