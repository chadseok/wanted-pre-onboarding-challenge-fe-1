import React from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import {
  useGetTodo,
  useGetTodoList,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "./hooks";
import type { TodoItemType } from "./types";
import ModalPortal from "../@common/ModalPortal";

export function HomeLayout(props: { children: React.ReactNode }) {
  return (
    <div className="h-160 w-192 bg-white rounded-lg shadow-md overflow-hidden">
      {props.children}
    </div>
  );
}

export function HomeNav() {
  return (
    <div className="h-16 bg-slate-50 flex justify-between items-center border-b">
      <div className="text-blue-500 font-semibold text-xl px-4 ">TODO LIST</div>
      <LogoutBtn />
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

export function HomeContent() {
  const { todolist } = useGetTodoList();

  return (
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
  );
}

export function TodoItem(props: { todo: TodoItemType }) {
  const navigate = useNavigate();

  return (
    <div
      className={`border-b border-slate-100 p-4 cursor-pointer hover:bg-slate-100`}
      onClick={() => navigate(`/todos/${props.todo.id}`)}
    >
      <h3 className="font-semibold text-md">{props.todo.title}</h3>
      <p className="text-xs text-gray-400">{props.todo.content}</p>
    </div>
  );
}

export function TodoDetail() {
  const { id } = useParams();
  const { todoDetail } = useGetTodo(id!);

  if (!todoDetail) return <div></div>;

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
  //TODO '+' 가운데 오도록 해보기
  return (
    <>
      <button
        className="bg-blue-500 text-white rounded-full text-4xl h-12 w-12 absolute right-2 bottom-2 active:bg-blue-200"
        onClick={openModal}
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
  const { title, setTitle, content, setContent, handleCreateTodo } =
    useCreateTodo();

  const closeModal = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      props.setIsOpen(false);
    }
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
            onSubmit={() => {
              handleCreateTodo();
              props.setIsOpen(false);
            }}
          >
            <h3 className="text-slate-500 text-sm">제목</h3>
            <input
              className="w-full h-8 border-b bg-transparent px-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h3 className="text-slate-500 text-sm">내용</h3>
            <textarea
              className="w-full h-72 border bg-transparent p-2 text-sm rounded-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="bg-blue-500 text-white h-8 rounded-md text-xs font-semibold">
              추가하기
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
      >
        수정
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
  const { title, setTitle, content, setContent, handleUpdateTodo } =
    useUpdateTodo(props.todo);

  const closeModal = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      props.setIsOpen(false);
    }
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
            onSubmit={() => {
              handleUpdateTodo();
              props.setIsOpen(false);
            }}
          >
            <h3 className="text-slate-500 text-sm">제목</h3>
            <input
              className="w-full h-8 border-b bg-transparent px-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h3 className="text-slate-500 text-sm">내용</h3>
            <textarea
              className="w-full h-72 border bg-transparent p-2 text-sm rounded-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="bg-blue-500 text-white h-8 rounded-md text-xs font-semibold">
              수정하기
            </button>
          </form>
        </div>
      )}
    </ModalPortal>
  );
}

export function DeleteTodoBtn() {
  const { id } = useParams();
  const { handleDeleteTodo } = useDeleteTodo(id!);
  return (
    <button
      className="text-sm hover:text-blue-500 text-slate-500"
      onClick={handleDeleteTodo}
    >
      삭제
    </button>
  );
}
