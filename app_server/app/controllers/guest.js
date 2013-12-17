var mongoose = require('mongoose')
    , Guest = mongoose.model('Guest')
    , Schema = mongoose.Schema;

exports.getAllGuests = function(req, res){
	
	Guest.find(function (err, guests) {
		if (err){
			console.log('Had Error of:  ' + err);
		}else{ 
			console.log('GUEST LIST: ' + guests)
			res.send(guests);

		}
	});
};

exports.getCheckedInGuests = function(req, res){

    Guest.find({'checkout_time': null}).populate('meeting_with').exec(function (err, guests)
    {
        if (err){
            console.log('Had Error of:  ' + err);
        }else{
            console.log('GUEST LIST: ' + guests)
            res.send(guests);

        }
    });
};

exports.getCheckedOutGuests = function(req, res){

    Guest.find(function (err, guests) {
        if (err){
            console.log('Had Error of:  ' + err);
        }else{
            console.log('GUEST LIST: ' + guests)
            res.send(guests);

        }
    });
};

exports.findById = function(req, res){
	
	var id = req.params.id;

    //leveraging mongooses populate functionality to populate the employee object
    //for the meeting_with attribute for guest.  Pretty Coooooll!!:)
    Guest.findById(id).populate('meeting_with').exec(function(err, guest){
            if(err) { return console.log('ERRROR: ' +err);
        }
        console.log(guest);
        res.send(guest);
    });
}


exports.saveguest = function(req, res){

	var fName = req.first_name
	, lName = req.last_name
	, is_us_citizen = req.is_us_citizen;


	var newGuest = new Guest(req.body);

	newGuest.save(function(err, newGuest) {
		if (err) return console.error(err);
		console.dir(newGuest);
	});

	res.send(newGuest)

};

exports.delguest = function(req, res){

    var id = req.params.id
        , del_guest = {};
    console.log(id)

    Guest.findByIdAndRemove(id, function(guest){
        delguest = guest;
        res.send(del_guest);
    })

};

exports.updateguest = function(req, res){
    var updateInfo = req.body.update
        , id = req.body.id
        , updateStmt = {};


    var mwid = updateInfo.meeting_with._id;
    id = updateInfo._id;

    delete updateInfo._id;
    delete updateInfo.meeting_with._id;

    updateInfo.meeting_with = mwid;
    updateInfo.id = id

    console.log(req.body);

    Guest.findByIdAndUpdate(id, {$set: updateInfo}, function(data){
        console.log('DATA: ' + data);

    });


};

exports.changeBadgeType = function(req, res){
    var updateInfo = req.body.update
        , id = req.body.id
        , updateStmt = {};


    console.log(req.body);

    Guest.findByIdAndUpdate(id, {$set: updateInfo}, function(data){
        console.log('DATA: ' + data);

    });


};

exports.getbyname = function(req, res){

    console.log(req.body);
    var fname = req.body.first_name;
    var lname = req.body.last_name;
    var regex = new RegExp(fname, 'i');

    Guest.find({'last_name': lname})
        .where('first_name').equals(regex).exec(function(err, guests){

            if (err){
                console.log('Had Error of:  ' + err);
            }else{
                console.log('GUEST LIST: ' + guests)
                res.send(guests);

            }
        });

};

exports.signout = function(req, res){

    var id = req.body._id;

    console.log(req.body);
    console.log(id);

    Guest.findByIdAndUpdate(id, {$set: {checkout_time: new Date()}}, function(err, data){
        if(err){
            console.log(err);
            res.send('ERROR: ' + err);
        }

        console.log(data);
    });

    res.send('success');
};

