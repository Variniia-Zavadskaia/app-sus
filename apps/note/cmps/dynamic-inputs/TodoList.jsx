import { TodoItem } from "./TodoItem.jsx"

export function TodoList({ todos, setTodos }) {
    console.log(todos.length);
    console.log(todos);

    function toggleTodo(ev, index) {
        console.log('kkk');


        if (todos[index].doneAt === null) {
            todos[index].doneAt = Date.now();
            ev.target.checked = true
        }
        else {
            todos[index].doneAt = null
            ev.target.checked = false
        }
        setTodos(todos);
        console.log(todos);
    }

    return (
        // <div className="todo-list">
            <div className="todo-ul">
                {todos && todos.length > 0 ? (
                    todos.map((todo, index) => (
                        <div key={index} className={todo.doneAt ? 'completed' : ''} >
                            <input
                                type="checkbox"
                                checked={todo.doneAt !== null}
                                onChange={(ev) => toggleTodo(ev, index)}
                            />
                            <span>{todo.txt}</span>
                            <button className="btn-todo" onClick={() => deleteTodo(index)}>x</button>
                        </div>
                    ))
                ) : (<p>Seems lonely in here, what are you up to?</p>)}
            </div>
        // </div>
    )

}



//   {todos && todos.length > 0 ? (
//     // todos.map((todo, index) => (<TodoItem key={index} todo={todo} setTodos={setTodos} />))
//     todos.map((todo, index) => (<TodoItem todo={todo} />))
// ) : (
//     <p>Seems lonely in here, what are you up to?</p>
// )}

