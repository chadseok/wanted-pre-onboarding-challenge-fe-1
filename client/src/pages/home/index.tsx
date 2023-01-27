import React from "react";
import { Outlet } from "react-router-dom";
import { TodoItem, TodoDetail, LogoutBtn, CreateTodoBtn } from "./components";
import { useGetTodoList } from "./hooks";
import { TodoItemType } from "./types";

function Home() {
  const { todolist } = useGetTodoList();

  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <div className="h-160 w-192 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-16 bg-slate-50 flex justify-between items-center border-b">
          <div className="text-blue-500 font-semibold text-xl px-4 ">
            TODO LIST
          </div>
          <LogoutBtn />
        </div>
        <div className="flex h-144">
          <div className="w-1/2 bg-slate-10 h-full overflow-auto border-r relative">
            {todolist.map((todo: TodoItemType) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
            <CreateTodoBtn />
          </div>
          <div className="w-1/2 bg-slate-10 h-full overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
