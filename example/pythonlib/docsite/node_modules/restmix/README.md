# Restmix

[![pub package](https://img.shields.io/npm/v/restmix)](https://www.npmjs.com/package/restmix)

A lightweight Typescript friendly requests manager for rest apis

:books: [Documentation](https://synw.github.io/restmix)

```ts
import { useApi, ApiResponse } from 'restmix';

const api = useApi();

interface TodoItemContract {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const res: ApiResponse<TodoItemContract> = await api.get<TodoItemContract>(
  "https://jsonplaceholder.typicode.com/todos/1",
);
if (res.ok) {
  // status code is in the 200/299 range
  const data: TodoItemContract = res.data;
} else {
  // status code is > 299
  const responseStatus: number = res.status;
  throw new Error(res.statusText)
}
```

It is the same as [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) except that it takes care of the response
body parsing and delivers typed data

```ts
interface ApiResponse<T = Record<string, any> | Array<any>> {
  ok: boolean;
  url: string;
  headers: Record<string, string>;
  status: number;
  statusText: string;
  data: T;
  text: string;
}
```