const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        groupId: {type: String, required: true},
        groupIndex: {type: String, required: true},
        tasks: [{
            description: {type: String},
            title: {type: String, required: true},
            taskId: {type: String, required: true}
        }]
    },
    { timestamps: true }
  );

module.exports = mongoose.model("Group", schema);