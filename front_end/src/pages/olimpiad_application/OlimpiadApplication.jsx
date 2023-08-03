import React, { useEffect, useMemo, useState } from 'react'
import useInterceptors from '../../hooks/UseInterceptor'
import {ArrowRightCircle, ArrowLeftCircle, FilePlus, PlusSquare, Trash} from 'react-feather';
import HeaderNav from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import OlimpiadTabs from './OlimpiadTabs';
import OlimpiadInput from './OlimpiadInput';
//import {Link} from 'react-router-dom'

function OlimpioadApplication() {
    let [myValue, setMyValue] = useState('')
    
    let [isValid, setIsValid] = useState(false)
    let links = useMemo(()=>['olimpName', 'adress', 'period', 'transport', 'notes', 'studentsList'], [])
     
    let [linksNum, setLinksNum] = useState(0)
    const axiosInterceptors = useInterceptors()
    
    useEffect(()=>{
        if(localStorage.getItem(links[linksNum])!==null){
            setMyValue(localStorage.getItem(links[linksNum]))
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


    return isValid ? (
        <>
        <HeaderNav></HeaderNav>
            <div className="container ">
                
                <Breadcrumb breadcrumbActive = "Заявка на олимпиаду" />

                <OlimpiadTabs tabNum = {linksNum} linksTabs = {links} tabsSetInputAttrs = {setInputAttrs}  tabsSetLinksNum = {setLinksNum}/>


                <div className="row mt-5">
                    <div className="align-self-start input-group mb-3">
                        
                        <OlimpiadInput InputlinksNum = {linksNum} inputMyValue={myValue} inputSetMyValue={setMyValue} inputLinks = {links} />
                        
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
