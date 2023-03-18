import React, {Fragment} from "react";
import './App.css';

//вытаскиваем компонент составления названия нового задания
import InputTodo from "./components/InputTodo";
//вытаскиваем компонент составления названия нового задания
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo/>
        <ListTodos/>
      </div>
    </Fragment>
  );
}

export default App;
