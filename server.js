const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const activityRoutes = require('./routes/activity');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/timeTracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

app.use('/api/activity', activityRoutes);

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
