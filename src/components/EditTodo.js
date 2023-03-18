import React, {Fragment, useState} from "react";

//компонент редактирования названия отдельного нового задания
const EditTodo = ({todo}) => {
    //состояние редактируемого названия нового задания 
    const [description, setDescription] = useState(todo.description);

    //функция редактирования названия нового задания
    const updateDescription = async(e) => {
        e.preventDefault();
        try 
        {
            //we finding the eddited new task name
            const body = {description};
            //определяем идентификатор id отредактированного названия нового задания
            const id = todo._id;
            //осуществляем PUT запрос на сервер по отредактированию в нем названия нового задания с идентификатором id 
            await fetch(`https://pern-todo-server.herokuapp.com/todos/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            window.location = "/";
        } 
        catch (err) 
        {
            //указанный запрос не прошел
            console.error(err.message)            
        }
    }

    return (
        <Fragment>
            {/*Кнопка открытия модального окна редактирования нового задания*/}
            <button 
                type="button" 
                className="btn btn-warning" 
                data-toggle="modal" 
                data-target={`#id${todo._id}`}
            >
                Edit
            </button>

            {/*Само модальное окно*/}
            <div 
                className="modal" 
                id={`id${todo._id}`}
                onClick={() => setDescription(todo.description)}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            {/*Кнопка-крестик закрытия модального окна, при этом соответствующее название нового задания не изменяется*/}
                            <button 
                                type="button" 
                                className="close" 
                                data-dismiss="modal" 
                                onClick={() => setDescription(todo.description)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            {/*Поле определения отредактированного названия нового задания*/}
                            <input 
                                type="text" 
                                className="form-control" 
                                value={description} 
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="modal-footer">
                            {/*Кнопка фиксации отредактированного названия нового задания*/}
                            <button 
                                type="button" 
                                className="btn btn-warning" 
                                data-dismiss="modal"
                                onClick={e => updateDescription(e)}
                            >
                                Edit
                            </button>
                            {/*Кнопка закрытия модального окна, при этом соответствующее название нового задания не изменяется*/}
                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                data-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;