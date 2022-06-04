const express = require('express')
const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose')

const dotenv = require("dotenv")

dotenv.config()

const ArticleModel = require('./article-schema')

const app = express()
app.use(express.json())

// allow use of body-parser
app.use(bodyParser.urlencoded({extended: true}))


const port = 4000;

// connecting to library database
// database link saved in .env file with variable MONGO
mongoose.connect(process.env.MONGO)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error: '));
db.on('open', () => {
    console.log('Yaay! We are connected!');
})


/*
TODO

app.get('/articles', (req, res) => {
    // Handling article information will be done via html file 
    res.sendFile('D:/MERN FamilyBank/CRUD-express-mongodb/index.html')})

*/

// CREATE - post method - Creating Articles, and storing them to database
app.post('/', async (req, res) => {
    
    // creating a new article collection    
    const newArticle = new ArticleModel(req.body)
    try {
        // get article info from user
        const savedArticle = await newArticle.save()
        res.status(200).json(savedArticle)

    }
    catch(err){
        res.status(500).json(err)
    }
})

// UPDATE - put method
// The updating will be based on article id, e.g., _id: ObjectId (629b6e92c28fc932d5b93f9c)

app.put('/:id', async (req, res) => {
       
    try {
        // get article info from user
        const updateArticle = await ArticleModel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(200).json(updateArticle)

    }
    catch(err){
        res.status(500).json(err)
    }
})

// DELETE - delete method
app.delete('/:id', async (req, res) => {
       
    try {
        // Nothing is returned after article deletion
        await ArticleModel.findByIdAndDelete(req.params.id)
        res.status(200).json("The article has been deleted from library")
    }
    catch(err){
        res.status(500).json(err)
    }
})

// READ - get method

// PART 1- Get one article by ID
app.get('/:id', async (req, res) => {
       
    try {
        // Nothing is returned after article deletion
        const singleArticle = await ArticleModel.findById(req.params.id)
        res.status(200).json(singleArticle)     // a single article is returned
    }
    catch(err){
        res.status(500).json(err)
    }
})

// PART 2 - Read/Get all articles
app.get('/', async (req, res) => {
       
    try {
        // Nothing is returned after article deletion
        const AllArticles = await ArticleModel.find()
        res.status(200).json(AllArticles)      // all articles are returned
    }
    catch(err){
        res.status(500).json(err)
    }
})

app.listen(port, () => {
    console.log(`Server working, listening on port ${port}`)
})