const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    linkedIn: {
      type: String,
    },
  });
  
module.exports = mongoose.model("contactSchema", contactSchema);