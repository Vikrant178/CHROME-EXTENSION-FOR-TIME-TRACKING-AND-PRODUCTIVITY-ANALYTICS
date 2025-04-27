const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    website: String,
    totalTime: Number,
    visitCount: Number,
    timestamps: [Date]
});

module.exports = mongoose.model('Activity', ActivitySchema);
