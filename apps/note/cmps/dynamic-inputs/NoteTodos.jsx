import { TodoList } from "./TodoList.jsx";
import { noteService } from "../../services/note.service.js"

export function NoteTodos(props) {
    console.log('GFTGHHG');
    function onChangeTodo(index, field, value) {
        props.info.todos[index][field] = value
        props.onChangeInfo('todos', props.info.todos)
    }

    return (
        <section className="todo-list">
            <h2>{props.info.title}</h2>
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
        <section className="todo-list note-show">
            <input className="todo-title" onChange={handleTitleChange} value={props.info.title || ''} id='title' type="text" name='title' placeholder="Title" />
            <TodoList todos={props.info.todos} onChangeTodo={onChangeTodo} edit={true} onRemoveTodo={onRemoveTodo} />
            <button className="btn-todo" onClick={onAddTodo}> <i className="fa-solid fa-plus"></i></button>
            <span onClick={onAddTodo}>New Todo</span>
        </section>
    );
}

{/* <div className="tooltip">
    <button className="icon-button" onClick={onAddTodo} aria-label="Send">
        <i class="fa-solid fa-plus"></i>
    </button>
    <span className="tooltip-text">New Todo</span>
</div> */}