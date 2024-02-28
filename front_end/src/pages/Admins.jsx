import React, { useEffect, useState } from 'react'
import HeaderNav from './components/Header'
import useInterceptors from "../hooks/UseInterceptor";
import { useNavigate } from 'react-router-dom';
import {Info, Book, Mail, User, PenTool, ArrowLeft} from 'react-feather';


import Edit_input from './admins_components/Edit';


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
                   //console.log(data.data)
                   if(typeof data.data !== 'undefined' && typeof data.data[Symbol.iterator] === 'function'){
                    const arr = []
                    for (let z of data.data){
                        let newObj = {}
                        let existingObj = arr.find((person)=> person.snils === z['snils'])
                        //console.log(existingObj)
                        if(existingObj!==undefined){
                          existingObj.famyly.push(
                            {
                              parent_id: z['parent_id'],
                              parent_name: z['parent_name'],
                              parent_role: z['parent_role'],
                              job: z['job'],
                              job_place: z['job_place'],
                              parent_phone: z['parent_phone'],
                              parent_email: z['parent_email']
                            }
                          )
                        } else {
                          newObj.id_student =  z['id_student']
                          newObj.name = z['name']
                          newObj.surname = z['surname']
                          newObj.patronymic = z['patronymic']
                          newObj.graduation = z['graduation']
                          newObj.email = z['email']
                          newObj.phone = z['phone']
                          newObj.checkpoints = z['checkpoints']
                          newObj.snils = z['snils']
                          newObj.birth_day = z['birth_day']
                          newObj.gender = z['gender']
                          newObj.adress = z['adress']
                          newObj.room =z['room']
                          newObj.violations = z['violations']
                          newObj.date_of_enroll = z['date_of_enroll']
                          newObj.enroll_order_num = z['enroll_order_num']
                          newObj.nationality = z['nationality']
                          newObj.subsid = z['subsid']
                          newObj.family_length = z['family_length']
                          newObj.famyly = [{
                            parent_id: z['parent_id'],
                            parent_name: z['parent_name'],
                            parent_role: z['parent_role'],
                            job: z['job'],
                            job_place: z['job_place'],
                            parent_phone: z['parent_phone'],
                            parent_email: z['parent_email']
                          }]
                          arr.push(newObj)
                        }
                      }
                      console.log(arr)
                    setRespondForSearch(arr)
                   }
                   else{
                    console.log(data.data.respond)//-------------------tut nado budet vivodit oshibki
                       //setMessageIfErr(data.response.data)
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
    setIsEdit(true)
    setIsModal(false)
   }
    
   let[parentInfo, setParentInfo] = useState()
    function showParentInfo(e){
        let parentId = parseInt(e.currentTarget.id)
        setUserData(undefined)
        setKlassRukData(undefined)
        setUserInfoPanel(false)
        setParentInfo(
            personInModal.famyly.filter(
                el=>el.parent_id===parentId
            )[0]
        )
    }
async function showVospit(e){
    await axiosInterceptors.get("/show_vospit_info/"+e.currentTarget.id).then(
        data=>{
            console.log(data.data)
            if(data){
                setKlassRukData(undefined)
                setUserData(data.data[0])
                setUserInfoPanel(false)
            }
        }
    )
    
}

let [klassrukData, setKlassRukData] = useState()
async function showKlassRuk(e){
    await axiosInterceptors.get("/show_classruk_info/"+e.currentTarget.id).then(
        data=>{
            console.log(data.data)
            if(data){
                setUserData(undefined)
                setKlassRukData(data.data[0])
                setUserInfoPanel(false)
            }
        }
    )
}

