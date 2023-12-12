import React, { useEffect, useState } from 'react'
import HeaderNav from './components/Header'
import useInterceptors from "../hooks/UseInterceptor";
import { useNavigate } from 'react-router-dom';
import {Info, Book, Mail, User, PenTool} from 'react-feather';



const Admins = () => {
  let [isValid, setIsValid] = useState(false)
  const navigateTo = useNavigate()
  let [searchElement, setSearchElement] = useState('')
    
  let [respondForSearch, setRespondForSearch] = useState([])
  let [messageIfErr, setMessageIfErr] = useState('')
  let [isModal, setIsModal] = useState(false)
  let [personInModal, setPersonInModal] = useState({})
  let [birth, setBirth] = useState()
  const axiosInterceptors = useInterceptors()
   
  useEffect(()=>{
       const fetchTeachersData = async ()=>{
           await axiosInterceptors.post("/check_page")
               .then(data=>{
                //console.log(data.data)
                   if (data.data) {
                       setIsValid(true)
                   }
               })
               .catch((error)=>{
                   navigateTo("/error_page?statusCode=500&errorMessage="+ error)//TUT KAT TO ETOT MOMENT NUJNO POMENYAT
               })
       }
       fetchTeachersData()

       if(personInModal.birth_day){
        setBirth( async(br)=>{
            return br = await new Date(personInModal.birth_day)
        }
        )
    }
       //setUsrId(localStorage.getItem('teacherId'))
   },[axiosInterceptors, navigateTo, personInModal])

   

   async function findStudents(e){
       e.preventDefault()
       setSearchElement(e.target.value)
       let bodyForm = {
           search: searchElement
       }
       if(e.target.value.length >= 3){
           await axiosInterceptors.post("/search_for_admins", bodyForm)
               .then(data =>{
                   console.log(data.data)
                   if(data.data){
                       setRespondForSearch(data.data)
                   }
                   else{
                       setMessageIfErr(data.response.data)
                   }

               })
       }
   }
 

   let showInfo =  (e)=>{
    setIsModal(true)
    setPersonInModal( async(newArr) => {
        return newArr = await respondForSearch.filter(el=>el.id_student===parseInt(e.currentTarget.id))[0]
    }
    )
   }

   let birthDate = ()=>{
    let localBirth = ''
    if(birth.getMonth()===0){
        return localBirth = ''+birth.getDate()+'.01.'+birth.getFullYear()
    }
    else if(birth.getMonth()>=9){
        return localBirth = ''+birth.getDate()+'.'+(birth.getMonth()+1)+'.'+birth.getFullYear()
    }
    else {
        return localBirth = ''+birth.getDate()+'.0'+(birth.getMonth()+1)+'.'+birth.getFullYear()
    }
   }

   let fullAge = ()=>{
    let yearNow = new Date().getFullYear()
    return yearNow - birth.getFullYear()
   }
   
   let closeModal = ()=>{
    setIsModal(false)
   }

  return isValid ? (
    <>
      <HeaderNav/>
      <div className="container">
        <div className="row">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Введите класс или ФИО" onInput={findStudents}/>
            <button className="btn btn-outline-primary" type="button" id="button-addon2">ПОИСК</button>
          </div>
        </div>

{/* Modalnoe okno */}
    { isModal ?
        <div className="modal fade show" id="staticBackdropLive" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLiveLabel" style={{display: "block"}} aria-modal="true" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLiveLabel"></h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <h3>
                            {""+personInModal.surname+" "+personInModal.name + " " +personInModal.patronymic}
                            <small style={{fontSize: '.6em'}}>
                                {' ('+personInModal.gender +')' }
                            </small>
                        </h3>
                    </div>

                    <div className="modal-body" style={{borderTop: 'var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)'}}>
                    <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Класс:</p>
                    <h6>{personInModal.graduation}</h6>
                    </div>

                    <div className="modal-body" style={{borderTop: 'var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)'}}>
                        
                        <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Телефон:</p>
                        <h6>{personInModal.phone}</h6>

                        <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Email:</p>
                        <h6><a href={'mailto:'+personInModal.email} target='_blank' className="btn btn-light"><span style={{color: '#0d6efd'}}><Mail /></span> {personInModal.email}</a></h6>
                        
                        <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Адрес:</p>
                        <h6>{personInModal.adress}</h6>

                        <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>СНИЛС:</p>
                        <h6>{personInModal.snils}</h6>

                        <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Комната:</p>
                        <h6>{personInModal.room}</h6>
                    </div>

                    <div className="modal-body" style={{borderTop: 'var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)'}}>
                        <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Год рождения:</p>
                        <h6>{birthDate()}</h6>
                        
                        <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Полных лет:</p>
                        <h6>{fullAge()}</h6>
                    </div>

                    <div className="modal-body" style={{borderTop: 'var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)'}}>
                        <div className="row">
                            <div className="col">
                                <h6><a className="btn btn-light" ><span style={{color: '#d63384'}}><User/></span> Мать</a></h6>
                                <h6><a className="btn btn-light"><span style={{color: '#0d6efd'}}><User/></span> Отец</a></h6>
                            </div>
                            <div className="col">
                                <h6><a className="btn btn-light" ><span style={{color: '#198754'}}><PenTool/></span> Классрук</a></h6>
                                <h6><a className="btn btn-light"><span style={{color: '#198754'}}><PenTool/></span> Воспитатель</a></h6>
                            </div>
                        </div>
                    </div>

                    <div className="modal-body" style={{borderTop: 'var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)'}}>
                        <div className="row">
                            <div className="col">
                                <h6><a className="btn btn-light" ><span style={{color: '#198754'}}><Book/></span> Башкирский</a></h6>
                            </div>
                            <div className="col">
                                <h6><a className="btn btn-light" ><span style={{color: '#198754'}}><Book/></span> Английский</a></h6>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Выбрать</button>
                    </div>
                </div>
            </div>
        </div> : null
    }
{/* Modalnoe okno */}

        { respondForSearch.length !== 0 &&
            (<ul className="list-group">
              {(()=>{
                const listItems = []
                for(let i = 0; i<respondForSearch.length; i++){
                    let student = respondForSearch[i]
                    listItems.push(
                        <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                            <span className="studentName" style={{width: "30%"}}>{student.name} {student.surname} {student.patronymic}</span>
                            
                                <span className="studentEmail" style={{color: '#6c757d' }}>{student.graduation}</span>
                                <span className="studentEmail" style={{color: '#6c757d' }}>{student.email}</span>
                                <span className="studentPhone" style={{color: '#6c757d' }}>{student.phone}</span>
                            
                            <span style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

                                <span className="btn btn-outline-primary m-1" id={student.id_student} onClick={showInfo}>
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
