import React, { useEffect, useState } from 'react'

function OlimpiadInput(props) {
    let placeholders = ["Введите цель и название мероприятия", "Введите адрес проведения мероприятия", "Выберите период проведения мероприятия", "Выберите транспорт", "Напишите дополнения необходимые для олипиады (перенос обеда, питание с собой и т.п.)", "Выберите учеников, участников мероприятия"]
    let transportList = ["ПАЗ-3205", "Hyundai Accent", "Свое авто"]
    let[selectValue, setSelelectValue] = useState('default')
    function changeSelect(e){
        setSelelectValue(e.target.value)
        localStorage.setItem(props.inputLinks[props.InputlinksNum], e.target.value)
    }
    function onFocusOutValueOnInput(e){
        if(e.target.value === ''){
            localStorage.removeItem(props.inputLinks[props.InputlinksNum])
        }
        else{
            localStorage.setItem(props.inputLinks[props.InputlinksNum], e.target.value)
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("transport")!==null){
            setSelelectValue(localStorage.getItem("transport"))
        } 
    },[])
    return (
        <>
        {props.InputlinksNum===3 ? 
            <select className="form-select" value={selectValue} onChange={changeSelect}>
                <option value='default'>Выберите транспорт</option>
                {(()=>{
                    let myTransportlist = []
                    for(let i = 0; i<transportList.length; i++){
                        myTransportlist.push(
                            <option key={i} value={transportList[i]}>{transportList[i]}</option>
                        )
                    }
                    return myTransportlist
                })()}
            </select>
        :
            <input 
                type="text"
                className="form-control border border-primary"
                placeholder={placeholders[props.InputlinksNum]}
                name={props.inputLinks[props.InputlinksNum]}
                value={props.inputMyValue}
                onBlur={onFocusOutValueOnInput}
                onChange={(e)=>{props.inputSetMyValue(e.target.value); localStorage.setItem(props.inputLinks[props.InputlinksNum], props.inputMyValue)}}
            />
        }
        </>
    )
}

export default OlimpiadInput
