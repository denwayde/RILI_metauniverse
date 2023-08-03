import React from 'react'

function OlimpiadTabs(props) {
    let links_name = ['Название мероприятия', 'Адрес', 'Период проведения', 'Транспорт', 'Примечания', 'Список участников']

    return (
        <>
        <ul className="nav nav-tabs my-tabs">
            {
                (()=>{
                    let tabsList = []
                    for(let i = 0; i<links_name.length; i++){
                            if(i>props.tabNum && localStorage.getItem(props.linksTabs[i])===null){
                                tabsList.push(
                                    <li key={i} className="nav-item">
                                        <span className="nav-link disabled">{links_name[i]}</span>
                                    </li>                                    
                                    )
                            }
                            else if(i===props.tabNum){
                                tabsList.push(
                                    <li key={i} className="nav-item">
                                        <span className="nav-link active">{links_name[i]}</span>
                                    </li>                                    
                                    )
                            }
                            else{
                                tabsList.push(
                                    <li key={i} className="nav-item" onClick={(e)=>{props.tabsSetLinksNum(i); props.tabsSetInputAttrs(i)}}>
                                        <span className="nav-link">{links_name[i]}</span>
                                    </li>                                    
                                    )
                            }
                        }
                    return tabsList
                })()
            }
        </ul>
        </>
    )
}

export default OlimpiadTabs
