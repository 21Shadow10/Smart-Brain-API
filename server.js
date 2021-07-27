const express = require('express') ;
const bodyParser = require('body-parser') ;

const app = express() ;

app.use(bodyParser.json());

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
    if(req.body.email === databases.users[0].email && req.body.password === databases.users[0].password)
    {
        res.json("Success Sign In") ;
    }
    else{
        res.status(400).json("error logging in") ;
    }
})

app.post('/register' , (req,res) => {
    const { name, email, password } = req.body ;

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

app.post('/image', (req,res) => {
    const { id } = req.body ;
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