import React from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import {
  useGetTodoDetail,
  useGetTodoList,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "./hooks";
import type { TodoItemType } from "./types";
import ModalPortal from "@/common/components/ModalPortal";
import STORAGE from "@/common/constants/storage";

export function HomeLayout(props: { children: React.ReactNode }) {
  return (
    <div className="h-160 w-192 bg-white rounded-lg shadow-md overflow-hidden">
      {props.children}
    </div>
  );
}

export function HomeNav() {
  return (
    <nav className="h-16 bg-slate-50 flex justify-between items-center border-b">
      <h1 className="text-blue-500 font-semibold text-xl px-4 ">TODO LIST</h1>
      <div>
        <CreateTodoBtn />
        <LogoutBtn />
      </div>
    </nav>
  );
}

export function LogoutBtn() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem(STORAGE.authToken);
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 text-sm text-slate-500 hover:text-blue-500"
    >
      ๋ก๊ทธ์์
    </button>
  );
}

export function HomeContent() {
  const { data, isLoading } = useGetTodoList();

  if (!data || isLoading) return null;
  const todoList = data.data.data;

  return (
    <div className="flex h-144">
      <div className="w-1/2 bg-slate-10 h-full border-r overflow-auto">
        {todoList.map((todo: TodoItemType) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
      <div className="w-1/2 bg-slate-10 h-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export function TodoItem(props: { todo: TodoItemType }) {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div
      className={`border-b border-slate-100 p-4 cursor-pointer hover:bg-slate-100 ${
        id === props.todo.id ? "bg-slate-100" : ""
      }`}
      onClick={() => navigate(`/todos/${props.todo.id}`)}
    >
      <h3 className="font-semibold text-md">{props.todo.title}</h3>
      <p className="text-xs text-gray-400">{props.todo.content}</p>
    </div>
  );
}

export function TodoDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetTodoDetail(id!);

  if (!data || isLoading) return null;

  const todoDetail = data.data.data;

  return (
    <div className="p-4 relative h-full">
      <h3 className="text-xl font-semibold mb-4">{todoDetail.title}</h3>
      <p className="text-sm">{todoDetail.content}</p>
      <div className="absolute right-4 bottom-4 flex gap-4">
        <UpdateTodoBtn todoDetail={todoDetail} />
        <DeleteTodoBtn />
      </div>
    </div>
  );
}

export function CreateTodoBtn() {
  const [isOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        className="text-lg text-blue-500 border border-transparent px-2 bg-white rounded-md font-semibold shadow-md hover:border-blue-500"
        onClick={openModal}
        type="submit"
      >
        +
      </button>
      <CreateTodoModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export function CreateTodoModal(props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const { mutate } = useCreateTodo();

  const closeModal = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      props.setIsOpen(false);
    }
  };

  const handleCreateTodo = () => {
    mutate({ title, content });
    props.setIsOpen(false);
  };

  return (
    <ModalPortal>
      {props.isOpen && (
        <div
          className="flex justify-center items-center fixed w-full h-screen z-10 bg-black/10"
          onClick={closeModal}
        >
          <form
            className="w-96 bg-slate-50 rounded-md p-4 flex flex-col justify-center gap-2"
            onSubmit={handleCreateTodo}
          >
            <h3 className="text-slate-500 text-sm">์?๋ชฉ</h3>
            <input
              className="w-full h-8 border-b bg-transparent px-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h3 className="text-slate-500 text-sm">๋ด์ฉ</h3>
            <textarea
              className="w-full h-72 border bg-transparent p-2 text-sm rounded-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="bg-blue-500 text-white h-8 rounded-md text-xs font-semibold">
              ์ถ๊ฐํ๊ธฐ
            </button>
          </form>
        </div>
      )}
    </ModalPortal>
  );
}

export function UpdateTodoBtn(props: { todoDetail: TodoItemType }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        className="text-sm hover:text-blue-500 text-slate-500"
        onClick={openModal}
        type="submit"
      >
        ์์?
      </button>
      <UpdateTodoModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        todo={props.todoDetail}
      />
    </>
  );
}

export function UpdateTodoModal(props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo: TodoItemType;
}) {
  const [title, setTitle] = React.useState<string>(props.todo.title);
  const [content, setContent] = React.useState<string>(props.todo.content);
  const { mutate } = useUpdateTodo(props.todo.id);

  const closeModal = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      props.setIsOpen(false);
    }
  };

  const handleUpdateTodo = () => {
    mutate({
      title,
      content,
      id: props.todo.id,
    });
    props.setIsOpen(false);
  };

  return (
    <ModalPortal>
      {props.isOpen && (
        <div
          className="flex justify-center items-center fixed w-full h-screen z-10 bg-black/10"
          onClick={closeModal}
        >
          <form
            className="w-96 bg-slate-50 rounded-md p-4 flex flex-col justify-center gap-2"
            onSubmit={handleUpdateTodo}
          >
            <h3 className="text-slate-500 text-sm">์?๋ชฉ</h3>
            <input
              className="w-full h-8 border-b bg-transparent px-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h3 className="text-slate-500 text-sm">๋ด์ฉ</h3>
            <textarea
              className="w-full h-72 border bg-transparent p-2 text-sm rounded-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="bg-blue-500 text-white h-8 rounded-md text-xs font-semibold">
              ์์?ํ๊ธฐ
            </button>
          </form>
        </div>
      )}
    </ModalPortal>
  );
}

export function DeleteTodoBtn() {
  const { id } = useParams();
  const { mutate } = useDeleteTodo(id!);

  const handleDeleteTodo = () => {
    mutate();
  };

  return (
    <button
      className="text-sm hover:text-blue-500 text-slate-500"
      onClick={handleDeleteTodo}
    >
      ์ญ์?
    </button>
  );
}
