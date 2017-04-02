/**
 * Created by LQG on 2017/3/30.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BanerSchema = new Schema({
  banerUrl: String
});

mongoose.model("Baner", BanerSchema);