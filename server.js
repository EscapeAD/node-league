const express         = require('express'),
      bodyParser      = require('body-parser'),
      mongoose        = require('mongoose'),
      request         = require('request-promise'),
      secret          = require('./secret'),
      Summoner        = require('./model/summoner'),
      app             = express(),
      path            = require('path'),
      port            = 3000;

//view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//db
mongoose.connect(secret.mlab);

//route
app.get('/', (req, res)=>{
  res.render('index')
})

app.get('/summoner/:name', (req, res)=>{
  let summoner = []
  //want to check the database for user =
  Summoner.find({name: req.params.name}, (err, summon)=>{
    if(err){
      console.log('hi')
    }
    if(summoner.length === 0){
      console.log('Check it')
    }
  })
  //request-promise
  request({
    uri: `https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${req.params.name}`,
    qs: {
      api_key: secret.key
    },
    json: true
  })
    .then((data) => {
      res.render('summoner', {
          summon: data,
          name: req.params.name
      })
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })





})


//Setup Port
app.listen(port, (err)=>{
  if(err){
    console.log('Listening to Port error')
  }
    console.log(`Now Listening on Port: ${port}`)
})