let [isedit, setIsEdit] = useState(true)//редактирование ученика
function editUserInfo(e){
    setIsEdit(false)
    //console.log(isedit)
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
                            {isedit === true ? ""+personInModal.surname+" "+personInModal.name + " " +personInModal.patronymic : <Edit_input {...{name: ""+personInModal.surname+" "+personInModal.name + " " +personInModal.patronymic}} />}
                            
                        </h3>
                    </div>
                    
                    <div className="modal-body" style={(()=>{
                        let mystyle = {
                            borderTop: 'var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)',
                            backgroundColor: '#FFF4F4',
                            color: '#000'
                        }
                        if(personInModal.violations==2){
                            mystyle.backgroundColor = '#FF9B50'
                        }
                        else if(personInModal.violations>2){
                            mystyle.backgroundColor = '#E25E3E'
                            mystyle.color = '#ffff'
                        }
                        return mystyle
                    })()}>
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
                        <div className="row">
                            <div className="col">
                                <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Адрес:</p>
                                <h6 style={{fontSize: '0.9rem'}}>{personInModal.adress}</h6>

                                <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>СНИЛС:</p>
                                <h6>{personInModal.snils}</h6>

                                <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Субсидии:</p>
                                <h6>{personInModal.subsid}</h6>
                            </div>
                            <div className="col">
                                <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Телефон:</p>
                                <h6>{personInModal.phone}</h6>

                                <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Email:</p>
                                <h6><a href={'mailto:'+personInModal.email} target='_blank' rel="noreferrer" className="btn btn-light"><span style={{color: '#0d6efd'}}><Mail /></span> {personInModal.email}</a></h6>
                            </div>
                        
                        </div>
                    </div>

                    <div className="modal-body" style={{borderTop: 'var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)'}}>
                        <div className="row">
                            <div className="col">
                                <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Пол:</p>
                                <h6>{personInModal.gender.charAt(0).toUpperCase() + personInModal.gender.slice(1)}</h6>

                                <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Национальность:</p>
                                <h6>{personInModal.nationality}</h6>
                            </div>
                            <div className="col">
                                <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Год рождения:</p>
                                <h6>{personInModal.birth_day}</h6>
                                
                                <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Полных лет:</p>
                                <h6>
                                    {
                                        (()=>{
                                            let yearNow = new Date().getFullYear()
                                            let birthYear = parseInt(personInModal.birth_day.split('-')[0])
                                            return yearNow - birthYear
                                        })()
                                    }
                                </h6>
                            </div>
                        </div>
                    </div>

                    
                    <div className="modal-body" style={{borderTop: 'var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)'}}>
                        {userInfoPanel ?
                            <div className="row">
                                <div className="col">
                                    {
                                        (()=>{
                                            let family_arr = []
                                            if(personInModal.famyly[0].parent_id !== undefined){
                                                for(let x of personInModal.famyly){
                                                    family_arr.push(
                                                            <h6 key={x.parent_id}>
                                                                <button className="btn btn-light" id={x.parent_id} onClick={showParentInfo}>
                                                                    <span style={{color: '#0d6efd'}}><User/> </span>
                                                                    {x.parent_role.charAt(0).toUpperCase() + x.parent_role.slice(1)}
                                                                </button>
                                                            </h6>
                                                    )
                                                }
                                                return family_arr
                                            }
                                            else {
                                                return <h6>Информации о родителях не заполнена</h6>
                                            }
                                        })()
                                    }
                                    
                                </div>
                                <div className="col">
                                    <h6>
                                        <button className="btn btn-light" id={personInModal.id_student} onClick={showKlassRuk}>
                                            <span style={{color: '#198754'}}><PenTool/></span> Классрук
                                        </button>
                                    </h6>
                                    <h6>
                                        <button className="btn btn-light" id={personInModal.id_student} onClick={showVospit}><span style={{color: '#198754'}}><PenTool/></span> Воспитатель</button>
                                    </h6>
                                </div>
                            </div>
                            : 
                            (userInfoPanel === false && userData !== undefined)?
                            <div className="row">
                                <div className="col-10">

                                    <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Имя:</p>
                                    <h6>{userData.vospit_name}</h6>

                                    <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}> Телефон:</p>
                                    <h6>{userData.vospit_phone}</h6>

                                    <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}> Email:</p>
                                    <h6>{userData.vospit_email}</h6>

                                </div>
                                <div className="col-2 d-flex justify-content-end">
                                    <button className='btn-back btn btn-light' onClick={(e)=>setUserInfoPanel(true)}><ArrowLeft/></button>
                                </div>
                            </div>
                            :
                            (userInfoPanel === false && klassrukData !== undefined)?
                            <div className="row">
                                <div className="col-10">
                                    <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Имя:</p>
                                    <h6>{klassrukData.klruk_name}</h6>

                                    <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}> Телефон:</p>
                                    <h6>{klassrukData.klruk_phone}</h6>

                                    <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}> Email:</p>
                                    <h6>{klassrukData.klruk_email}</h6>
                                </div>
                                <div className="col-2 d-flex justify-content-end">
                                    <button className='btn-back btn btn-light' onClick={(e)=>setUserInfoPanel(true)}><ArrowLeft/></button>
                                </div>
                            </div>
                            :
                            <div className="row parent">
                                <div className="col-10">
        
                                    <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}>Имя:</p>
                                    <h6>{parentInfo.parent_name}</h6>

                                    <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}> Телефон:</p>
                                    <h6>{parentInfo.parent_phone}</h6>

                                    <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}> Email:</p>
                                    <h6>{parentInfo.parent_email}</h6>

                                    <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}> Место работы:</p>
                                    <h6>{parentInfo.job_place}</h6>

                                    <p style={{marginBottom: '0.1rem', fontSize: '0.7rem'}}> Должность:</p>
                                    <h6>{parentInfo.job}</h6>
                                </div>
                                <div className="col-2 d-flex justify-content-end">
                                    <button className='btn-back btn btn-light' onClick={(e)=>setUserInfoPanel(true)}><ArrowLeft/></button>
                                </div>
                            </div>
                        }
                    </div>

                    {/* <div className="modal-body" style={{borderTop: 'var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)'}}>
                        <div className="row">
                            <div className="col">
                                <h6><button className="btn btn-light" ><span style={{color: '#198754'}}><Book/></span> Башкирский</button></h6>
                            </div>
                            <div className="col">
                                <h6><button className="btn btn-light" ><span style={{color: '#198754'}}><Book/></span> Английский</button></h6>
                            </div>
                        </div>
                    </div> */}

                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={editUserInfo}>Редактировать</button>
                        <button type="button" className="btn btn-primary">Выбрать</button>
                    </div>
                </div>
            </div>
        </div> : null
    }
{/* Modalnoe okno */}

        { respondForSearch.length !== 0 &&
            (
                <>
                <div className='row'>
                    <div className="col">
                        <h6>Найдено {respondForSearch.length}</h6>
                    </div>
                </div>
                <ul className="list-group">
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
                </ul>
            </>
            )
                }
                {messageIfErr && <div class="alert alert-danger" role="alert"> {messageIfErr} </div>}
      </div>
    </>
  ) : null
}

export default Admins
