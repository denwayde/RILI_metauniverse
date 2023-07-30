import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000/rili_api/"
})

// Добавление интерцептора для каждого запроса
// api.interceptors.request.use(config => {
//     const token =  localStorage.getItem('token')// Ваш токен аутентификации
//     console.log(token)
//     config.headers.Authorization = `Bearer ${token}` // Добавление заголовка Authorization
//     return config
//   }, error => {
//     return Promise.reject(error)
//   })

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const navigator = useNavigate()
//     if (error.response.status === 401) {
//       // Если статус код 401 (несанкционированный доступ), то можно выполнить логаут пользователя
//       localStorage.clear(); // Очищаем хранилище токена или других авторизационных данных
//       if(window.location.pathname !== "/"){
//         // window.stop()
//         // window.location.href = "/"
//         navigator("/")
//       }
//   }
//   if (error.response.status === 406) {
//     // window.stop()
//     // window.location.href = "/error_page?statusCode=406&errorMessage=Эта страница недоступна для Вас. Попробуйте авторизоваться с данными от Диниса Рафиковича"
//     //return Promise.reject(error)
//     navigator("/error_page")
//   }
//   return error

// })

  export default api