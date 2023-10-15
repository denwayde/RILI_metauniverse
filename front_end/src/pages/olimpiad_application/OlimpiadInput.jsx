import React, { useEffect, useRef, useState } from 'react'

function OlimpiadInput(props) {
    let placeholders = ["Введите цель и название мероприятия", "Введите адрес проведения мероприятия", "Выберите период проведения мероприятия", "Выберите транспорт", "Напишите дополнения необходимые для олипиады (перенос обеда, питание с собой и т.п.)", "Выберите учеников, участников мероприятия"]
    let transportList = ["ПАЗ-3205", "Hyundai Accent", "Свое авто"]
    let[selectValue, setSelelectValue] = useState('default')
    let[notesValue, setNotesValue] = useState('')
    let inputRef = useRef()
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
        let notesFromLocal = localStorage.getItem("notes")
        if(localStorage.getItem("transport")!==null){
            setSelelectValue(localStorage.getItem("transport"))
        }
        // if (notesFromLocal!==null){
        //     notesFromLocal = JSON.parse(notesFromLocal)
        //     setNotesValue(notesFromLocal[notesFromLocal.length-1])//ustanovili v notesValue poslednee znachenie 
        // }
    },[])

    return (
        <>
        {(()=>{
            if(props.InputlinksNum===3){
                return (
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
                )
            }
            else if(props.InputlinksNum===4){//TUT NOTES LIST
                return (
                    <input 
                        type="text"
                        //ref={inputRef}
                        className="form-control border border-primary"
                        placeholder={placeholders[props.InputlinksNum]}
                        name={props.inputLinks[props.InputlinksNum]}
                        value={notesValue}
                        //onBlur={onFocusOutValueOnInput}
                        onChange={(e)=>{setNotesValue(e.target.value)}}
                    />                   
                )
            }
            else if(props.InputlinksNum===5){//TUT SPISOK STUDENTOV
                return (
                    <input 
                        type="text"
                        className="form-control border border-primary"
                        placeholder={placeholders[props.InputlinksNum]}
                        name={props.inputLinks[props.InputlinksNum]}
                        value={props.inputMyValue}
                        onInput={props.findStudents}
                        onBlur={onFocusOutValueOnInput}
                        onChange={(e)=>{props.inputSetMyValue(e.target.value); localStorage.setItem(props.inputLinks[props.InputlinksNum], props.inputMyValue)}}
                    />                   
                )
            }
            else {
                return(
                    <input 
                        type="text"
                        className="form-control border border-primary"
                        placeholder={placeholders[props.InputlinksNum]}
                        name={props.inputLinks[props.InputlinksNum]}
                        value={props.inputMyValue}
                        onBlur={onFocusOutValueOnInput}
                        onChange={(e)=>{props.inputSetMyValue(e.target.value); localStorage.setItem(props.inputLinks[props.InputlinksNum], props.inputMyValue)}}
                    />                    
                )
            }
        })()}
        
        </>
    )
}

export default OlimpiadInput
