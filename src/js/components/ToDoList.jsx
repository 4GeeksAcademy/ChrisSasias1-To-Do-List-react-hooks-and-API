import React, { useEffect, useState } from "react";

export const ToDoList = () => {

    const [list, setList] = useState([]);
    const [text, setText] = useState("");
    const API_URL = "https://playground.4geeks.com/todo";


    const createUser = () => {
        fetch(`${API_URL}/users/ChrisSasias`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(data => console.log("Usuario creado:", data))
            .catch(err => console.log(err));
    };

    const consumeList = () => {
        fetch(`${API_URL}/users/ChrisSasias`)
            .then(res => {
                if (res.status === 404) {
                    createUser();
                }
                return res.json();
            })
            .then(data => setList(data.todos || []))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        consumeList();
    }, []);


    const createTask = () => {
        if (text.trim() === "") return;

        fetch(`${API_URL}/todos/ChrisSasias`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                label: text,
                is_done: false
            })
        })
            .then(res => res.json())
            .then(() => {
                setText("");
                consumeList();
            })
            .catch(err => console.log(err));
    };

    // Borrar una tarea por ID
    const deleteTask = (id) => {
        fetch(`${API_URL}/todos/${id}`, {
            method: "DELETE"
        })
            .then(() => consumeList())
            .catch(err => console.log(err));
    };



    const deleteAll = async () => {

        const res = await fetch(`${API_URL}/users/ChrisSasias`);
        const data = await res.json();

        if (!data.todos || data.todos.length === 0) return;


        await Promise.all(
            data.todos.map(task =>
                fetch(`${API_URL}/todos/${task.id}`, {
                    method: "DELETE"
                })
            )
        );

        consumeList();
    };

    const listen = (event) => setText(event.target.value);

    const addTask = (key) => {
        if (key === "Enter") {
            createTask();
        }
    };

    return (
        <div className="container">
            <div className="mb-3">
                <label
                    htmlFor="usertodo"
                    className="form-label d-flex align-items-center justify-content-center title"
                >
                    ToDo List
                </label>

                <input
                    type="text"
                    id="usertodo"
                    className="form-control todo-input"
                    placeholder="What needs to be done?"
                    onChange={listen}
                    onKeyUp={(event) => addTask(event.key)}
                    value={text}
                />
            </div>


            <div className="mb-3">
                {list.map((task) => (
                    <div
                        className="todo-item d-flex justify-content-between align-items-center"
                        key={task.id}
                    >
                        <span>{task.label}</span>
                        <button
                            className="delete-btn btn btn-sm text-danger"
                            onClick={() => deleteTask(task.id)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            {list.length > 0 && (
                <div className="d-flex justify-content-between mt-3">
                    <span>
                        {list.length} {list.length === 1 ? "item" : "items"} left
                    </span>


                    <button
                        className="btn btn-danger btn-sm"
                        onClick={deleteAll}
                    >
                        Delete All Task
                    </button>
                </div>
            )}
        </div>
    );
};
