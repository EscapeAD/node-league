const express         = require('express'),
      bodyParser      = require('body-parser'),
      mongoose        = require('mongoose'),
      request         = require('request-promise'),
      app             = express(),
      path            = require('path'),
      port            = 3000;

//view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//route

app.get('/', (req, res)=>{
  res.render('index')
})

app.get('/summoner/:name', (req, res)=>{
  //request-promise
  request({
    uri: `https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${req.params.name}`,
    qs: {
      api_key: ''
         // Use your accuweather API key here
    },
    json: true
  })
    .then((data) => {
      res.send('index', data)
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
