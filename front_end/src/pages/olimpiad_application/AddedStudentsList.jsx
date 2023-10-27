import React, { useEffect, useState } from "react";

function AddedStudentsList(props){
    let [listToApplication, setListToApplication] = useState([])
    useEffect(()=>{
        setListToApplication(props.addedStudentListValue)
    }, [props.addedStudentListValue])
    return (
        <>
        <div className="row">
            <div className="container">
                <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                    {(()=>{
                        let generatedList = []
                        for(let i = 0; i<listToApplication.length; i++){
                            generatedList.push(
                                <button key={i} id={i} type="button" className="btn btn-outline-danger">{JSON.stringify(listToApplication[i])}</button>
                            )
                        }
                        return generatedList
                    })()}
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default AddedStudentsList