var mongoose = require ("mongoose")
    , Schema = mongoose.Schema;



var guestSchema = mongoose.Schema({
	first_name : String,
	last_name : String,
	company : [String],
    badge_type: String,
	is_us_citizen: {type: Boolean, default: false},
	meeting_with: {type: Schema.Types.ObjectId, ref: 'Employee'},
	checkin_time: {type: Date, default: Date.now },
    checkout_time: {type: Date, default: null}

});
 
mongoose.model('Guest', guestSchema);

