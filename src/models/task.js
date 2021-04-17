const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const TaskScheme = new Scheme({
  title: String,
  description: String,
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("tasks", TaskScheme);
