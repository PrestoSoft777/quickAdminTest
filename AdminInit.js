const Admin = require('./src/admin');
const passport = require('passport');

const AdminInit = () =>{
    Admin.register(new Admin({ username: 'root' }), 'password', (err, admin) => {
        if(err) {
            console.log(err);
    	    return res.redirect('/');
        }
        passport.authenticate('local')(req, res, () => {
	    res.redirect('/userlist');
        });
    });
}

module.exports = AdminInit;
