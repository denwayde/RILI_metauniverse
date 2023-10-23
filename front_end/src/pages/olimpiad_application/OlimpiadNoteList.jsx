import React, {useState} from 'react';
import {Trash, Edit2} from 'react-feather';



function OlimpiadNoteList(props) {
    
    let [toEdit, setToEdit] = useState(false)
    let [editableClass, setEditableClass] = useState('')
    function editItem(e){
        console.log(e.currentTarget.id)
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

                                    <span className={editableClass}> {
                                    editableClass ? 
                                    <div class="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                                    </div> : 
                                    props.noteList[i]} </span>
                                    <span className="spanGroup">
                                        <span className="btn btn-outline-success m-1" id={i} onClick={(e)=> editItem(e)}>
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
