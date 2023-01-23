import React from "react";
import { TodoItem, TodoDetail } from "./components";

function Home() {
  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <div className="h-160 w-192 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-16 bg-slate-50 flex items-center border-b-1">
          <div className="text-blue-500 font-semibold text-xl px-4 ">
            TODO LIST
          </div>
        </div>
        <div className="flex h-144">
          <div className="w-1/2 bg-slate-10 h-full overflow-auto border-r-1">
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
          </div>
          <div className="w-1/2 bg-slate-10 h-full overflow-auto">
            <TodoDetail />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
