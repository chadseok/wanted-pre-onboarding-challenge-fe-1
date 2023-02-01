import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import fetchInstance from "@/common/utils/fetchInstance";
import QUERY_KEY from "@/common/constants/queryKey";

const getTodoListApi = () => fetchInstance.get("/todos");

export function useGetTodoList() {
  const navigate = useNavigate();

  return useQuery({
    queryKey: [QUERY_KEY.todoList],
    queryFn: getTodoListApi,
    retry: false,
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) navigate("/login");
    },
  });
}

const getTodoDetailApi = (todoId: string) =>
  fetchInstance.get(`/todos/${todoId}`);

export function useGetTodoDetail(todoId: string) {
  return useQuery({
    queryKey: [QUERY_KEY.todoDetail, todoId],
    queryFn: () => getTodoDetailApi(todoId),
    onError: (error: AxiosError) => {
      console.error(error);
    },
  });
}

const createTodoApi = (value: { title: string; content: string }) =>
  fetchInstance.post("/todos", value);

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList] });
    },
  });
}

const updateTodoApi = (value: { title: string; content: string; id: string }) =>
  fetchInstance.put(`/todos/${value.id}`, {
    title: value.title,
    content: value.content,
  });

export function useUpdateTodo(todoId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.todoDetail, todoId],
      });
    },
  });
}

const deleteTodoApi = (todoId: string) =>
  fetchInstance.delete(`/todos/${todoId}`);

export function useDeleteTodo(todoId: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => deleteTodoApi(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList] });
      navigate("/");
    },
  });
}
