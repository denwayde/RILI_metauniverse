import React, { useEffect, useState } from 'react'
import HeaderNav from './components/Header'
import useInterceptors from "../hooks/UseInterceptor";
import { useNavigate } from 'react-router-dom';
import {Info} from 'react-feather';



const Admins = () => {
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
                   navigateTo("/error_page?statusCode=500&errorMessage="+ error)//TUT KAT TO ETOT MOMENT NUJNO POMENYAT
               })
       }
       fetchTeachersData()
       //setUsrId(localStorage.getItem('teacherId'))
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


  return isValid ? (
    <>
      <HeaderNav/>
      <div className="container">
        <div className="row">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="7а || Иванов Иван || Уфа" aria-label="Recipient's username" aria-describedby="button-addon2" onInput={findStudents}/>
            <button className="btn btn-outline-primary" type="button" id="button-addon2">ПОИСК</button>
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

                                <span className="btn btn-outline-primary m-1" id={'subtract_'+ student.id_student+'_'+student.checkpoints}>
                                <span className="textInBtn">Инфо</span> <Info/>
                                </span>
                                
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

export default Admins
