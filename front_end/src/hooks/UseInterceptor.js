import {useEffect} from "react";
import api from "../interceptor";
import { useNavigate } from "react-router-dom";


const UseInterceptors = ()=>{
    const navigator = useNavigate()
    //let [isValid, setIsvalid] = useState(false)
    useEffect(()=>{
        const axiosRequestInterceptor = api.interceptors.request.use(config => {
                 const token =  localStorage.getItem('token')// Ваш токен аутентификации
                 config.headers.Authorization = `Bearer ${token}` // Добавление заголовка Authorization
                 return config
               }, error => {
                 return Promise.reject(error)
               })
        const axiosResponseInterceptor =  api.interceptors.response.use(
               (response) => response,
               (error) => {
                 if (error.response.status === 401) {
                   localStorage.clear(); 
                   if(window.location.pathname !== "/"){
                      navigator("/")
                   }
               }
               if (error.response.status === 406) {
                 navigator("/error_page?statusCode=406&errorMessage=Эта страница недоступна для Вас")
               }
               return Promise.reject(error)
            
             })
             //setIsvalid(true)
             return () => {
                api.interceptors.request.eject(axiosRequestInterceptor)
                api.interceptors.response.eject(axiosResponseInterceptor)
              }
        },[navigator])

    return api
}

export default UseInterceptors