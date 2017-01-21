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
  let champ       = [],
      searchname  = req.params.name.toLowerCase();
  //want to check the database for user =
  Summoner.findOne({name: searchname}, (err, summon)=>{
    if(err){
      console.log(err)
    }
    console.log(summon);
    console.log('=====');
    champ = summon
  /// want to check and pull
  if(!summon){
    //request-promise
    request({
      uri: `https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${searchname}`,
      qs: {
        api_key: secret.key
      },
      json: true
    })
      .then((data) => {
        let record = new Summoner({
          summonerId: data[searchname].id,
          name: data[searchname].name.toLowerCase(),
          profileIconId: data[searchname].profileIconId,
          revisionDate: data[searchname].revisionDate,
          summonerLevel: data[searchname].summonerLevel
        })
        console.log('JSON CALL HERE')
        record.save();
        champ = record
      })
      .catch((err) => {
        console.log(err)
        res.send(err)
      })
  }
})

setTimeout((x)=>{
  console.log("then")
  res.render('summoner',{
    summon: champ
  })

}, 1500)

})


//Setup Port
app.listen(port, (err)=>{
  if(err){
    console.log('Listening to Port error')
  }
    console.log(`Now Listening on Port: ${port}`)
})
