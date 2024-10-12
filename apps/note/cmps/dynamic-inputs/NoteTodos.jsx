import { TodoList } from "./TodoList.jsx";
import { noteService } from "../../services/note.service.js"

export function NoteTodos(props) {
    function onChangeTodo(index, field, value) {
        props.info.todos[index][field] = value
        props.onChangeInfo('todos', props.info.todos)
    }

    return (
        <section className="todo-list">
            <h3>{props.info.title}</h3>
            <TodoList todos={props.info.todos} onChangeTodo={onChangeTodo} edit={false} />
        </section>
    )
}

export function EditNoteTodos(props) {

    function onChangeTodo(index, field, value) {
        props.info.todos[index][field] = value
        props.onChangeInfo('todos', props.info.todos)
    }

    function onRemoveTodo(index) {
        props.info.todos.splice(index, 1)
        props.onChangeInfo('todos', props.info.todos)
    }

    function onAddTodo() {
        let todo = noteService.getEmptyNoteTodo()
        if (!props.info.todos) props.info.todos = [];
        props.info.todos.push(todo)
        props.onChangeInfo('todos', props.info.todos)
    }

    function handleTitleChange(event) {
        event.preventDefault();

        props.onChangeInfo('title', event.target.value);
    };

    return (
        <section className="todo-list">
            <input className="todo-title" onChange={handleTitleChange} value={props.info.title || ''} id='title' type="text" name='title' placeholder="Title" />
            <TodoList todos={props.info.todos} onChangeTodo={onChangeTodo} edit={true} onRemoveTodo={onRemoveTodo} />
            <button className="btn-todo" onClick={onAddTodo}> <i className="fa-solid fa-plus"></i><span>New Todo</span></button>
            
        </section>
    );
}

