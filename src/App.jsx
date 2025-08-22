import { useState, useEffect } from "react";
import {
  scanTodos,
  createTodo,
  deleteTodoById,
  updateTodo,
} from "./utils/dynamo";
import { FaRegTrashCan } from "react-icons/fa6";
import { PiPencil } from "react-icons/pi";

function App() {
  const [todos, setTodos] = useState([]); // the array where scanCommand will save the information
  const [text, setText] = useState(""); // string that is representing the text that you want to save in the table

  // Part of the icon functions
  const [todoToEdit, setTodoToEdit] = useState({});

  // The useEffect hook is called every time the component is showed to the user
  // onload event on html
  useEffect(() => {
    async function getTodos() {
      const scanned = await scanTodos();
      setTodos(scanned);
    }

    getTodos();
  }, []);

  const changeHandlerText = (event) => {
    const data = event.target.value;
    setText(data);
  };

  const handleCreateTodo = async () => {
    const createdTodo = await createTodo(text);

    setTodos([...todos, createdTodo]);
    setText("");
  };

  // The following give functionality to edit and delete icons:
  const deleteTodo = async (id) => {
    await deleteTodoById(id);

    const filteredTodos = todos.filter((todo) => {
      return todo.id != id;
    });
    setTodos(filteredTodos);
  };

  const handleUpdateTodo = async () => {
    await updateTodo(todoToEdit);
    // const filteredTodos = todos.filter((todo) => {
    //   return todoToEdit.id != todo.id;
    // });

    // setTodos([...filteredTodos, todoToEdit]);

    setTodos((previousTodos) => {
      return previousTodos.map((todo) => {
        return todo.id === todoToEdit.id ? todoToEdit : todo;
      });
    });
    setTodoToEdit({});
  };

  return (
    <>
      <div style={{ padding: 20 }}>
        <h1 className="text-3xl font-bold text-white mb-10">Todo App</h1>
        <input
          value={text}
          onChange={changeHandlerText}
          style={{ marginRight: 8 }}
          placeholder="Enter task here"
          className="bg-gray-900 rounded-lg outline-none p-2 text-white placeholder:italic"
        />

        <button
          onClick={() => handleCreateTodo()}
          className="text-gray-800 font-semibold p-1 rounded-xl bg-amber-300 hover:bg-amber-200 hover:cursor-pointer"
        >
          Add Task
        </button>

        <ul className="text-white pl-5 pt-3" style={{ marginTop: 16 }}>
          {todos.map((todoElement) =>
            todoToEdit?.id === todoElement.id ? (
              <div key={todoElement.id}>
                <input
                  value={todoToEdit.TodoText}
                  className="bg-gray-900 rounded-lg p-1"
                  onChange={(event) =>
                    setTodoToEdit({
                      id: todoToEdit.id,
                      TodoText: event.target.value,
                      IsComplete: todoToEdit.IsComplete,
                    })
                  }
                  type="text"
                  name="edit-task"
                  id="edit-task"
                />
                <button
                  onClick={() => handleUpdateTodo()}
                  className="bg-amber-300 -gray-800 font-semibold ml-2 p-1 rounded-xl hover:bg-amber-200"
                  style={{ cursor: "pointer" }}
                >
                  Update
                </button>
              </div>
            ) : (
              <li className="ml-.5 flex items-center" key={todoElement.id}>
                {/* When I change the following from todoElement.Text to todoElement.TodoText it will not display the tasks in the UI VVV */}
                {todoElement.Text}{" "} 
                <div className="flex m-4">
                  <PiPencil
                    onClick={() => setTodoToEdit(todoElement)}
                    style={{ cursor: "pointer", color: "orange" }}
                  />
                  <FaRegTrashCan
                    onClick={() => deleteTodo(todoElement.id)}
                    style={{ cursor: "pointer", marginLeft: 7 }}
                  />
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
