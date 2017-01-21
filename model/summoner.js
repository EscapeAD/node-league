const mongoose = require('mongoose');

const summonerSchema = new mongoose.Schema({
  summonerId: Number,
  name: String,
  profileIconId: Number,
  revisionDate: Number,
  summonerLevel: Number
})

module.exports = mongoose.model('Summoner', summonerSchema);
