module.exports = function(app, passport) {
    app.get('/', function(req, res){
        res.render('home.html');
    });

    app.get('/login', function(req, res){
        res.render('login.html', {message:req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/listing',
            failureRedirect: '/login',
            failureFlash: true
        }),
        function(req, res){
            if(req.body.remember){
                req.session.cookie.maxAge = 1000 * 60 * 3;
            }else{
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    app.get('/login', function(req, res){
        res.render('login.html', {message: req.flash('signupMessage')});
    });

    app.post('/login', passport.authenticate('local-signup', {
        successRedirect: '/listing',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, function(req, res){
        res.render('profile.html', {
            user:req.user
        });
    });

    app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
    })
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();

    res.redirect('/');
}