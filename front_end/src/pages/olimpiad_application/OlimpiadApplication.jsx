import React, { useEffect, useMemo, useState } from 'react'
import useInterceptors from '../../hooks/UseInterceptor'
import HeaderNav from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import OlimpiadTabs from './OlimpiadTabs';
import OlimpiadInput from './OlimpiadInput';
import OlimpiadInputBtns from './OlimpiadInputBtns';
import OlimpiadNoteList from './OlimpiadNoteList';
import StudentsList from './StudentsList';
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
        if(localStorage.getItem("notes")!==null){
            setNoteList(JSON.parse(localStorage.getItem("notes")))
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

    let [respondForSearch, setRespondForSearch] = useState([])
    let [messageIfErr, setMessageIfErr] = useState('')
    let [searchElement, setSearchElement] = useState('')

    async function findStudents(e){//ETU LOGIKU NUJNO POMENYAT: POSTAVIT KAK V PRIMECANIAH I EHE NUJNO PRODUMAT ui V POISKE
        e.preventDefault()
        setSearchElement(e.target.value)
        let bodyForm = {
            search: searchElement
        }
        if(e.target.value.length >= 2){
            await axiosInterceptors.post("/search_for_checkpoints", bodyForm)
                .then(data =>{
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
        <HeaderNav></HeaderNav>
            <div className="container ">
                
                <Breadcrumb breadcrumbActive = "Заявка на олимпиаду" />

                <OlimpiadTabs tabNum = {linksNum} linksTabs = {links} tabsSetInputAttrs = {setInputAttrs}  tabsSetLinksNum = {setLinksNum}/>


                <div className="row mt-5">
                    <div className="align-self-start input-group mb-3">
                        <OlimpiadInput InputlinksNum = {linksNum} inputMyValue={myValue} inputSetMyValue={setMyValue} inputLinks = {links} findStudents = {findStudents} />
                        <OlimpiadInputBtns saveArgsToLocalStorage={saveArgsToLocalStorage} linksNum={linksNum} addItem={addItem} /> 
                    
                    </div>

                    <OlimpiadNoteList noteList = {noteList} linksNum={linksNum} delItem={delItem} />

                    <StudentsList linksNum={linksNum} respondForSearch = {respondForSearch} messageIfErr = {messageIfErr} />
                     
                </div>
                             
            </div>       
        </>
    ) : null
}

export default OlimpioadApplication
