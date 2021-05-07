import React, { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";

export function ToDoList() {
	const [userInput, setUserInput] = useState(" ");
	const [task, setTask] = useState([]);
	const [count, setCount] = useState(1);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ancoba", {
			method: "GET",
			headers: {
				"Content-Type": "aplication/json"
			}
		})
			.then(respond => {
				return respond.json();
			})
			.then(data => {
				setTask(task.concat(data));
			})
			.catch(error => console.log("error", error));
	}, []);

	function changesInList() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ancoba", {
			method: "PUT",
			body: JSON.stringify(task),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok);
				console.log(resp.status);
				console.log(resp.text());
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}

	const handleInfo = () => {
		if (userInput != null) {
			let newArray = [...task, userInput];
			setTask(newArray);
			setUserInput(" ");
			setCount(count + 1);
			changesInList();
		}
	};

	const deleteTask = id => {
		task.splice(id, 1);
		setTask([...task]);
		setCount(count - 1);
		changesInList();
	};

	return (
		<Container className="justify-content-center">
			<Container className="text-center mt-5">
				<Card style={{ width: "25rem" }}>
					<Card.Title>
						<span className="h1">Todo List</span>
					</Card.Title>

					<input
						className="mb-2"
						placeholder="what needs to be done?"
						type="text"
						requiered
						value={userInput}
						onChange={e => setUserInput(e.target.value)}
						onKeyPress={e =>
							e.key === "Enter" ? handleInfo() : ""
						}
					/>
					{task.map((final, id) => (
						<span className="card-subtitle mb-4" key={id}>
							{final}
							<Button
								variant="light"
								onClick={() => deleteTask(id)}>
								X
							</Button>
						</span>
					))}

					<Card.Footer>
						<p className="text-muted">{count} tasks left</p>
					</Card.Footer>
				</Card>
			</Container>
		</Container>
	);
}
