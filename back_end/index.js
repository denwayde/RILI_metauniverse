const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})


const token_verifyer = (req, res, next)=>{
    let auth_header = req.headers.authorization
    
    let token_from_user = auth_header && auth_header.split(" ")
    console.log(token_from_user)

    if (token_from_user[1]=='null'||token_from_user==undefined) return res.status(406).json({
        err: "Permission denied"
    })
    try {
        jwt.verify(JSON.parse(token_from_user[1]), process.env.SECRET_KEY, (err, decoded)=>{
            if(err){
                //console.log(err) 
                return res.status(401).json({err: "Invalid token"})
            }
            
            req.user = decoded
            next()
        })
        // req.user = payload
        // next()
    } catch (error) {
        console.log(error)
        return res.status(406).json({
            err: error
        })
    }
   
}

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ilfat1991',
    database: 'rili_db'
  })

app.post("/rili_api/login", (req, res)=>{
    
    db.query("select*from users where phone = ?", [req.body.phone], async(err, data, rows)=>{        
        if(err) {return res.json(err)}
        else if(data.length === 0){return res.status(401).json("Пользователь с таким номером телефона не найден")}
        else {
            let isValidPas = await bcrypt.compare(req.body.password, data[0].pass)
            if(!isValidPas){return res.status(401).json("Введен неверный пароль")}

            let {pass, phone, checkpoints, login, ...dataToUser} = data[0]
            //console.log(dataToUser)
            let token = jwt.sign(dataToUser, process.env.SECRET_KEY, {expiresIn: '12h'})
            dataToUser.token = token
            //console.log(dataToUser)
            db.query("UPDATE tokens SET token = ? WHERE user_id=?", [token, dataToUser.id], (err, result)=>{
                if(err) return res.status(401).json(err.sqlMessage)
                //console.log(err)//--------------------------------------------------ВАЩЕ НЕ ПОНЯЛ ЧТО ТУТ БЫЛО----------------)))))
                //console.log(result)
                else if(result.changedRows == 0){
                    db.query("insert into tokens(user_id, token) values(?, ?)", [dataToUser.id, token])
                }
                return res.status(200).json(dataToUser)
            })
        }
    })
    
})

app.post("/rili_api/check_page", token_verifyer, (req, res)=>{
    return res.status(200).json({
        respond: "Page checked"
    })
})

app.post("/rili_api/:role/:id", token_verifyer, (req, res)=>{
    if(!isNaN(req.params.id)){
        db.query("select*from users where user_id = ?", [parseInt(req.params.id)], (err, data)=>{
            if(err) return res.json(err)
            if(data.length === 0) return res.status(401).json("Что-то пошло не так, попробуйте авторизоваться заново")
            let {pass, phone, ...dataToTeacher} = data[0]
            return res.status(200).json(dataToTeacher)
        })
    }
})

app.post("/rili_api/search_for_checkpoints", token_verifyer, async(req,res)=>{
    //console.log(req.body)
    db.query("SELECT * FROM students WHERE name LIKE ? OR surname LIKE ? OR patronymic LIKE ? OR graduation = ? OR email LIKE ? OR phone LIKE ?", [req.body.search + '%', req.body.search + '%', req.body.search + '%', req.body.search, req.body.search + '%', req.body.search + '%'], (err, data)=>{
        if(err) return res.status(400).json({"error": err})
        if(data.length === 0) return res.status(200).json({"respond": "Такого ученика нету. Убедитесь в правильности поиского запроса"})
        return res.status(200).json(data)
    })
})

app.post("/rili_api/search_for_admins", token_verifyer, async(req, res)=>{
    db.query(
        "SELECT * FROM parent_student RIGHT JOIN students ON parent_student.studentx_id = students.id_student RIGHT JOIN parents ON parents.id = parent_student.parent_id WHERE students.name LIKE ? OR students.surname LIKE ? OR students.patronymic LIKE ? OR students.graduation = ? OR students.email LIKE ? OR students.phone LIKE ?", [req.body.search + '%', req.body.search + '%', req.body.search + '%', req.body.search, req.body.search + '%', req.body.search + '%'],
        (err, data) => {
            if(err){
                return res.status(400).json({"error": err})
            } 
            else if(data.length === 0){
                db.query(
                    "select*from students WHERE name LIKE ? OR surname LIKE ? OR patronymic LIKE ? OR graduation = ? OR email LIKE ? OR phone LIKE ?",
                    [req.body.search + '%', req.body.search + '%', req.body.search + '%', req.body.search, req.body.search + '%', req.body.search + '%'],
                    (err, data)=>{
                        if(err) {
                            console.log("Error na 120")
                            return res.status(400).json({"where": "sql to students", "err": err})
                        }
                        else if(data.length === 0){
                            console.log("Error na 124")
                            return res.status(200).json({"respond": "Такого ученика нету. Убедитесь в правильности поиского запроса"})
                        }
                        else{
                            console.log("Mi na 127") 
                            return res.status(200).json(data)
                        }
                        
                    } 
                )
            } 
            else {
                // console.log("Error na 125")
                // return res.status(200).json({"respond": "Ничего не нашлось. Убедитесь в правильности поиского запроса"})
                console.log("Error na 127") 
                return res.status(200).json(data)
            }
            
    })
})


app.get("/rili_api/change_checkpoints/:id/:chekpoints", token_verifyer, async(req, res)=>{
    db.query("UPDATE students SET checkpoints=? WHERE id_student=?", [req.params.chekpoints, req.params.id], (err, data)=>{
        if(err) return res.status(304).json({err: "не вышло изменить баллы"})
        return res.status(200).json({response: req.params.id+" обновлен"})
    })
})

app.get("/rili_api/show_vospit_info/:student_id",
    token_verifyer,
    (req, res)=>{
        db.query(
            "SELECT*FROM vospit_student RIGHT JOIN vospits ON vospit_student.vospit_id = vospits.vospit_id WHERE vospit_student.student_id = ?",
            [req.params.student_id],
            (err, data)=>{
                if(err){
                    return res.status(200).json({"respond": err})
                }
                else if(data.length === 0){
                    return res.status(200).json({"respond": "Ничего не найдено. Проверьте правильность ввода"})
                }
                else{
                    return res.status(200).json(data)
                }
            }
        )
    }
    )

    app.get("/rili_api/show_classruk_info/:student_id",
    token_verifyer,
    (req, res)=>{
        db.query(
            "SELECT*FROM klruk_student RIGHT JOIN klruk ON klruk_student.klruk_id = klruk.klruk_id WHERE klruk_student.student_id = ?",
            [req.params.student_id],
            (err, data)=>{
                if(err){
                    return res.status(200).json({"respond": err})
                }
                else if(data.length === 0){
                    return res.status(200).json({"respond": "Ничего не найдено. Проверьте правильность ввода"})
                }
                else{
                    return res.status(200).json(data)
                }
            }
        )
    }
    )


app.listen(process.env.PORT, ()=>{
    console.log(`Server runs on port ${process.env.PORT}`)
})