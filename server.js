// Import necessary modules

const express = require("express");

const cors = require("cors");

const cookieSession = require("cookie-session");

 

const app = express();

//const app = express();

//app.use(...);

 

 

const db = require("./app/models");

//const db = require("./app/models");

const Role = db.role;

// Connect to the MongoDB database using Mongoose

db.mongoose

  .connect(db.url, {

    useNewUrlParser: true,

    useUnifiedTopology: true

  })

 

   //.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {

    //useNewUrlParser: true,

    //useUnifiedTopology: true

  //})

  .then(() => {

    console.log("Connected to the database!");

  })

  .catch(err => {

    console.log("Cannot connect to the database!", err);

    process.exit();

  });

 // Initialize roles in the database


function initial() {

  Role.estimatedDocumentCount((err, count) => {

    if (!err && count === 0) {

      new Role({

        name: "user"

      }).save(err => {

        if (err) {

          console.log("error", err);

        }

 

        console.log("added 'user' to roles collection");

      });

 

      new Role({

        name: "moderator"

      }).save(err => {

        if (err) {

          console.log("error", err);

        }

 

        console.log("added 'moderator' to roles collection");

      });

 

      new Role({

        name: "admin"

      }).save(err => {

        if (err) {

          console.log("error", err);

        }

 

        console.log("added 'admin' to roles collection");

      });

    }

  });

}

 

var corsOptions = {
  credentials: true,
  //origin: "http://localhost:8081"
  origin: "https://frabjous-mermaid-38f8a7.netlify.app"
};

 

app.use(cors(corsOptions));

 

// parse requests of content-type - application/json

app.use(express.json());

 

// parse requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));

 
// Add cookie-session middleware for session management

app.use(

  cookieSession({

    name: "LibBookPro-session",

    secret: "COOKIE_SECRET", // should use as secret environment variable

    httpOnly: true

  })

);

 

// simple route

app.get("/", (req, res) => {

  res.json({ message: "Welcome to LibBookPro application." });

});

 

require('./app/routes/auth.routes')(app);

require('./app/routes/user.routes')(app);

require("./app/routes/library.routes")(app);

require("./app/routes/category.routes")(app);

 

// set port, listen for requests

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}.`);

});

 