import { TodoItem } from "./TodoItem.jsx"

export function TodoList({ todos, onChangeTodo, edit, onRemoveTodo }) {
    console.log(todos);
    // console.log(todos.length);


    function toggleTodo(ev, index) {
        console.log('kkk');
        let doneAt = todos[index].doneAt

        if (doneAt === null) {
            doneAt = new Date(Date.now());
            // ev.target.checked = true
        }
        else {
            doneAt = null
            // ev.target.checked = false
        }
        onChangeTodo(index, 'doneAt', doneAt);
        // console.log(todos);
    }

    function handleTodoChange(ev, index) {
        onChangeTodo(index, 'txt', ev.target.value);
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
                        {edit ? (
                            <div>
                                <label className='bold-txt' htmlFor="todo-text"></label>
                                <input onChange={(ev) => handleTodoChange(ev, index)} value={todo.txt || ''}
                                    id='todo-text' type="text" name='todo-text' />
                            </div>
                        ) : (<span>{todo.txt}</span>)}

                        <button className="btn btn-todo" onClick={() => onRemoveTodo(index)}><i className="fa-solid fa-xmark"></i></button>
                        {/* </div> */}

                    </div>
                ))
            ) : (<p></p>)}
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

