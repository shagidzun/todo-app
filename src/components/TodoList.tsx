import {Todo} from "../types/todo.ts";
import {Divider, Stack} from "@mui/material";
import {TodoItem} from "./TodoItem.tsx";

interface TodoListProps {
    todoList: Todo[]
}

export const TodoList = ({todoList}: TodoListProps) => {
    return (
        <Stack>
            {todoList.map((todo) => (
              <>
                  <Divider/>
                  <TodoItem key={todo.id} description={todo.description} active={todo.active}/>
              </>

            ))}
        </Stack>
    );
};