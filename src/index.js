//firebase setup

import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs, doc, addDoc, deleteDoc, onSnapshot} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB-Z_9fdig1zoF2DdnaWqrm3Fr_uXZ-qcw",
    authDomain: "daxoppgave-31df7.firebaseapp.com",
    projectId: "daxoppgave-31df7",
    storageBucket: "daxoppgave-31df7.appspot.com",
    messagingSenderId: "635277128587",
    appId: "1:635277128587:web:a19b2e9e6283a12356f58e"
  };

  //init firebase
  initializeApp(firebaseConfig)

  // init services
  const db = getFirestore()
  // collection ref
  const colRef = collection(db,'testusers')

  // real time data
  var creds

  onSnapshot(colRef, (snapshot) => {
    let users = []
    snapshot.docs.forEach((doc) => {
        users.push({...doc.data(),id:doc.id})
    }); 
    creds = users
  })

// login
var password = document.querySelector('.password')
var username = document.querySelector('.user')
username.addEventListener('submit',e => {
    e.preventDefault()
})
password.addEventListener('submit',e => {
    e.preventDefault()
})

document.querySelector('.logbtn').addEventListener('click', () => {
    let validity = 'no'
    if(username.value != '' && password.value != ''){
        for(let i=0; i!=creds.length; i++){
            if(creds[i].password == password.value && creds[i].username == username.value){
                document.querySelector('.tit').innerHTML="Hvor langt kan du telle "+creds[i].username+"?"
                document.querySelector('.numsec').style.display='block'
                document.querySelector('.innlog').style.display='none'
                document.querySelector('.new').style.display='none' 
                validity = 'yes'
            }
        }
        if(validity = 'no'){
            username.placeholder='feil brukernavn'
            password.placeholder='eller passord'
            username.value=''
            password.value=''
        }
    }
})

// ny bruker

let nybruker = document.querySelector('.new')
let log = document.querySelector('.log')

nybruker.addEventListener('click', e => {
    document.querySelector('.innlog').style.display='none'
    document.querySelector('.new').style.display='none'
    document.querySelector('.nybruker').style.display='block'
    document.querySelector('.log').style.display='block'
});

log.addEventListener('click', e => {
    document.querySelector('.innlog').style.display='block'
    document.querySelector('.new').style.display='block'
    document.querySelector('.nybruker').style.display='none'
    document.querySelector('.log').style.display='none'
})

let newUsername = document.querySelector('.NEWuser')
let newPassword = document.querySelector('.NEWpassword')

document.querySelector('.NEWuserBTN').addEventListener('click', e => {
    let validity = 'yes'
    if(newUsername != '' && newPassword != ''){
        for(let i=0; i!= creds.length;i++){
            if(newUsername.value == creds[i].username){
                newUsername.placeholder='username is taken'
                newPassword.value=''
                newUsername.value=''
                validity = 'no'
            }
        }
    }
    if(validity == 'yes'){
        addDoc(colRef, {
            username: newUsername.value,
            password: newPassword.value
        }).then(() => {
            newPassword.value=''
            newUsername.value=''
            document.querySelector('.innlog').style.display='block'
            document.querySelector('.new').style.display='block'
            document.querySelector('.nybruker').style.display='none'
            document.querySelector('.log').style.display='none'
        })
    }
})
// tall data
const countref = collection(db, 'counter')
var changenum = undefined
onSnapshot(countref, (snapshot) => {
  var countnum = []
  changenum = countnum
  snapshot.docs.forEach((doc) => {
      countnum.push({...doc.data(),id:doc.id})
  }); 
  document.querySelector('.num').innerHTML=countnum[0].number
})
// telle-spill 


document.getElementById('plus').addEventListener('click' , () => {
    addDoc(countref,{
        number:changenum[0].number+1
    })
    deleteDoc(doc(db,'counter',changenum[0].id))
    })


document.getElementById('minus').addEventListener('click' , () => {
    addDoc(countref,{
        number:changenum[0].number-1
    })
    deleteDoc(doc(db,'counter',changenum[0].id))
})



//document.querySelector('.tit').style.display='block' fra display none til hva man vil