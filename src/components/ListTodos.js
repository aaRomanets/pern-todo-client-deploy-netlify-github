import React, {Fragment, useEffect, useState} from "react";

//вытаскиваем модальное окно редактирования названия нового задания
import EditTodo from "./EditTodo";

//компонент списка названий новых заданий, скаченных с сервера
const ListTodos = () => {
    //состояние списка названий новых заданий
    const [todos, setTodos] = useState([]);

    //функция запроса на удаление названия нового задания по идентификатору id из соответствующей базы данных на сервере
    const deleteTodo = async (id) => 
    {
        try 
        {
            //проводим запрос на удаление названия нового задания по идентификатору id из соответствующей базы данных на сервере 
            await fetch(`https://pern-todo-server.herokuapp.com/todos/${id}`, 
            {
                method: "DELETE"
            });
            //обновляем список названий новых заданий, удаляя из него указанное название нового задания 
            setTodos(todos.filter(todo => todo._id !== id));
        } 
        catch (err) 
        {
            //указанный запрос не прошел
            console.error(err.message);
        }
    }

    //функция запроса на скачивание полного списка названий новых заданий с сервера
    const getTodos = async () => 
    {
        try 
        {
            //проводим запрос на скачивание полного списка названий новых заданий с сервера
            const response = await fetch("https://pern-todo-server.herokuapp.com/todos");
            //фиксируем результат проведения указанного запроса
            const jsonData = await response.json();        
            setTodos(jsonData.allTodos);
        } 
        catch (err) 
        {
            //указанный запрос не прошел
            console.error(err.message);
        }
    }

    useEffect(() => 
    {
        //прежде всего с сервера запрашиваем весь список названий новых заданий, если он есть
        getTodos();
    }, []);

    return (
        <Fragment>
            {/*Таблица названий новых заданий*/}
            <table className="table mt-5 text-center">
                {/*Заголовок таблицы названий новых заданий*/}
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/*Сами названия новых заданий*/}
                    {todos && todos.map(todo => {
                        return (
                            <tr key={todo._id}>
                                {/*Само название отдельного нового задания*/}
                                <td>{todo.description}</td>
                                {/*Модальное окно редактирования названия нового задания*/}
                                <td>
                                    <EditTodo todo={todo} />
                                </td>
                                <td>
                                    {/*Кнопка удаления названия нового задания с сервера и из соответствующего списка todos*/}
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => deleteTodo(todo._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Fragment>
    )
};

export default ListTodos;