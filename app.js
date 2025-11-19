if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const localStategy = require("passport-local");

const multer = require("multer");
const { storage } = require("./cloudConfig.js"); // the file we just created
const upload = multer({ storage });


const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const adminRouter = require("./routes/admin.js");

const dbURL = process.env.ATLASDB_URL;


main()
    .then(()=>{
        console.log("conneted to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main() {    
    await mongoose.connect(dbURL);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: {
        secret: process.env.SECRET_KEY,
    },
    touchAfter: 24 * 60 * 60,
});

store.on("error", (req, res)=> { console.log("Err in Mongo session store: ")})
const sessionOption = {
    store,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 *1000,
        maxAge: 7 * 24 * 60 *60 * 1000,
        httpOnly: true
    }
}


app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/admin", adminRouter);


app.use((req, res) => {
    res.status(404).render("undefined/sample", {
        message: "Oops! Looks like this page went on vacation."
    });
});



app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    res.status(statusCode).send(message);
});

app.listen(8080, ()=>{
    console.log("server is listening to port");
});