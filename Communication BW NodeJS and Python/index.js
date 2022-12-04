const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 8812

app.get('/script1/:fname/:lname', (req, res)=>{
    let data1;
    const pythonOne = spawn('python', ['script1.py', req.params.fname, req.params.lname])
    pythonOne.stdout.on('data', function(data){
        data1 = data.toString()
    })

    pythonOne.on('close', (code)=>{
        console.log('Code: ', code);
        res.send(data1)

    })
})

app.listen(port, ()=>console.log(`Listening on port ${port}`))