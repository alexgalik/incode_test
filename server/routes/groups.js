const express = require("express");
const Group = require("../models/groupsModel");
const parseErrors = require("../utils/parseErrors");

const router = express.Router();

router.get("/", (req, res) => {
    Group.find().then(groups => res.json({
        groups
    }));
});

router.post("/update-groups", (req, res) => {
    const {
        groups
    } = req.body
    let updGroups = []
    groups.map(group => {
        Group.findOneAndUpdate({
            groupId: group.groupId
        }, {
            $set: {
                groupIndex: group.groupIndex
            }
        }, {
            new: true
        }).then(updGroups => {
                return updGroups;
            }
        )
    })
    res.json({groups});
})

router.post("/update-tasks", (req, res) => {
    // console.log(req.body)
    const {
        groupId,
        tasks
    } = req.body.newTask
    Group.findOneAndUpdate({
        groupId: groupId
    }, {
        $set: {
            tasks: tasks
        }
    }, {
        new: true
    }).then(updTask => {
        const object = {
            groupId: updTask.groupId,
            tasks: updTask.tasks
        }
        res.json({
            task: object
        });
    });
});
router.post("/new-group", (req, res) => {
    const {
        name,
        tasks,
        groupId,
        groupIndex
    } = req.body.group
    const group = new Group({
        name,
        groupId,
        groupIndex,
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

router.post("/edit-group", (req, res) => {
    const {groupId, name} = req.body.group
    Group.findOneAndUpdate({
        groupId: groupId
    }, {
        $set: {
            name: name
        }
    }, {
        new: true
    }).then(updTask => {
        const object = {
            groupId: updTask.groupId,
            name: updTask.name
        }
        res.json({
            group: object
        });
    });
});

router.post("/delete-group", (req, res) => {
    const {groupId} = req.body
    Group.remove({groupId : groupId}).then(()=>res.json({groupId}))
    
})

module.exports = router;