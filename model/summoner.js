const mongoose = require('mongoose');

const summonerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  profileIconId: Number,
  revisionDate: Number,
  summonerLevel: Number
})

module.exports = mongoose.model('Summoner', summonerSchema);
