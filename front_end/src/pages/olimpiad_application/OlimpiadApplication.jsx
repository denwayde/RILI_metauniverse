import React, { useEffect, useMemo, useState } from 'react'
import useInterceptors from '../../hooks/UseInterceptor'
import HeaderNav from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import OlimpiadTabs from './OlimpiadTabs';
import OlimpiadInput from './OlimpiadInput';
import OlimpiadInputBtns from './OlimpiadInputBtns';
import OlimpiadNoteList from './OlimpiadNoteList';
import StudentsList from './StudentsList';
import AddedStudentsList from './AddedStudentsList';
//import {Link} from 'react-router-dom'
function isJSON(str){
    try {
        JSON.parse(str)
        return true
    } catch(e){
        return false
    }

}

function OlimpioadApplication() {
    let [myValue, setMyValue] = useState('')
    let [isValid, setIsValid] = useState(false)
    let links = useMemo(()=>['olimpName', 'adress', 'period', 'transport', 'notes', 'studentsList'], [])
    let [linksNum, setLinksNum] = useState(0)
    let [respondForSearch, setRespondForSearch] = useState([])
    let [messageIfErr, setMessageIfErr] = useState('')
    let [searchElement, setSearchElement] = useState('')
    let [addedStudentListValue, setAddedStdListValue] = useState([])
    const axiosInterceptors = useInterceptors()
    let [noteList, setNoteList] = useState([])


    useEffect(()=>{
        if(localStorage.getItem(links[linksNum])!==null){
            setMyValue(localStorage.getItem(links[linksNum]))
        }
        if(localStorage.getItem("notes")!==null){
            if(isJSON(localStorage.getItem("notes"))){
                setNoteList(JSON.parse(localStorage.getItem("notes")))
            }
            else {
                setNoteList(localStorage.getItem("notes"))
            }
            
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
        
        
        
    },[axiosInterceptors, linksNum, links, respondForSearch])
    

    function saveArgsToLocalStorage(e, myVar){
        if((linksNum<links.length-1 && myVar>0) || (linksNum>0 && myVar<0)){
            setLinksNum(prevNum => prevNum+myVar)
            setInputAttrs(linksNum+1)
        }   
    }

    function setInputAttrs(myNum){//!!!!!!!!!!!!!!!!!!tut kajetsya proishodyat nenujnie veshi
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


    function delItem(e, item){
        setMyValue('')
        setNoteList(prev=>{
            let newPrev = prev.filter(items=>items!==item)
            return newPrev
        })
        if(noteList.length === 1){
            localStorage.removeItem("notes")
        }

    }



    async function findStudents(e){//!!!!!!!!!!!ETU LOGIKU NUJNO POMENYAT: POSTAVIT KAK V PRIMECANIAH I EHE NUJNO PRODUMAT ui V POISKE!!!!!!!!!!
        e.preventDefault()//!!!!!!TUT ESLI VBIT KLASS TIPA 9A TO ISKAT NE BUDET TK USESTATE RABOTAET NE TAK KAK TY DUMAESH!!!!!!!
        setSearchElement(e.target.value)
        let bodyForm = {
            search: searchElement
        }
        if(e.target.value.length > 0){
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

    function addedStudentList(addedStudentListValue){
        console.log(addedStudentListValue)
    }

  
    let[notesValue, setNotesValue] = useState('')

    function addItem(e){//ZDES NUJNO POPRAVLYA
        if(notesValue.trim()!==''){
            setNoteList([...noteList, notesValue.trim()])
            setNotesValue('')
        }
    }

    // function editItem(item){

    // }

    return isValid ? (
        <>
        <HeaderNav></HeaderNav>
            <div className="container ">
                
                <Breadcrumb breadcrumbActive = "Заявка на олимпиаду" />

                <OlimpiadTabs
                    tabNum = {linksNum}
                    linksTabs = {links}
                    tabsSetInputAttrs = {setInputAttrs} 
                    tabsSetLinksNum = {setLinksNum}
                />


                <div className="row mt-5">
                    <div className="align-self-start input-group mb-3">
                        
                        <OlimpiadInput
                            InputlinksNum = {linksNum}
                            inputMyValue={myValue}
                            inputSetMyValue={setMyValue}
                            inputLinks = {links}
                            findStudents = {findStudents}
                            notesValue={notesValue}
                            setNotesValue={setNotesValue}
                        />
                        
                        <OlimpiadInputBtns
                            saveArgsToLocalStorage={saveArgsToLocalStorage}
                            linksNum={linksNum}
                            addItem={addItem}
                        /> 
                    
                    </div>

                    <AddedStudentsList
                        addedStudentListValue = {addedStudentListValue}
                        setAddedStdListValue = {setAddedStdListValue}
                    />

                    <OlimpiadNoteList
                        noteList = {noteList}
                        linksNum={linksNum}
                        delItem={delItem}
                    />

                    <StudentsList 
                        linksNum={linksNum}
                        respondForSearch = {respondForSearch}
                        messageIfErr = {messageIfErr}
                        addedStudentList = {addedStudentList}
                        addedStudentListValue = {addedStudentListValue}
                        setAddedStdListValue = {setAddedStdListValue}
                    />
                     
                </div>
                             
            </div>       
        </>
    ) : null
}

export default OlimpioadApplication
