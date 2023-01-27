import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { TodoItemType } from "./types";

export function useGetTodoList() {
  const navigate = useNavigate();
  const [currentTodo, setCurrentTodo] = React.useState<TodoItemType>({
    title: "",
    content: "",
    id: "",
    createdAt: "",
    updatedAt: "",
  });
  const [todolist, setTodolist] = React.useState<TodoItemType[]>([]);

  React.useEffect(() => {
    api
      .get("/todos")
      .then((res) => {
        setTodolist(res.data.data as TodoItemType[]);
        return res.data.data;
      })
      .then((data) => {
        if (data[0]) {
          setCurrentTodo(data[0]);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
  }, []);

  return { currentTodo, setCurrentTodo, todolist, setTodolist };
}

export function useCreateTodo() {
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  const handleCreateTodo = () => {
    api.post("/todos", { title, content }).catch((err) => {
      console.error(err);
    });
  };

  return { title, setTitle, content, setContent, handleCreateTodo };
}
