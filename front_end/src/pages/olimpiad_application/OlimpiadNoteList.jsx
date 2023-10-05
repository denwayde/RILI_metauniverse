import React from 'react';
import {Trash} from 'react-feather';



function OlimpiadNoteList(props) {
    
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
                                    <span>{props.noteList[i]}</span>
                                    <span className="btn btn-outline-danger m-1"  onClick={(e)=>props.delItem(e, props.noteList[i])}>
                                        <Trash/>
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
