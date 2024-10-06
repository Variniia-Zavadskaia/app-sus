const { useState, useEffect } = React

import { TodoItem } from "./TodoItem.jsx";
import { TodoList } from "./TodoList.jsx";
import { noteService } from "../../services/note.service.js"

export function NoteTodos(props) {
    console.log('GFTGHHG');
    
    return (
        <section>
            <h2>{props.info.title}</h2>
            {/* <ul className="todo-list">
            {props.info.todos.map(todo =>
                <li key={todo.id}>
                    <TodoItem note={todo} />
                    <section>
                        <button onClick={() => onRemoveNote(note.id)}>Remove</button>
                        <button ><Link to={`/note/${note.id}`}>Details</Link></button>
                        <button ><Link to={`/note/edit/${note.id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
            </ul> */}
        </section>
    )
}

export function EditNoteTodos(props) {
    const [todos, setTodos] = useState(props.info.todos);

    // useEffect(() => {
    //     if (todos.length === 0) {
    //         setTodos([noteService.getEmptyNoteTodo()]);
    //     }
    // }, [])

    console.log(todos);
    

    function handleSubmit(event) {
        event.preventDefault();
        // reset the form
        event.target.reset();
      };

      return (
        <div className="wrapper">
            <div className="formtodo">

                {/* <label htmlFor="todo">
                    <input
                    type="text"
                    name="todo"
                    id="todo"
                    placeholder="Write your next task"
                    />
                </label> */}
                {/* <button>
                    <span className="visually-hidden">Submit</span>
                    <svg>
                    <path d="" />
                    </svg>
                </button> */}
            </div>
            <TodoList todos={todos} setTodos={setTodos} />
        </div>
      );
}
