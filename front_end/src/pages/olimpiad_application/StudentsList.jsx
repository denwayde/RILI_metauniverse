import React from 'react';

function StudentsList(props) {
        
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
                                        <span className="studentName">{student.name} {student.surname} {student.patronymic}</span>
                                        <span className="studentEmail" style={{color: '#6c757d' }}>{student.email}</span>
                                        <span className="studentPhone" style={{color: '#6c757d' }}>{student.phone}</span>
                                        <span style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

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
