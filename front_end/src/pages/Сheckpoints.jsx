import React, { useEffect, useState } from 'react'
import HeaderNav from './components/Header'
import useInterceptors from "../hooks/UseInterceptor";
import { useNavigate } from 'react-router-dom';
import {PlusCircle, MinusCircle, Search} from 'react-feather';

function Checkpoints() {
   let [usrId, setUsrId] = useState()
   let [isValid, setIsValid] = useState(false)
   const navigateTo = useNavigate()

   const axiosInterceptors = useInterceptors()
    useEffect(()=>{
        const fetchTeachersData = async ()=>{
            await axiosInterceptors.post("/check_page")
                .then(data=>{
                    if (data.data) {
                        setIsValid(true)
                    }
                })
                .catch((error)=>{
                    navigateTo("/error_page?statusCode=500&errorMessage="+error)//TUT KAT TO ETOT MOMENT NUJNO POMENYAT
                })
        }
        fetchTeachersData()
        setUsrId(localStorage.getItem('teacherId'))
    },[axiosInterceptors, navigateTo])

    let [searchElement, setSearchElement] = useState('')
    
    let [respondForSearch, setRespondForSearch] = useState([])
    let [messageIfErr, setMessageIfErr] = useState('')

    async function findStudents(e){
        e.preventDefault()
        setSearchElement(e.target.value)
        let bodyForm = {
            search: searchElement
        }
        if(e.target.value.length >= 3){
            await axiosInterceptors.post("/search_for_checkpoints", bodyForm)
                .then(data =>{
                    //console.log(data.data)
                    if(data.data){
                        setRespondForSearch(data.data)
                    }
                    else{
                        setMessageIfErr(data.response.data)
                    }

                })
        }
    }
    async function changeCheckpoints(e, variable){
        let std_id = e && e.currentTarget.id.split('_')[1]
        let std_checkpoints = e &&  e.currentTarget.id.split('_')[2]
        await axiosInterceptors.get(`/change_checkpoints/${std_id}/${parseInt(std_checkpoints) + variable}`)//`/change_checkpoints/${std_id}/${parseInt(std_checkpoints) + 10}`
            .then(data=>{
                console.log(data)
                const updatedRespond = respondForSearch.map(student => {
                    if (student.id_student == std_id) {//tut ravenstvo ne menyai RABOTAT NE BUDET
                        return {
                            ...student,
                            checkpoints: parseInt(student.checkpoints) + variable//+10
                        };
                    }
                    return student;
                });
                // Обновление состояния компонента
                setRespondForSearch(updatedRespond)
            })
    }
    async function addCheckpoints(e){//nujno ogranichit eto delo do opredelennogo kolichestva raz navernoe ili poka ostav nadeyas na blagorazumie sotrudnikov. klikat vse ravno zadolbautsya
        changeCheckpoints(e, 10)
    }
    async function subtractCheckpoints(e){
        changeCheckpoints(e, -10)
    }

    return isValid ? (
        <>
        <HeaderNav></HeaderNav>
            <div className="container ">

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href={`/teacher/${usrId}`}>Домашняя</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Баллы</li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="align-self-start input-group mb-3">
                        <input 
                            type="text" 
                            className="form-control border border-primary"
                            placeholder='Введите ФИО ученика'
                            name='search'
                            onInput={findStudents} 
                        />
                        <span className="input-group-text btn btn-outline-primary" id="inputGroup-sizing-default"><span className="textInBtn">Найти</span> <Search/></span>
                    </div> 
                </div>
                { respondForSearch.length !== 0 &&
                    (<ul className="list-group">
                        {(()=>{
                            const listItems = []
                            for(let i = 0; i<respondForSearch.length; i++){
                                let student = respondForSearch[i]
                                listItems.push(
                                    <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span className="studentName">{student.name} {student.surname} {student.patronymic}</span>
                                        <span className="studentEmail" style={{color: '#6c757d' }}>{student.email}</span>
                                        <span className="studentPhone" style={{color: '#6c757d' }}>{student.phone}</span>
                                        <span style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

                                            <span className="btn btn-outline-primary m-1" id={'add_'+student.id_student+'_'+student.checkpoints} onClick={addCheckpoints}>
                                                <span className="textInBtn">Добавить</span> <PlusCircle/>
                                            </span>

                                            <span className="btn btn-outline-primary m-1" id={'subtract_'+ student.id_student+'_'+student.checkpoints} onClick={subtractCheckpoints}>
                                                <span className="textInBtn">Убрать</span> <MinusCircle/>
                                            </span>
                                            
                                            <span className="badge bg-primary rounded-pill m-1" >{student.checkpoints}</span>
                                        </span>
                                    </li>
                                )
                            }
                            return listItems
                        })()}
                    </ul>)
                }
                {messageIfErr && <div class="alert alert-danger" role="alert"> {messageIfErr} </div>}              
            </div>       
        </>
    ) : null
}

export default Checkpoints
