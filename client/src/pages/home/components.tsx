import React from "react";
import type { TodoItemType } from "./types";

export function TodoItem(props: {
  todo: TodoItemType;
  currentTodo: TodoItemType;
  setCurrentTodo: React.Dispatch<React.SetStateAction<TodoItemType>>;
}) {
  return (
    <div
      className={`border-b border-slate-100 p-4 cursor-pointer ${
        props.todo.id === props.currentTodo.id ? "bg-slate-100" : ""
      } hover:bg-slate-100`}
      onClick={() => props.setCurrentTodo(props.todo)}
    >
      <h3 className="font-semibold text-md">{props.todo.title}</h3>
      <p className="text-xs text-gray-400">{props.todo.content}</p>
    </div>
  );
}

export function TodoDetail(props: { todo: TodoItemType }) {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">{props.todo.title}</h3>
      <p className="text-sm">{props.todo.content}</p>
    </div>
  );
}

export function LogoutBtn() {
  const handleLogout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    location.reload();
  };

  return (
    <button onClick={handleLogout} className="px-4 text-sm hover:text-blue-500">
      로그아웃
    </button>
  );
}
