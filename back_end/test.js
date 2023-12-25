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

// function validateUser(hash){
//     bcrypt.compare('123', hash).then( isvalid=> console.log(isvalid) )
// }
// validateUser("$2b$04$uy5FWXTyu4U8hxwD984UHeSG41feYCx6LF0Ws9.FU9vsoshj.13iS")

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'ilfat1991',
//     database: 'rili_db'
//   })
  
  // let param = '7В'
  // db.query("SELECT * FROM students WHERE name LIKE ? OR surname LIKE ? OR patronymic LIKE ? OR graduation = ? OR email LIKE ? OR phone =  ?", [param+ '%', param+ '%', param+ '%',param,param+ '%',param ], (err, data)=>{
  //     if(err) console.log(err)
  //     console.log(data) 
  // })

//   const searchValue = "7а"
//   db.query("SELECT * FROM students LEFT JOIN users ON students.ruk_id = users.user_id RIGHT JOIN vospits ON students.vosp_id = vospits.vospit_id WHERE students.name LIKE ? OR students.surname LIKE ? OR students.patronymic LIKE ? OR students.graduation = ? OR students.email LIKE ? OR students.phone LIKE ?", [searchValue, searchValue, searchValue, searchValue, searchValue, searchValue], (err, result)=>{
//     if(err) console.log(err)
//     console.log(result)//------------------------------------МЕНЯЙ НАЗВАНИЯ В БД У УЧИТЕЛЕЙ И ВОСПИТОВ--------------------------------------------
//   })

// db.end()
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



const obj = 
  [
    {
        "id": 1,
        "parent_id": 1,
        "studentx_id": 1,
        "id_student": 1,
        "name": "Агзам",
        "surname": "Вильданов",
        "patronymic": "Римович",
        "graduation": "7А",
        "email": "agzam@mail.ru",
        "phone": "+79234567890",
        "checkpoints": 139,
        "snils": "123-345-678 22",
        "birth_day": "21.10.2009",
        "gender": "мальчик",
        "adress": "Уфа, ул. Свободы, д16,кв29 ",
        "room": 123,
        "violations": null,
        "date_of_enroll": "21.10.2009",
        "enroll_order_num": 234,
        "family_length": 3,
        "parent_name": "Вильданова Айсылу Минигалеевна",
        "parent_role": "мать ",
        "job": "менеджер по продажам",
        "job_place": "ООО Восток-Сервис",
        "parent_phone": "+79235697884",
        "parent_email": "vildanova@ya.ru"
    },
    {
        "id": 2,
        "parent_id": 2,
        "studentx_id": 4,
        "id_student": 4,
        "name": "Шамиль",
        "surname": "Давлетханов",
        "patronymic": "Ильдарович",
        "graduation": "7А",
        "email": "shamil@ya.ru",
        "phone": "+78432356161",
        "checkpoints": 125,
        "snils": "123-345-678 25",
        "birth_day": "21.10.2010",
        "gender": "мальчик",
        "adress": "Уфа, ул. Свободы, д16,кв29 ",
        "room": 301,
        "violations": null,
        "date_of_enroll": "21.10.2010",
        "enroll_order_num": 234,
        "family_length": 2,
        "parent_name": "Давлетханов Ильдар Маратович",
        "parent_role": "отец",
        "job": "руководитель цеха",
        "job_place": "Газпром",
        "parent_phone": "+79632587414",
        "parent_email": "davlet@ya.ru"
    },
    {
        "id": 3,
        "parent_id": 3,
        "studentx_id": 5,
        "id_student": 5,
        "name": "Батыр",
        "surname": "Шамигулов",
        "patronymic": "Галиянович",
        "graduation": "7А",
        "email": "batyr@mail.ru",
        "phone": "+79362334589",
        "checkpoints": 100,
        "snils": "123-345-678 26",
        "birth_day": "26.11.2011",
        "gender": "мальчик",
        "adress": "Уфа, ул. Свободы, д16,кв29 ",
        "room": 410,
        "violations": 1,
        "date_of_enroll": "26.11.2011",
        "enroll_order_num": 234,
        "family_length": 3,
        "parent_name": "Шамигулова Альфия Ринатовна",
        "parent_role": "мать",
        "job": "лаборант",
        "job_place": "Роснефть",
        "parent_phone": "+79277597898",
        "parent_email": "shamig@ya.ru"
    },
    {
        "id": 4,
        "parent_id": 4,
        "studentx_id": 1,
        "id_student": 1,
        "name": "Агзам",
        "surname": "Вильданов",
        "patronymic": "Римович",
        "graduation": "7А",
        "email": "agzam@mail.ru",
        "phone": "+79234567890",
        "checkpoints": 139,
        "snils": "123-345-678 22",
        "birth_day": "21.10.2009",
        "gender": "мальчик",
        "adress": "Уфа, ул. Свободы, д16,кв29 ",
        "room": 123,
        "violations": null,
        "date_of_enroll": "21.10.2009",
        "enroll_order_num": 234,
        "family_length": 3,
        "parent_name": "Вильданов Роберт Ильфатович",
        "parent_role": "отец",
        "job": "специалист укладчик",
        "job_place": "ООО \"Парус\"",
        "parent_phone": "+79456219021",
        "parent_email": "vild_parus@gmail.com"
    }
]



const arr = []


for (z of obj){
  let newObj = {}
  let existingObj = arr.find((person)=> person.snils === z['snils'])
  //console.log(existingObj)
  if(existingObj!==undefined){
    existingObj.famyly.push(
      {
        parent_id: z['parent_id'],
        parent_name: z['parent_name'],
        parent_role: z['parent_role'],
        job: z['job'],
        job_place: z['job_place'],
        parent_phone: z['parent_phone'],
        parent_email: z['parent_email']
      }
    )
  } else {
    newObj.id_student =  z['id_student']
    newObj.name = z['name']
    newObj.surname = z['surname']
    newObj.patronymic = z['patronymic']
    newObj.graduation = z['graduation']
    newObj.email = z['email']
    newObj.phone = z['phone']
    newObj.checkpoints = z['checkpoints']
    newObj.snils = z['snils']
    newObj.birth_day = z['birth_day']
    newObj.gender = z['gender']
    newObj.adress = z['adress']
    newObj.room =z['room']
    newObj.violations = z['violations']
    newObj.date_of_enroll = z['date_of_enroll']
    newObj.enroll_order_num = z['enroll_order_num']
    newObj.family_length = z['family_length']
    newObj.famyly = [{
      parent_id: z['parent_id'],
      parent_name: z['parent_name'],
      parent_role: z['parent_role'],
      job: z['job'],
      job_place: z['job_place'],
      parent_phone: z['parent_phone'],
      parent_email: z['parent_email']
    }]
    arr.push(newObj)
  }
}



