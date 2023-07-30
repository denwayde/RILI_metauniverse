import React, { useEffect, useState } from 'react'
//import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'



function ErrorPage() {
    let [stsCode, setStsCode] = useState("404")
    let [errMessage,  setErrMessage] = useState("Страница не найдена")
    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        
        if(urlParams.get('statusCode')||urlParams.get('errorMessage')){
            setStsCode(urlParams.get('statusCode'))
            setErrMessage(urlParams.get('errorMessage'))
        }          
    },[])
   
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">{stsCode}</h1>
                <p className="fs-3"> <span className="text-danger">Упс! </span>{errMessage}</p>
                <p className="lead">
                    Этой страницы не существет.
                </p>
                <Link to="/" className="btn btn-primary">На страницу авторизации</Link>
            </div>
        </div>
    )
}

export default ErrorPage
