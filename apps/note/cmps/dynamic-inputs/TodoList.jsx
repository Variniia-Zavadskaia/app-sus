
export function TodoList({ todos, onChangeTodo, edit, onRemoveTodo }) {

    function toggleTodo(ev, index) {
        let doneAt = todos[index].doneAt

        if (doneAt === null) {
            doneAt = new Date(Date.now());
        }
        else {
            doneAt = null
        }
        onChangeTodo(index, 'doneAt', doneAt);
    }

    function handleTodoChange(ev, index) {
        onChangeTodo(index, 'txt', ev.target.value);
    }

    return (
        <div className="todo-ul ">
            {todos && todos.length > 0 ? (
                todos.map((todo, index) => (
                    <div key={index} className={todo.doneAt ? 'completed' : ''} >
                        <input
                            type="checkbox"
                            checked={todo.doneAt !== null}
                            onChange={(ev) => toggleTodo(ev, index)}
                        />
                        {edit ? (
                            <div className="todo-show">
                                <input
                                    id='todo-text'
                                    name='todo-text'
                                    type="text"
                                    onChange={(ev) => handleTodoChange(ev, index)}
                                    value={todo.txt || ''}
                                />
                            </div>
                        ) : (<span>{todo.txt}</span>)}
                        <div className="tooltip">
                            <button className="icon-button btn-todo" onClick={() => onRemoveTodo(index)}><i className="fa-solid fa-xmark"></i></button>
                        </div>
                    </div>
                ))
            ) : (<p></p>)}
        </div>
    )

}


