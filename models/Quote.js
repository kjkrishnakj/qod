const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    title: { type: String},
    author: { type: String, required: true },
    descr: { type: String, required: true },
    tags: { type: String },
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("Quotes", QuoteSchema);
