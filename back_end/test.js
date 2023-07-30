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
// bcrypt.hash('248f', 3).then(hash=>{
//     console.log(hash)
//     //validateUser(hash)
// })


// function validateUser(hash){
//     bcrypt.compare('248f', hash).then( isvalid=> console.log(isvalid) )
// }
// validateUser("$2b$04$ohz76nYPgt.Npyt7abWQceMivA4irG5Zh17RWK4Syv3YlsrEvMH/q")
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ilfat1991',
    database: 'rili_meta'
  })
  // let q = "select*from teachers INNER JOIN tokens USING(teacher_id) where teacher_id=?"
  // let q1 = "update tokens set token=? where id_tokens=?"
  // db.query(q1, ["12345", 2],(err, data)=>{
  //   try {
  //       if(err) throw "Error on top"
  //       console.log(data.changedRows)
  //   } catch (error) {
  //       console.log("Error:", error)
  //   }
    
  //   // let {pass, ...dataTo} = data[0]
  //   // console.log(dataTo)
  //   //console.log(data)
  // })
  let param = '7В'
  db.query("SELECT * FROM students WHERE name LIKE ? OR surname LIKE ? OR patronymic LIKE ? OR graduation = ? OR email LIKE ? OR phone =  ?", [param+ '%', param+ '%', param+ '%',param,param+ '%',param ], (err, data)=>{
      if(err) console.log(err)
      console.log(data) 
  })


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