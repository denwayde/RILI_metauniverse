import React, { useEffect, useMemo, useState } from 'react'
import useInterceptors from '../../hooks/UseInterceptor'
import {ArrowRightCircle, ArrowLeftCircle, FilePlus, PlusSquare, Trash} from 'react-feather';
import HeaderNav from '../components/Header';
//import {Link} from 'react-router-dom'

function OlimpioadApplication() {
    let [myValue, setMyValue] = useState('')
    let [usrId, setUsrId] = useState()
    let [isValid, setIsValid] = useState(false)
    let links = useMemo(()=>['olimpName', 'adress', 'period', 'transport', 'notes', 'studentsList'], [])
    let transportList = ["ПАЗ-3205", "Hyundai Accent", "Свое авто"]
    let links_name = ['Название мероприятия', 'Адрес', 'Период проведения', 'Транспорт', 'Примечания', 'Список участников']
    let placeholders = ["Введите цель и название мероприятия", "Введите адрес проведения мероприятия", "Выберите период проведения мероприятия", "Выберите транспорт", "Напишите дополнения необходимые для олипиады (перенос обеда, питание с собой и т.п.)", "Выберите учеников, участников мероприятия"]
    let [linksNum, setLinksNum] = useState(0)
    const axiosInterceptors = useInterceptors()
    
    useEffect(()=>{
        if(localStorage.getItem(links[linksNum])!==null){
            setMyValue(localStorage.getItem(links[linksNum]))
        }
        if(localStorage.getItem("transport")!==null){
            setSelelectValue(localStorage.getItem("transport"))
        } 
        const fetchTeachersData = async ()=>{
            await axiosInterceptors.post("/check_page")
                .then(data=>{
                    if (data.data) {
                        setIsValid(true)
                    }
                    else{
                        data.response ? console.log(data.response.data) : console.log("Something realy bad happend to server!!!")
                    }
                }) 
        }
        fetchTeachersData()        
        setUsrId(localStorage.getItem('teacherId'))
    },[axiosInterceptors, linksNum, links])
    

    function saveArgsToLocalStorage(e, myVar){
        if((linksNum<links.length-1 && myVar>0) || (linksNum>0 && myVar<0)){
            setLinksNum(prevNum => prevNum+myVar)
            setInputAttrs(linksNum+1)
        }
        
    }

    function setInputAttrs(myNum){
        
        setMyValue(prevValue=>{
            if(localStorage.getItem(links[myNum])!==null){
                
                prevValue = localStorage.getItem(links[myNum])
            }
            else {
                prevValue = ''
            }
            return prevValue
        })
    }
    
    function onFocusOutValueOnInput(e){
        if(e.target.value === ''){
            localStorage.removeItem(links[linksNum])
        }
        else{
            localStorage.setItem(links[linksNum], e.target.value)
        }
        

    }

    let[selectValue, setSelelectValue] = useState('default')
    function changeSelect(e){
        setSelelectValue(e.target.value)
        localStorage.setItem(links[linksNum], e.target.value)
    }

    let [noteList, setNoteList] = useState([])
    function addItem(e){
        if(myValue!==''){
            setNoteList(args=>[...args, myValue])
            setMyValue('')
        }
    }

    function delItem(e, item){
        setMyValue('')
        setNoteList(prev=>{
            let newPrev = prev.filter(items=>items!==item)
            return newPrev
        })
    }

    //function onChangeInput(e){}

    return isValid ? (
        <>
        <HeaderNav></HeaderNav>
            <div className="container ">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href={`/teacher/${usrId}`}>Домашняя</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Заявка на олимпиаду</li>
                    </ol>
                </nav>
                
                <ul className="nav nav-tabs my-tabs">
                    {
                        (()=>{
                            let tabsList = []
                            for(let i = 0; i<links_name.length; i++){
                                    if(i>linksNum && localStorage.getItem(links[i])===null){
                                        tabsList.push(
                                            <li key={i} className="nav-item">
                                                <span className="nav-link disabled">{links_name[i]}</span>
                                            </li>                                    
                                            )
                                    }
                                    else if(i===linksNum){
                                        tabsList.push(
                                            <li key={i} className="nav-item">
                                                <span className="nav-link active">{links_name[i]}</span>
                                            </li>                                    
                                            )
                                    }
                                    else{
                                        tabsList.push(
                                            <li key={i} className="nav-item" onClick={(e)=>{setLinksNum(i); setInputAttrs(i)}}>
                                                <span className="nav-link">{links_name[i]}</span>
                                            </li>                                    
                                            )
                                    }
                                }
                            return tabsList
                        })()
                    }
                </ul>
                <div className="row mt-5">
                    <div className="align-self-start input-group mb-3">
                        {linksNum===3 ? 
                            <select className="form-select" value={selectValue} onChange={changeSelect}>
                                <option value='default'>Выберите транспорт</option>
                                {(()=>{
                                    let myTransportlist = []
                                    for(let i = 0; i<transportList.length; i++){
                                        myTransportlist.push(
                                            <option key={i} value={transportList[i]}>{transportList[i]}</option>
                                        )
                                    }
                                    return myTransportlist
                                })()}
                            </select>
                        :
                            <input 
                                type="text" //ZDES NUJNO DOBAVIT INPUT DLYA 4 LINKNUM V KOTOROM NUJNO SVOE POVEDENIE... I RAZBEY ETOT FAIL NA FUNCCII I KUSKI PREDSTAVLENII !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                className="form-control border border-primary"
                                placeholder={placeholders[linksNum]}
                                name={links[linksNum]}
                                value={myValue}
                                onBlur={onFocusOutValueOnInput}
                                onChange={(e)=>{setMyValue(e.target.value); localStorage.setItem(links[linksNum], myValue)}}
                            />
                        }
                        
                        {linksNum===4 && <span className="input-group-text btn btn-outline-primary" id="inputGroup-sizing-default" onClick={addItem}><span className="textInBtn">Добавить</span> <PlusSquare/></span>}

                        {linksNum>0 && <span className="input-group-text btn btn-outline-primary" id="inputGroup-sizing-default" onClick={(e)=>{saveArgsToLocalStorage(e, -1)}}><span className="textInBtn">Назад</span> <ArrowLeftCircle/></span>}

                        {
                            linksNum===5 ? 
                            <span className="input-group-text btn btn-outline-success" id="inputGroup-sizing-default"><span className="textInBtn">Создать документ</span> <FilePlus/></span> : 
                            <span className="input-group-text btn btn-outline-primary" id="inputGroup-sizing-default" onClick={(e)=>{saveArgsToLocalStorage(e, 1)}}><span className="textInBtn">Вперед</span> <ArrowRightCircle/></span>
                        }
                        
                    </div>
                    {
                        noteList.length>0 && linksNum === 4 ?
                        <ul className="list-group">
                            {(()=>{
                                localStorage.setItem("notes", JSON.stringify(noteList))
                                let myNoteList = []
                                for(let i= 0; i < noteList.length; i++){
                                    myNoteList.push(
                                        <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>{noteList[i]}</span>
                                            <span className="btn btn-outline-primary m-1"  onClick={(e)=>delItem(e, noteList[i])}>
                                                <Trash/>
                                            </span>
                                        </li>
                                    )
                                }
                                return myNoteList
                            })()}
                        </ul>
                        : null
                    
                    } 
                </div>
                             
            </div>       
        </>
    ) : null
}

export default OlimpioadApplication
