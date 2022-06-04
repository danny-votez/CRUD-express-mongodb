const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    articleID : {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Article = mongoose.model('Article', ArticleSchema);

// Update

module.exports = Article;