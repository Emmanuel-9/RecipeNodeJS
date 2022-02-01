const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))


const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://manuel:.0751.62@cluster0.83mca.mongodb.net/quick-recipes?retryWrites=true&w=majority',{useUnifiedTopology: true}).then(client => {
        console.log('Connected to Database')
        const db = client.db('quick-recipes')
        const recipesCollection = db.collection('recipes')

        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())

        app.get('/', function(req, res) {
            db.collection('recipes').find().toArray()
            .then(results => {
                //console.log(results)
                // res.render('index.ejs', {recipes: results})
                res.status(200).json({
                    results: results
                })
              })
              .catch(error => console.error(error))
        })

        app.post('/recipes', (req, res) => {
            recipesCollection.insertOne(req.body)
            .then(results => {
                res.status(200).json({ results: results})
            })
            .catch(error => console.error(error))
        })

        app.put('/recipes', (req, res) => {
            recipesCollection.findOneAndUpdate(
                { name: 'Yoda' },
                {
                  $set: {
                    title: req.body.title,
                    Instructions: req.body.Instructions
                  }
                },{
                    upsert: true
                }
            ).then(results => {
                res.json({results: results})
            })
            .catch(error => console.error(error))
        })

        app.delete('/delete', (req, res) => {
            recipesCollection.deleteOne({ title: req.body.title })
            .then(result => {
                if(result.deletedCount === 0 ){
                    return res.json('No recipe to be deleted')
                }
                res.json('Delete Darth Vadar quote')
            })
            .catch(error => console.error(error))
        })
        
        app.listen(3000, function(){
            console.log('Listening on the port')
        })

      })
      .catch(error => console.error(error))






