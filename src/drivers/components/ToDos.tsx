import { ChangeEvent, useState, MouseEvent } from "react";
import useToDos from "../hooks/useToDos";
import ToDo from "./ToDo";

interface Props {
  name: string;
}

export default function ToDos(props: Props) {
  const { loading, toDos, addToDo } = useToDos(props.name);
  const [newToDoText, setNewToDoText] = useState("");

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNewToDoText(event.target.value);
  }

  function handleAddButtonClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    addToDo(newToDoText);
  }

  if (loading) {
    return <span>loading...</span>;
  }

  return (
    <form>
      <label>
        <input type="text" value={newToDoText} onChange={handleInputChange} />
        <button onClick={handleAddButtonClick}>add</button>
      </label>
      <ul>
        {toDos?.map((toDo) => (
          <ToDo {...toDo} />
        ))}
      </ul>
    </form>
  );
}
