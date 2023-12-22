import React, { useEffect, useState } from 'react'
import HeaderNav from './components/Header'
import useInterceptors from "../hooks/UseInterceptor";
import { useNavigate } from 'react-router-dom';
import {Info, Book, Mail, User, PenTool} from 'react-feather';



const Admins = () => {
  let [isValid, setIsValid] = useState(false)
  const navigateTo = useNavigate()
  let [respondForSearch, setRespondForSearch] = useState([])
  let [messageIfErr, setMessageIfErr] = useState('')
  let [isModal, setIsModal] = useState(false)
  let [personInModal, setPersonInModal] = useState({})
  //let [birth, setBirth] = useState()
  const axiosInterceptors = useInterceptors()


    let [userInfoPanel, setUserInfoPanel] = useState(true)
    let [userData, setUserData] = useState()
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
                   navigateTo("/error_page?statusCode=500&errorMessage="+ error)
               })
       }
       fetchTeachersData()

   },[axiosInterceptors, navigateTo])

   

   async function findStudents(e){
       e.preventDefault()
       let bodyForm = {
           search: e.target.value
       }
       if(e.target.value.length >= 2){
           await axiosInterceptors.post("/search_for_admins", bodyForm)
               .then(data =>{
                   console.log(data.data)
                   if(data.data){
                    
                    //--------------------------------------тут надо изменить массив объектов !!!!!!!!!!!!!
                      //setRespondForSearch(result)
                   }
                   else{
                       setMessageIfErr(data.response.data)
                   }

               })
       }
   }
 

   let showInfo =  (e)=>{
    setUserInfoPanel(true)
    setIsModal(true)
    setPersonInModal(respondForSearch.filter(el=>el.id_student===parseInt(e.currentTarget.id))[0])
    
   }

   
   let closeModal = ()=>{
    setIsModal(false)
   }

    

    async function getUserInfo(e){//-------------------tut nujno menyat zapros. mojet daje udalyat
        
        let req = "/search_for_parent/"+e.currentTarget.id.split('_')[0]+"/"+e.currentTarget.id.split('_')[1]
        //console.log(req)
        let respond = await axiosInterceptors.get(req)
        console.log(JSON.parse(respond.data.data))//----------eto normalno pokazivaet data
        setUserInfoPanel(false)
        setUserData(JSON.parse(respond.data.data))
        
        
    }

  return isValid ? (
    <>
      <HeaderNav/>
      <div className="container">
        <div className="row">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Введите класс или ФИО" onInput={findStudents}/>
            <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={findStudents}>ПОИСК</button>
          </div>
        </div>

{/* Modalnoe okno */}
    { isModal ?
        <div className="modal fade show" id="staticBackdropLive" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLiveLabel" style={{display: "block", backgroundColor: "rgba(0,0,0,0.7)"}} aria-modal="true" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
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
                        <div className="row">
                            <div className="col">
                                <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Класс:</p>
                                <h6>{personInModal.graduation}</h6>
                            </div>
                            <div className="col">
                                <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Комната:</p>
                                <h6>{personInModal.room}</h6>
                            </div>
                            <div className="col">
                                <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Объяснительных:</p>
                                <h6>{personInModal.violations}</h6>
                            </div>
                        </div>
                    
                    </div>

                    <div className="modal-body" style={{borderTop: 'var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)'}}>
                        
                        <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Телефон:</p>
                        <h6>{personInModal.phone}</h6>

                        <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Email:</p>
                        <h6><a href={'mailto:'+personInModal.email} target='_blank' rel="noreferrer" className="btn btn-light"><span style={{color: '#0d6efd'}}><Mail /></span> {personInModal.email}</a></h6>
                        
                        <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Адрес:</p>
                        <h6>{personInModal.adress}</h6>

                        <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>СНИЛС:</p>
                        <h6>{personInModal.snils}</h6>
                
                    </div>

                    <div className="modal-body" style={{borderTop: 'var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)'}}>
                        <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Год рождения:</p>
                        <h6>{personInModal.birth_day}</h6>
                        
                        <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Полных лет:</p>
                        <h6>
                            {
                                (()=>{
                                    let yearNow = new Date().getFullYear()
                                    let birthYear = parseInt(personInModal.birth_day.split('.')[2])
                                    return yearNow - birthYear
                                })()
                            }
                        </h6>
                    </div>

                    
                    <div className="modal-body" style={{borderTop: 'var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)'}}>
                        {userInfoPanel ?
                            <div className="row">
                                <div className="col">
                                    <h6><button className="btn btn-light" id={"mother_"+personInModal.id_student} onClick={getUserInfo}><span style={{color: '#d63384'}}><User/></span> Мать</button></h6>
                                    <h6><button className="btn btn-light" id={"father_"+personInModal.id_student} ><span style={{color: '#0d6efd'}}><User/></span> Отец</button></h6>
                                </div>
                                <div className="col">
                                    <h6><button className="btn btn-light" id={"teacher_"+personInModal.id_student} ><span style={{color: '#198754'}}><PenTool/></span> Классрук</button></h6>
                                    <h6><button className="btn btn-light" id={"vospit_"+personInModal.id_student} ><span style={{color: '#198754'}}><PenTool/></span> Воспитатель</button></h6>
                                </div>
                            </div> : 
                            <div className="row">
                                <div className="modal-body" style={{borderTop: 'var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)'}}>
                                    <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Name:</p>
                                    <h6>{userData[0].parent_name}</h6>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="modal-body" style={{borderTop: 'var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)'}}>
                        <div className="row">
                            <div className="col">
                                <h6><button className="btn btn-light" ><span style={{color: '#198754'}}><Book/></span> Башкирский</button></h6>
                            </div>
                            <div className="col">
                                <h6><button className="btn btn-light" ><span style={{color: '#198754'}}><Book/></span> Английский</button></h6>
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
