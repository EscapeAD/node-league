const express         = require('express'),
      bodyParser      = require('body-parser'),
      mongoose        = require('mongoose'),
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

//Setup Port
app.listen(port, (err)=>{
  if(err){
    console.log('Listening to Port error')
  }
    console.log(`Now Listening on Port: ${port}`)
})
