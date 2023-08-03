import React, { useEffect, useState } from 'react'

function Breadcrumb(props) {
    let [usrId, setUsrId] = useState()
    useEffect(()=>{
        setUsrId(localStorage.getItem('teacherId'))
    },[])
    return (
        <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href={`/teacher/${usrId}`}>Домашняя</a></li>
                         <li className="breadcrumb-item active" aria-current="page">{props.breadcrumbActive}</li>{/*Заявка на олимпиаду */}
                    </ol>
                </nav>
        </> 
    )
}

export default Breadcrumb
