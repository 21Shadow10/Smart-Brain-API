const express = require('express') ;
const bodyParser = require('body-parser') ;
const bcrypt = require('bcrypt-nodejs') ;
const cors = require('cors') ;

const app = express() ;

app.use(bodyParser.json());
app.use(cors());

const databases = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req,res) => {
    res.send(databases.users) ;
})

app.post('/signin' , (req,res) => {

    let hash = '$2a$10$LX3Spv3wbh8M.LX3DqeaC.v9ir.YalTI1D62yb2qx.c2tVHef8xO2' ;
    //Load hash from your password DB.
    bcrypt.compare("pie", hash, function(err, res) {
        //console.log("first guess ", res) ;
    });
    bcrypt.compare("apples", hash, function(err, res) {
        //console.log("second guess ", res) ;
    });

    if(req.body.email === databases.users[0].email && req.body.password === databases.users[0].password)
    {
        res.json(databases.users[0]) ;
    }
    else{
        res.status(400).json("error logging in") ;
    }
    
})

app.post('/register' , (req,res) => {
    const { name, email, password } = req.body ;

    bcrypt.hash(password, null, null, function(err, hash) {
        //console.log(hash) ;
    });

    databases.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    }) ;

    res.json(databases.users[databases.users.length-1]) ;
})

app.get('/profile/:id' , (req,res) => {
    const { id } = req.params ;
    let found = false ;

    databases.users.forEach(user => {
        if(user.id === id){
            found=true ;
            return res.json(user) ;
        }
    })

    if(!found)
    {
        res.status(404).json("not found") ;
    }
})

app.put('/image', (req,res) => {
    const { id } = req.body ;
    //console.log(id + 'got it') ;
    let found = false ;

    databases.users.forEach(user => {
        if(user.id === id){
            found=true ;
            user.entries++ ;
            return res.json(user.entries) ;
        }
    })

    if(!found)
    {
        res.status(404).json("not found") ;
    }
})





app.listen(3000, ()=>{
    console.log("running") ;
})