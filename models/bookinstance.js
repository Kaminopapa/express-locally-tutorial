/*The BookInstance represents a specific copy of a book that someone might borrow and includes information about whether the copy is available, 
on what date it is expected back, and "imprint" (or version) details. 
*/
const { DateTime } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    imprint: {type: String, required: true},
    /**
     * enum: This allows us to set the allowed values of a string
     * In this case, we use it to specify the availability status of our books (using an enum means that we can prevent mis-spellings and arbitrary values for our status).
     */
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    //we use default to set the default status for newly created bookinstances
    //to maintenance and the default due_back date to now
    due_back: {type: Date, default: Date.now}
  }
);

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});


//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
