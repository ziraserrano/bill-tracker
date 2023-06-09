const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'billsData'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
.then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (req, res) => {
    db.collection('bills').find().toArray()
    .then( data => {
        res.render('index.ejs', { info: data})
    })
    .catch( error => console.error(error))
})

app.post('/addBill', (req, res) => {
    db.collection('bills').insertOne({ billName: req.body.billName, billAmount: req.body.billAmount})
    .then(result => {
        res.redirect('/')
    })
    .catch(error => console.error(error))
})



app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})