import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import api from "../interceptor";
import HeaderNav from "./components/Header";
import useInterceptors from "../hooks/UseInterceptor";

const Teachers = ()=>{
    let [teacherData, setTeacherData] = useState({
        teacherName: '',
        checkpoints: '',
        teacher_id: ''
    })
    const axiosInterceptors = useInterceptors()
    let [isValid, setIsValid] = useState(false)
    useEffect(()=>{
        const fetchTeachersData = async ()=>{
            await axiosInterceptors.post(`${window.location.pathname}`).then(data=>{
                //console.log(data)
                if(data.data){
                    setTeacherData(prev=>({
                        ...prev,
                        teacherName: data.data.name,
                        checkpoints: data.data.checkpoints,
                        teacher_id: data.data.teacher_id
                    }))
                    return setIsValid(true)
                }
                else {
                    data.response ? console.log(data.response.data) : console.log("Something realy bad happend to server!!!") 
                }
                
            }).catch(error=>{
                console.log(error.response)
            })
        }
        
        fetchTeachersData()
    }, [axiosInterceptors])   //ПРОВЕРЬ http://localhost:3000/teacher/2 ЭТУ ССЫЛЬ НА ДОСТУПНОСТЬ ПОСЛЕ ВКЛЮЧЕНИЯ КОМПА НЕ АВТОРИЗУЙСЯ!!!!!!!!!!!!!!

    return isValid ? (
       <>
        <HeaderNav></HeaderNav>
        <div className="container">
            <div className="row">
                <h1 className="mt-3">Добро пожаловать {teacherData.teacherName}</h1>
                <p>У вас есть баллов {teacherData.checkpoints}</p>
                

                <div className="list-group">
                    <Link to={"/teacher/checkpoints/"+ teacherData.teacher_id} className="list-group-item">Баллы</Link>
                    <Link to={"/teacher/aplication_for_olimpiad/"+ teacherData.teacher_id} className="list-group-item">Заявка на олимпиаду</Link>
                    <Link to={"/teacher/aplication_for_free_attendance/"+ teacherData.teacher_id} className="list-group-item">Заявка на свободное посещение ученику</Link>
                    <Link to={"/teacher/subject_report/"+ teacherData.teacher_id} className="list-group-item">Отчет предметника</Link>
                    <Link to={"/teacher/homeroom_teacher_report/"+ teacherData.teacher_id} className="list-group-item">Отчет классного руководителя</Link>
                </div>
            </div>
        </div>   
       </>
    ) : null
}
export default Teachers