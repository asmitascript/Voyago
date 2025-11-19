const User = require("../models/user.js");


//signUpPage
module.exports.signUp = (req, res)=>{
    res.render("users/signup.ejs");
};

//post signUp
module.exports.postSignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({ email, username });

        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) throw err;
            req.flash("success", "Welcome to Voyago!");
            res.redirect("/listings");
        });

    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}; 


//logIn page
module.exports.login = (req, res)=>{
    res.render("users/login.ejs");
};

//post LogIn
module.exports.postLogIn = (req, res) => {
    req.flash("success", "Welcome back to Voyago!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

//logout
module.exports.logOut = (req, res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are successfully LoggedOut");
        res.redirect("/listings");
    })
};