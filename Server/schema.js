const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
    seriesname: String,
    seasons: Number,
    ratingbefore: Number,
    ratingafter: Number,
    Image: String
});
const Model = mongoose.model("serieswithworstendings", testSchema);
module.exports = {Model};