const { useState, useEffect, useRef } = React
const { useParams } = ReactRouterDOM

// import { TodoItem } from "./TodoItem.jsx";
import { TodoList } from "./TodoList.jsx";
import { noteService } from "../../services/note.service.js"

export function NoteTodos(props) {
    console.log('GFTGHHG');

    return (
        <section>
            <h2>{props.info.title}</h2>
            <TodoList todos={props.info.todos} />
        </section>
    )
}

export function EditNoteTodos(props) {
  
    function onChangeTodo(index, field, value) {
        // console.log('ffsdfdffd'); 
        props.info.todos[index][field] = value
        props.onChangeInfo('todos', props.info.todos)
    }

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     // reset the form
    //     event.target.reset();
    // };

    return (
        <div className="todo-list">
            <TodoList todos={props.info.todos} onChangeTodo={onChangeTodo} />
        </div>
    );
}
