import Head from "next/head";
import TodoList from "../components/TodoList";

const Todos = () => (
  <>
    <Head>
      <title>SAE - Todo List</title>
    </Head>
    <TodoList user="Renzo" />
  </>
);

export default Todos;
