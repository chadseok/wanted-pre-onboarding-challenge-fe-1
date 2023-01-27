import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../@common/api";
import { TodoItemType } from "./types";

export function useGetTodoList() {
  const navigate = useNavigate();
  const [todolist, setTodolist] = React.useState<TodoItemType[]>([]);

  React.useEffect(() => {
    api
      .get("/todos")
      .then((res) => {
        setTodolist(res.data.data as TodoItemType[]);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
  }, []);

  return { todolist, setTodolist };
}

export function useGetTodo(id: string) {
  const [todoDetail, setTodoDetail] = React.useState<TodoItemType>();

  React.useEffect(() => {
    api
      .get(`/todos/${id}`)
      .then((res) => setTodoDetail(res.data.data as TodoItemType))
      .catch((err) => console.error(err));
  });

  return { todoDetail, setTodoDetail };
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

export function useUpdateTodo(todo: TodoItemType) {
  const [title, setTitle] = React.useState<string>(todo.title);
  const [content, setContent] = React.useState<string>(todo.content);

  const handleUpdateTodo = () => {
    api.put(`/todos/${todo.id}`, { title, content }).catch((err) => {
      console.error(err);
    });
  };

  return { title, setTitle, content, setContent, handleUpdateTodo };
}

export function useDeleteTodo(id: string) {
  const navigate = useNavigate();
  const handleDeleteTodo = () => {
    api
      .delete(`/todos/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return { handleDeleteTodo };
}
