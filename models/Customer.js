var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  id: String,
  fname: String,
  lname: String,
  dob: String,
  email: String,
  add: String,
  updated_date: {type: Date, default: Date.now},
});
/**
 * @class Customer
 * @typeof Model<BookSchema>
 */
const Customer = mongoose.model('details',CustomerSchema);
module.exports = Customer;
