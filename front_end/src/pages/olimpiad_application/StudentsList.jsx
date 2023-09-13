import React from 'react';
import {UserPlus, PlusSquare} from 'react-feather'

function StudentsList(props) {
    // let 
    // function addStudentsToList(e){

    // }    
    return (
        <>
            {   
                props.linksNum === 5 && props.respondForSearch.length !== 0  
                ? <ul className="list-group">
                        {(()=>{
                            const listItems = []
                            for(let i = 0; i<props.respondForSearch.length; i++){
                                let student = props.respondForSearch[i]
                                listItems.push(
                                    <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span className="studentName" style={{width: "30%"}}>{student.name} {student.surname} {student.patronymic}</span>
                                        <span className="studentEmail" style={{color: '#6c757d' }}>{student.graduation}</span>
                                        <span style={{width: "40%"}} className='d-flex justify-content-between align-items-center'>
                                            <span className="studentEmail" style={{color: '#6c757d' }}>{student.email}</span>
                                            <span className="studentPhone" style={{color: '#6c757d' }}>{student.phone}</span>
                                        </span>
                                        <span className='d-flex justify-content-between align-items-center'>
                                            <span className='btn btn-outline-success' id={student.id_student}><PlusSquare/></span>
                                        </span>
                                    </li>
                                )
                            }
                            return listItems
                        })()}
                    </ul>
                    :
                    null              
            }
            {props.messageIfErr && (<div className="alert alert-danger" role="alert"> {props.messageIfErr} </div>)}
        </>
    )
}

export default StudentsList
