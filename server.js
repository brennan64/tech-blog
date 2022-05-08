const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
// calling express to use sess information
app.use(session(sess));

// Inform Express.js on which template engine to use
// middleware for handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// send information as json obj
app.use(express.json());
// allows u to use urelconded data
app.use(express.urlencoded({ extended: true }));
// tells app to use  file in public
// or tells app to join everything in public
// ?
app.use(express.static(path.join(__dirname, "public")));
//tells app to use routes folder
app.use(routes);

// initializes sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at localhost: ${PORT}`));
});
