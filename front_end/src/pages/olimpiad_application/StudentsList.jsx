import React, { useEffect, useState } from 'react'
import {PlusSquare} from 'react-feather'

function StudentsList(props) {
    
    //let [addedStudentListValue, setAddedStdListValue] = useState([])//!!!teper tut lejat spisok teh kogo nujno dobavit v zayavku!!!etot object lejit v olimpiadapplication
    let [addedStudentIndex, setAddedStudentIndex] = useState(-1)
    let [students, setStudents] = useState([])
    
    useEffect(()=>{//TUT PEREDAEM SPISOK REBYAT CHTOBI NOVII SPISOK MOJNO BILO IZMENYAT
        setStudents(props.respondForSearch)
    }, [props.respondForSearch])//VIDIMO TUT BUDET OBRABATYVATSYA REZULTAT OTVETA OT BD

    function addStudentToList(e){
        let index = parseInt(e.currentTarget.id)
        setAddedStudentIndex(index)
        let newStd =  students.filter(el => el.id_student === index)
        props.setAddedStdListValue([...props.addedStudentListValue, newStd])
        let new_students =  students.filter(prev => prev.id_student !== index)
        setStudents(new_students)   
    }
    
    // function delStudentFromList(e){
    //     console.log("hello")
    // }

    return (
        <>
            {   
                props.linksNum === 5 &&  students.length !== 0  
                ? <ul className="list-group">
                        {(()=>{
                            const listItems = []
                            for(let i = 0; i< students.length; i++){
                                let student =  students[i]
                                listItems.push(
                                    <li key={student.id_student} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span className="studentName" style={{width: "30%"}}>{student.name} {student.surname} {student.patronymic}</span>
                                        <span className="studentEmail" style={{color: '#6c757d' }}>{student.graduation}</span>
                                        <span style={{width: "40%"}} className='d-flex justify-content-between align-items-center'>
                                            <span className="studentEmail" style={{color: '#6c757d' }}>{student.email}</span>
                                            <span className="studentPhone" style={{color: '#6c757d' }}>{student.phone}</span>
                                        </span>
                                        <span className='d-flex justify-content-between align-items-center'>
                                                <span className='btn btn-outline-success' id={student.id_student} onClick={addStudentToList}>
                                                    <PlusSquare/>
                                                </span>     
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
