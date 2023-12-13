import React, { useEffect, useState } from 'react';
import HeaderNav from './components/Header';
//import axios from 'axios';
//import api from '../interceptor';
import { useNavigate } from 'react-router-dom'
import useInterceptors from '../hooks/UseInterceptor';

const Login = ()=>{

    let [inputPasField, passwordSetBehaviorOnInput] = useState({
        valueElements: "",
        typeField: "password",
        classElements: "form-control",
        errorClass: "",
        errorText: ""
    })

    function checkIfPasHasMinSymbols(e){
        if(e.target.value.length<4&&e.target.value!==""){
            passwordSetBehaviorOnInput(prev=>({
                ...prev,
                classElements: "form-control is-invalid",
                errorClass: "invalid-feedback",
                errorText: "Пароль не может быть меньше меньше 4 символов"
            }))
        }
        else {
            passwordSetBehaviorOnInput(prev=>({
                ...prev,
                classElements: "form-control",
                errorClass: "",
                errorText: ""
            }))
        }
    }

    function changeDataHandlerOnPassword(e){
        setShowError("")
        if(e.target.value!==''){
            passwordSetBehaviorOnInput(prev=>({
                ...prev, 
                valueElements: e.target.value
            }))//nujno budet nedopuskat vvod probelov i drugih znakov
            setShowPswBtnState({
                btnValue: "Показать",
                btnClass: "btn btn-outline-primary"
            })
        }
        else {
            passwordSetBehaviorOnInput(prev=>({
                ...prev, 
                valueElements:"",
            }))
            
            setShowPswBtnState({
                btnValue: "Показать",
                btnClass: "btn btn-outline-secondary disabled"
            })
        }
        
    }

    let [inputNumField, numberSetBehaviorOnInput] = useState({
        classElements: "form-control",
        valueElements: "",
        errorClass: "",
        errorText: ""
    })

    function checkIfNumHasMinSymbols(e){
        if(e.target.value.length < 12&&e.target.value!==""){
            numberSetBehaviorOnInput(prev=>({
                ...prev,
                valueElements: e.target.value.trim(),
                classElements: "form-control is-invalid",
                errorClass: "invalid-feedback",
                errorText: "Номер мобильного телефона не может иметь меньше 12 символов"
            }))
        }
    }

    function changeDataHandlerOnNumber(e){
        setShowError("")
        if(e.target.value.search(/^[\+\d\s]+$/) === -1 && e.target.value !== ""){
            numberSetBehaviorOnInput(prev=>({
                ...prev,
                valueElements: e.target.value.trim(),
                classElements: "form-control is-invalid",
                errorClass: "invalid-feedback",
                errorText: "Вы вводите недопустимое значение"
            }))
            
        }
        else if(e.target.value.length > 12){
            numberSetBehaviorOnInput(prev=>({
                ...prev,
                valueElements: e.target.value.trim(),
                classElements: "form-control is-invalid",
                errorClass: "invalid-feedback",
                errorText: "Номер мобильного телефона не может быть больше 12 символов"
            }))
        }
        else if(e.target.value === ""){
            numberSetBehaviorOnInput(prev=>({
                ...prev,
                valueElements: "",
                classElements: "form-control",
                errorClass: "",
                errorText: ""
            }))
        }
        else{
            numberSetBehaviorOnInput(prev=>({
                ...prev,
                valueElements: e.target.value,
                classElements: "form-control",
                errorClass: "",
                errorText: ""
            }))
        }
        
    }

    let [btnState, setBtnState] = useState("btn btn-primary disabled mb-3")

    useEffect(()=>{
        if(inputPasField.valueElements!=="" && inputNumField.valueElements!=="" && inputNumField.errorClass==="" && inputPasField.errorClass===""){
            setBtnState("btn btn-primary mb-3")
        }
        else{
            setBtnState("btn btn-primary disabled mb-3")
        }
    }, [inputPasField, inputNumField])

    let [showPswBtn, setShowPswBtnState] = useState({
        btnValue: "Показать",
        btnClass: "btn btn-outline-secondary disabled"
    })
    
    function showPsw(e){
        if (inputPasField.typeField === "password") {
            passwordSetBehaviorOnInput(prev=>({
                ...prev,
                typeField: "text"
            }))

            setShowPswBtnState(prev=>({
                ...prev,
                btnValue: "Скрыть",
                btnClass: "btn btn-outline-success"
            }))
        }
        else{
            passwordSetBehaviorOnInput(prev=>({
                ...prev,
                typeField: "password"
            }))

            setShowPswBtnState(prev=>({
                ...prev,
                btnValue: "Показать",
                btnClass: "btn btn-outline-success"
            }))
        }
        
    }
    const navigateTo = useNavigate()
    const axiosInterceptors = useInterceptors()

    let [showError, setShowError] = useState("")
    async function submitForm(e){

        e.preventDefault()
        let bodyForm = {
            phone: inputNumField.valueElements,
            password: inputPasField.valueElements
        }
        // let headers = {
        //     'Authorization': 'Bearer' ,
        // }
        await axiosInterceptors.post("/login", bodyForm).then(data=>{
            //console.log(data)
            if(data.data){
                console.log(data)
                setShowError("")
                localStorage.setItem("name", JSON.stringify(data.data.user_name))
                localStorage.setItem("token", JSON.stringify(data.data.token))
                localStorage.setItem("teacherId", JSON.stringify(data.data.user_id))

                navigateTo(`/${data.data.role}/${data.data.user_id}`)
                //console.log(data.data)
            }
            else{
                setShowError("Скорее всего сервак упал. Или израиль его таки уронил((((. Пишите срочно Динису Рафиковичу!!!")
            }

        })
        .catch(error=>{
            console.log(`EEEError: ${error}`)
            console.log(error.response.data)
            setShowError(error.response.data)
        })
    }
    
    return(
       <>
       <HeaderNav></HeaderNav>
        <main>
                <div className="container-xl mt-5">
                {showError&&<div className="alert alert-danger">{showError}</div>}
                    <div className="login-form d-flex flex-column align-items-center justify-content-center" style={{height: '70vh'}} id="divForm">
                        
                        <h2 className="myh2" style={{marginBottom: '2rem'}}>Вход в систему</h2>
                        
                        <form className="g-3" action="/" method="post" id="authorize_form" >
                            <div className="mb-3">
                                
                                <input type="tel" className={inputNumField.classElements} id="phoneNumber" placeholder="Номер телефона" name="number" value={inputNumField.valueElements} onInput={changeDataHandlerOnNumber} onBlur={checkIfNumHasMinSymbols}/>

                                {inputNumField.errorClass && <div className={inputNumField.errorClass}>{inputNumField.errorText}</div>}
                            </div>


                            <div className="mb-3 input-group">
                                <input type={inputPasField.typeField} onInput={changeDataHandlerOnPassword} onBlur={checkIfPasHasMinSymbols} className={inputPasField.classElements} id="pas" placeholder="Пароль" name="password"/>
                                
                                <button id="showPsw" className={showPswBtn.btnClass}type="button" onClick={showPsw} >{showPswBtn.btnValue}</button>

                                {inputPasField.errorClass && <div className={inputPasField.errorClass}>{inputPasField.errorText}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="submit" onClick={submitForm} className={btnState} id="authorize" value="Авторизоваться" style={{width: '100%'}}/>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
       </>
    );
}
 
export default Login;
