
var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	DeviceId: { type: String},
	DeviceType: { type: String},
	Timestamp: { type: String},
	location: { type: String }
  }, { collection : 'product' });

var product = mongoose.model('product', productSchema);

module.exports = product;