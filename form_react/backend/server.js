import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Hello World')
})

app.listen(3000)