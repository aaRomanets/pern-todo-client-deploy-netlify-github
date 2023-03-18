import React, {Fragment, useState} from "react";

//компонент составления названия нового задания
const InputTodo = () => {
    //состояние названия нового задания
    const [description, setDescription] = useState("");

    //функция отправления составленного названия нового задания на сервер в соответствующую базу данных
    const onSubmitForm = async e => 
    {
        e.preventDefault();
        try 
        {
            //составленное название нового задания
            const body = {description};
            //POST запрос на отправление составленного названия нового задания на сервер в соответсвующую базу данных
            await fetch("https://pern-todo-server.herokuapp.com/todos", 
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location="/";  
            //поле задания названия нового задания очищаем     
            document.getElementById("textInput").value = "";
        } 
        catch (err) 
        {
            //указанный POST запрос не прошел
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="d-flex" onSubmit={onSubmitForm}>
                {/*Поле задания названия нового задания*/}
                <input
                    id="textInput" 
                    type="text" 
                    className="form-control" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                {/*Кнопка добавления названия нового задания на сервер в соответствующую базу данных*/}
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo;