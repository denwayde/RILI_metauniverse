const bcrypt = require('bcrypt')
const mysql = require('mysql2')
const jwt = require("jsonwebtoken")
// async function returnhash(){
//    let hashedPas =  await bcrypt.hash('password', 3)
//    return hashedPas
// }
// let hashedPas = bcrypt.hash('password', 3)

//marat rajapovich: 123 -  $2b$04$O44LT5oKEP0LceqR9XQC3OsJP3Rf0NXk9eDi7tzdw.q/X8SfR1uBe
//zagir ramilevich: 567 - $2b$04$vzKgJxSs8vVaVU0YuDJGI.pwNJcrc92HErjXPDm/InswJ5C0Ypfwq
//dr: $04$KQoRVw5AvQdNGPNltLeaK.TlQ8b4bXEmL3pJl.WawMHwnOCGCWOtO
//director: 123d - $2b$04$XEouMPGMkA/.I4skf.l2O.OSgAHF0rh8kSeAsRU2ii/u6Nq/ufv3K
//rz: 123d - $2b$04$XEouMPGMkA/.I4skf.l2O.OSgAHF0rh8kSeAsRU2ii/u6Nq/ufv3K
// bcrypt.hash('123d', 3).then(hash=>{
//     console.log(hash)
//     //validateUser(hash)
// })
//

function validateUser(hash){
    bcrypt.compare('123', hash).then( isvalid=> console.log(isvalid) )
}
validateUser("$2b$04$uy5FWXTyu4U8hxwD984UHeSG41feYCx6LF0Ws9.FU9vsoshj.13iS")

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ilfat1991',
    database: 'rili_db'
  })
  
  // let param = '7В'
  // db.query("SELECT * FROM students WHERE name LIKE ? OR surname LIKE ? OR patronymic LIKE ? OR graduation = ? OR email LIKE ? OR phone =  ?", [param+ '%', param+ '%', param+ '%',param,param+ '%',param ], (err, data)=>{
  //     if(err) console.log(err)
  //     console.log(data) 
  // })


  // db.query("select*from users where phone = ?", "+79603927490", (err, result)=>{
  //   if(err) console.log(err)
  //   //console.log(result)
  //   let {pass, name, phone, checkpoints, full_name, login, ...dataToUser} = result[0]
  //   console.log(dataToUser)
  // })

db.end()
// const dotenv = require("dotenv").config()

// let token = jwt.sign({
//     teacher_id: 2,
//     name: 'Динис Рафикович',
//     phone: '+79603927490',
//     role: 'teacher',
//     checkpoints: 80,
//     supert: 3000
//   }, process.env.SECRET_KEY)
//   console.log(token)