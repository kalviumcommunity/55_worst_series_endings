const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
    seriesname: String,
    seasons: Number,
    ratingbefore: Number,
    ratingafter: Number,
    image: String,
    createdby: String
});
const Model = mongoose.model("serieswithworstendings", testSchema);
module.exports = {Model};