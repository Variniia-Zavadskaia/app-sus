export function TodoItem( todo ) {

    function handleChange() {}

    return (
        <li id={todo && todo.id ? todo.id : ""} className="todo_item">
            <button className="todo_items_left">
                <svg>
                    <rect x="2" y="2" width="18" height="18" />
                </svg>
                {/* <p>{todo && todo.txt ? todo.txt : ""}</p> */}
                 <label className='bold-txt' htmlFor="todo"></label>
                    <input onChange={handleChange} value={todo.txt || ''}
                        id='todo' type="text" name='todo' />
            </button>
            <div className="todo_items_right">
                {/* <button>
                    <span className="visually-hidden">Edit</span>
                    <svg>
                        <path d="" />
                    </svg>
                </button> */}
                <button>
                    <span className="visually-hidden">Delete</span>
                    <svg>
                        <path d="" />
                    </svg>
                </button>
            </div>
        </li>
    );
}