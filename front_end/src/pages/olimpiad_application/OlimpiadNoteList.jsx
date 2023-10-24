import React, {useState} from 'react';
import {Trash, Edit2, CheckSquare} from 'react-feather';



function OlimpiadNoteList(props) {
    let [editableIndex, setIdetableIndex] = useState(-1)
    let [editableValue, setIdetableValue] = useState('')

    function editItem(e){
        let index = parseInt(e.currentTarget.id)
        //console.log(index)
        setIdetableIndex(index)
        //console.log(editableIndex)
        setIdetableValue(props.noteList[index])
    }
    return (
        <>
            {
                props.noteList.length>0 && props.linksNum === 4 && typeof props.noteList !== 'string' ?
                <ul className="list-group">
                    {(()=>{
                        localStorage.setItem("notes", JSON.stringify(props.noteList))
                        let myNoteList = []
                        for(let i= 0; i < props.noteList.length; i++){
                            myNoteList.push(
                                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    {
                                            editableIndex === i ? 
                                            (<div className="input-group mb-3">
                                                <input type="text"
                                                    className="form-control"
                                                    value={editableValue}
                                                    onChange={(e)=>setIdetableValue(e.target.value)}
                                                />
                                                <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                                                    <CheckSquare/>
                                                </button>
                                            </div>) : (<span>{props.noteList[i]}</span>)
                                    } 
                                    <span className="spanGroup">
                                        <span className="btn btn-outline-success m-1" id={i} onClick={(e)=>editItem(e)}>
                                            <Edit2/>
                                        </span>
                                        <span className="btn btn-outline-danger m-1"  onClick={(e)=>props.delItem(e, props.noteList[i])}>
                                            <Trash/>
                                        </span>
                                    </span>
                                </li>
                            )
                        }
                        return myNoteList
                    })()}
                </ul>
                : null
            
            }    
        </>
    )
}

export default OlimpiadNoteList
