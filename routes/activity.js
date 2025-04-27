const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

router.post('/', async (req, res) => {
    const { website, timeSpent } = req.body;
    let activity = await Activity.findOne({ website });

    if (activity) {
        activity.totalTime += timeSpent;
        activity.visitCount += 1;
        activity.timestamps.push(new Date());
    } else {
        activity = new Activity({
            website,
            totalTime: timeSpent,
            visitCount: 1,
            timestamps: [new Date()]
        });
    }

    await activity.save();
    res.send({ success: true });
});

router.get('/summary', async (req, res) => {
    const summary = await Activity.find({});
    res.send(summary);
});

module.exports = router;
