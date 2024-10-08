import { TodoList } from "./TodoList.jsx";
import { noteService } from "../../services/note.service.js"

export function NoteTodos(props) {
    console.log('GFTGHHG');
    function onChangeTodo(index, field, value) {
        props.info.todos[index][field] = value
        props.onChangeInfo('todos', props.info.todos)
    }

    return (
        <section>
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
        <div className="todo-list">
            <label className='bold-txt' htmlFor="title">Title: </label>
            <input onChange={handleTitleChange} value={props.info.title || ''} id='title' type="text" name='title' />
            <TodoList todos={props.info.todos} onChangeTodo={onChangeTodo} edit={true} onRemoveTodo={onRemoveTodo} />
            <button className="btn" onClick={onAddTodo}>+</button>
            <span onClick={onAddTodo}>New Todo</span>
        </div>
    );
}
