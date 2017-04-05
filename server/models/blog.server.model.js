/**
 * Created by LQG on 2017/4/5.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now()
  },
  updateDate: {
    type: Date,
    default: Date.now(),
  }
});

BlogSchema.pre("save", function (next) {
  next();
});

mongoose.model("Blog", BlogSchema);