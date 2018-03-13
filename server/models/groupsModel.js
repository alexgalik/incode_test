const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        tasks: [{
            description: {type: String},
            title: {type: String, required: true}
        }]
    },
    { timestamps: true }
  );

module.exports = mongoose.model("Group", schema);