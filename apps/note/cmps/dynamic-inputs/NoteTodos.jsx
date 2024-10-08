const { useState, useEffect, useRef } = React
const { useParams } = ReactRouterDOM

// import { TodoItem } from "./TodoItem.jsx";
import { TodoList } from "./TodoList.jsx";
import { noteService } from "../../services/note.service.js"

export function NoteTodos(props) {
    console.log('GFTGHHG');
    function onChangeTodo(index, field, value) {
        // console.log('ffsdfdffd'); 
        props.info.todos[index][field] = value
        props.onChangeInfo('todos', props.info.todos)
    }

    return (
        <section>
            {/* <div className="todo-list"> */}
            <h3>{props.info.title}</h3>
            <TodoList todos={props.info.todos} onChangeTodo={onChangeTodo} edit={false} />
            {/* </div> */}
        </section>
    )
}

export function EditNoteTodos(props) {

    function onChangeTodo(index, field, value) {
        // console.log('ffsdfdffd'); 
        props.info.todos[index][field] = value
        props.onChangeInfo('todos', props.info.todos)
    }

    function onRemoveTodo(index) {
        props.info.todos.splice(index)
        props.onChangeInfo('todos', props.info.todos)
    }

    function onAddTodo() {
        let todo = noteService.getEmptyNoteTodo()
        props.info.todos.push(todo)
        props.onChangeInfo('todos', props.info.todos)
    }

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     // reset the form
    //     event.target.reset();
    // };

    return (
        <div className="todo-list">
            {/* <label className='bold-txt' htmlFor="title"></label>
            <input onChange={handleChange} value={props.info.title || ''} id='title' type="text" name='title' /> */}
            <TodoList todos={props.info.todos} onChangeTodo={onChangeTodo} edit={true} onRemoveTodo={onRemoveTodo} />
            <button className="btn" onClick={onAddTodo}>+</button>
            <span onClick={onAddTodo}>New Todo</span>
        </div>
    );
}
