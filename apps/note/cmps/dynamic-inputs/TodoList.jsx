import { TodoItem } from "./TodoItem.jsx"

export function TodoList( todos, setTodos ) {
    return <ol className="todo_list">
        {todos && todos.length > 0 ? (
            // todos.map((todo, index) => (<TodoItem key={index} todo={todo} setTodos={setTodos} />))
            todos.map((todo, index) => (<TodoItem todo={todo} />))
        ) : (
            <p>Seems lonely in here, what are you up to?</p>
        )}</ol>;

}

