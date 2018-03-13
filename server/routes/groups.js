const express = require("express");
const Group = require("../models/groupsModel");
const parseErrors = require("../utils/parseErrors");

const router = express.Router();

router.get("/", (req, res) => {
    Group.find().then(groups => res.json({ groups }));
});

router.post("/update-groups", (req,res) => {
    const {groups} = req.body
    Group.remove({}).then(() => {
        console.log("removed");
    } )
    groups.map(updGroup => {
        let group = new Group({
            name: updGroup.name,
            tasks: updGroup.tasks
        })
        group.save()
    })
    res.sendStatus(200);
})

router.post("/update-tasks", (req, res) => {
    // console.log(req.body)
    const {name, tasks} = req.body.newTask
    Group.findOneAndUpdate({name: name}, { $set: { tasks: tasks }}, {new: true}).then(updTask => {
        const object = {
            name: updTask.name,
            tasks: updTask.tasks
        }
        res.json({
            task: object
        });
    });
});
router.post("/new-group", (req, res) => {
    console.log(req.body)
    const {name, tasks} = req.body.group
    const group = new Group({
        name,
        tasks
    });
    group.save()
    .then(groupRecord => {
        res.json({
            group: groupRecord
        })
    })
    .catch(err => res.status(400).json({
        errors: parseErrors(err.errors)
    }));
});

module.exports = router;