import React from 'react';
import {ArrowRightCircle, ArrowLeftCircle, FilePlus, PlusSquare} from 'react-feather';

function OlimpiadInputBtns(props) {
    return (
        <>
            {
                props.linksNum===4 && 
                <span className="input-group-text btn btn-outline-primary" id="inputGroup-sizing-default" onClick={props.addItem}>
                    <span className="textInBtn">Добавить</span> <PlusSquare/>
                </span>
            }

            {
                props.linksNum>0 && 
                <span className="input-group-text btn btn-outline-primary" id="inputGroup-sizing-default" onClick={(e)=>{props.saveArgsToLocalStorage(e, -1)}}>
                    <span className="textInBtn">Назад</span> <ArrowLeftCircle/>
                </span>
            }

            {
                props.linksNum===5 ? 
                <span className="input-group-text btn btn-outline-success" id="inputGroup-sizing-default">
                    <span className="textInBtn">Создать документ</span> <FilePlus/>
                </span> : 
                <span className="input-group-text btn btn-outline-primary" id="inputGroup-sizing-default" onClick={(e)=>{props.saveArgsToLocalStorage(e, 1)}}>
                    <span className="textInBtn">Вперед</span> <ArrowRightCircle/>
                </span>
            }
        </> 
    )
}

export default OlimpiadInputBtns
