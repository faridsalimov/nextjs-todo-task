import { useRouter } from "next/router";

export default function TodoDetail({ todo }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Todo</h1>
      <h2>{todo.title}</h2>
      <p>Status: {todo.completed ? "Yes" : "No"}</p>
      <p>ID: {todo.id}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();

  const paths = todos.slice(0, 10).map((todo) => ({
    params: { id: todo.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${params.id}`
  );
  const todo = await res.json();

  return {
    props: {
      todo,
    },
  };
}
