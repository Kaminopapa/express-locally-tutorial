var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var genreSchema= new Schema(
{
    name:{type: Schema.Types.String,required: true, maxLength:100,minLength:3}
}
);

//virtual for genere's url

genreSchema.virtual('url').get(function(){
    return '/catalog/genre/'+this._id;
});

//export model
module.exports=mongoose.model('Genre',genreSchema);