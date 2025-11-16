import React, { useState } from "react";

export const ToDoList = () => {

    const [list, setList] = useState([]);
    const [text, setText] = useState("");

    const listen = (event) => {
        setText(event.target.value);
    };

    const addTask = (keyEnter) => {
        if (keyEnter === "Enter" && text.trim() !== "") {
            setList([...list, text.trim()]);
            setText("");
        }
    };

    const deleteTask = (index) => {
        setList(list.filter((_, i) => i !== index));
    };

    return (
        <div className="container">
            <div className="mb-3 ">
                <label htmlFor="usertodo" className="form-label d-flex align-items-center justify-content-center title">todos</label>
                <input
                    type="text" className="form-control todo-input" id="usertodo" placeholder="Wath needs to be done?"
                    onChange={listen}
                    onKeyUp={(event) => addTask(event.key)}
                    value={text}
                />
                <div id="task" className="form-text"></div>
            </div>

            <div className="mb-3">
                {list.map((elem, index) => {
                    return (
                        <div className="todo-item d-flex justify-content-between align-items-center" key={index}>
                            <span>{elem}</span>
                            <button
                                className="delete-btn btn btn-sm text-danger"
                                onClick={() => deleteTask(index)}
                            >
                                X
                            </button>
                        </div>
                    );
                })}
            </div>

            {list.length > 0 && (
                <div>
                    <span>
                        {list.length} {list.length === 1 ? "item" : "items"} left
                    </span>
                </div>
            )}
        </div>
    );
};