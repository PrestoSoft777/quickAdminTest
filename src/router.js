const Router = require('express').Router();
const User = require('./user');
const passport = require('passport');

const logged = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

Router.route('/')
    .get((req, res) => {
        res.render('login');
    })
    .post(passport.authenticate('local',
	{
            successRedirect: '/userlist',
            failureRedirect: '/'
	}))
;

Router.route('/logout')
    .get((req, res) => {
        req.logout();
	res.redirect('/');
    })
;

Router.route('/userlist')
    .get(logged, (req, res) => {
	User.find({}, (err, user) => {
	    if(err) {
		console.log(err);
	    } else {
		res.render('userlist', { user:user });
	    }
	})
    })
;

Router.route('userlist/:id')
    .delete(logged, (req, res) => {
	User.findByIdAndRemove(req.params.id, (err) => {
            if(err) {
		res.redirect('/');
	    } else {
		res.redirect('/');
            }
	});
    });

module.exports = Router;
