// const express = require("express")
// const app = express()
// const path = require("path")
// const hbs = require("hbs")
// const collection = require("./mongodb")

// const templatePath = path.join(__dirname, '../templates')

// app.use(express.json())
// app.set("view engine", "hbs")
// app.set("views", templatePath)
// app.use(express.urlencoded({ extended: false }))

// app.get("/", (req, res) => {
//     res.render("login")
// })
// app.get("/signup", (req, res) => {
//     res.render("signup")
// })

// app.post("/signup", async (req, res) => {
//     const data = {
//         name: req.body.name,
//         password: req.body.password
//     }
//     await collection.insertMany([data])

//     res.render("home")
// })

// app.post("/login", async (req, res) => {

//     try {
//         const check = await collection.findOne({ name: req.body.name })

//         if (check.password === req.body.password) {
//             res.render("home")
//         }
//         else
//             res.send("wrong password")
//     }

//     catch {
//         res.send("wrong details")

//     }
// })

// app.listen(3000, () => {
//     console.log("port connecteddd");
// })

// const express = require("express")
// const session = require("express-session")
// const app = express()
// const path = require("path")
// const hbs = require("hbs")
// const collection = require("./mongodb")

// const templatePath = path.join(__dirname, '../templates')

// app.use(express.json())
// app.use(session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false
// }))
// app.set("view engine", "hbs")
// app.set("views", templatePath)
// app.use(express.urlencoded({ extended: false }))

// // Middleware pour vérifier si l'utilisateur est connecté
// const isAuthenticated = (req, res, next) => {
//     if (req.session && req.session.user) {
//         return next()
//     } else {
//         res.redirect("/")
//     }
// }

// app.get("/", (req, res) => {
//     res.render("login")
// })

// app.get("/signup", (req, res) => {
//     res.render("signup")
// })

// app.post("/signup", async (req, res) => {
//     const data = {
//         name: req.body.name,
//         password: req.body.password
//     }
//     await collection.insertMany([data])

//     res.render("home")
// })

// app.post("/login", async (req, res) => {
//     try {
//         const check = await collection.findOne({ name: req.body.name })

//         if (check.password === req.body.password) {
//             req.session.user = req.body.name
//             res.render("home")
//         } else {
//             res.send("wrong password")
//         }
//     } catch {
//         res.send("wrong details")
//     }
// })

// app.get("/logout", (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.redirect("/")
//         }
//     })
// })

// app.get("/home", isAuthenticated, (req, res) => {
//     res.render("home", { user: req.session.user })
// })

// app.listen(3000, () => {
//     console.log("port connecteddd");
// })



// const express = require("express");
// const session = require("express-session");
// const app = express();
// const path = require("path");
// const hbs = require("hbs");
// const collection = require("./mongodb");

// const templatePath = path.join(__dirname, "../templates");

// app.use(express.json());
// app.use(session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false
// }));
// app.set("view engine", "hbs");
// app.set("views", templatePath);
// app.use(express.urlencoded({ extended: false }));

// // Middleware pour vérifier si l'utilisateur est connecté
// const isAuthenticated = (req, res, next) => {
//     if (req.session && req.session.user) {
//         return next();
//     } else {
//         res.redirect("/");
//     }
// };

// app.get("/", (req, res) => {
//     res.render("login");
// });

// app.get("/signup", (req, res) => {
//     res.render("signup");
// });

// app.post("/signup", async (req, res) => {
//     const data = {
//         name: req.body.name,
//         password: req.body.password
//     };
//     await collection.insertMany([data]);

//     res.render("home");
// });

// app.post("/login", async (req, res) => {
//     try {
//         const check = await collection.findOne({ name: req.body.name });

//         if (check.password === req.body.password) {
//             req.session.user = req.body.name;
//             res.render("home");
//         } else {
//             res.send("wrong password");
//         }
//     } catch {
//         res.send("wrong details");
//     }
// });

// app.get("/logout", (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.redirect("/");
//         }
//     });
// });

// app.get("/home", isAuthenticated, (req, res) => {
//     res.render("home", { user: req.session.user });
// });

// app.get("/login", (req, res) => {
//     res.render("login");
// });

// app.listen(3000, () => {
//     console.log("port connecteddd");
// });


const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, "../templates");
// const publicPath = path.join(__dirname, "public");
const publicPath = path.join(__dirname, "../public");

app.use(express.json());
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false
}));

// Définition du répertoire statique pour les fichiers publics
// app.use(express.static(publicPath));
app.use("/public", express.static(publicPath));

// Middleware personnalisé pour définir le type MIME du fichier CSS
app.use((req, res, next) => {
    if (req.url.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
    }
    next();
});


app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

// Middleware pour vérifier si l'utilisateur est connecté
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect("/");
    }
};

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };
    await collection.insertMany([data]);

    res.render("home");
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });

        if (check.password === req.body.password) {
            req.session.user = req.body.name;
            res.render("home");
        } else {
            res.send("wrong password");
        }
    } catch {
        res.send("wrong details");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

app.get("/home", isAuthenticated, (req, res) => {
    res.render("home", { user: req.session.user });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.listen(3000, () => {
    console.log("port connecteddd");
});




// const express = require("express");
// const session = require("express-session");
// const app = express();
// const path = require("path");
// const hbs = require("hbs");
// const collection = require("./mongodb");

// const templatePath = path.join(__dirname, "../templates");

// app.use(express.json());
// app.use(session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false
// }));
// app.set("view ", "hbs");
// app.set("views", templatePath);
// app.use(express.urlencoded({ extended: false }));

// // Expression régulière pour la validation d'une adresse e-mail
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// // Middleware pour vérifier si l'utilisateur est connecté
// const isAuthenticated = (req, res, next) => {
//     if (req.session && req.session.user) {
//         return next();
//     } else {
//         res.redirect("/");
//     }
// };

// app.get("/", (req, res) => {
//     res.render("login");
// });

// app.get("/signup", (req, res) => {
//     res.render("signup");
// });

// app.post("/signup", async (req, res) => {
//     const data = {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     };

//     // Vérification de l'adresse e-mail avec l'expression régulière
//     if (!emailRegex.test(data.email)) {
//         res.send("Invalid email address");
//         return;
//     }

//     await collection.insertMany([data]);

//     res.render("home");
// });

// app.post("/login", async (req, res) => {
//     try {
//         const check = await collection.findOne({ name: req.body.name });

//         if (check.password === req.body.password) {
//             req.session.user = req.body.name;
//             res.render("home");
//         } else {
//             res.send("Wrong password");
//         }
//     } catch {
//         res.send("Wrong details");
//     }
// });

// app.get("/logout", (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.redirect("/");
//         }
//     });
// });

// app.get("/home", isAuthenticated, (req, res) => {
//     res.render("home", { user: req.session.user });
// });

// app.listen(3000, () => {
//     console.log("Port connected");
// });
