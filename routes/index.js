var express = require('express');
var router = express.Router();

const path = require("path");
const mysql = require("mysql");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

var session;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/html/main.html'));
});

router.post("/login", (req, resp) => {
    const username = req.body.username;
    const password = req.body.password;

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'deltaEvents',
        password: 'deltaEvents',
        database: 'deltaEvents'
    });
    connection.connect();
    
    connection.query("SELECT * FROM accounts WHERE username = ? AND password = ?", [username, password], (err, res, fields) => {
        if (err) throw err;

        if (res.length > 0) {
            session = req.session;
            session.userId = res[0].id;
            session.admin = res[0].sysAdmin;
            console.log(session);

            if (res[0].sysAdmin == 1) {
                resp.send("2");
            } else {
                resp.send("1");
            }

        } else {
            resp.send("0");
        }

        resp.end();
    })
});

router.post("/signup", (req, resp) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'deltaEvents',
        password: 'deltaEvents',
        database: 'deltaEvents'
    });
    connection.connect();

    connection.query(`INSERT INTO accounts (sysAdmin, username, password, email) VALUES (0, ?, ?, ?)`, [username, password, email], (err, res) => {
        if (err) { return resp.send("0"); }
        resp.send("1");
    });    

    // resp.end();
});

router.post("/accountSettings", (req, resp) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'deltaEvents',
        password: 'deltaEvents',
        database: 'deltaEvents'
    });
    connection.connect();

    connection.query("UPDATE accounts SET username = ?, password = ?, email = ? WHERE id = ?", [username, password, email, session.userId], (err, res) => {
        if (err) { return resp.send("0"); }
        resp.send("1");
    })
});

router.post("/createEvent", (req, resp) => {
    if (session == undefined) { return resp.send("0"); }

    const startDate = moment(req.body.startDate, "DD-MM-YYYY").format("YYYY-MM-DD");
    const endDate = moment(req.body.endDate, "DD-MM-YYYY").format("YYYY-MM-DD");

    const startTime = String(req.body.startTime) + ":00";
    const endTime = String(req.body.endTime) + ":00";

    const startDateTime = startDate + " " + startTime;
    const endDateTime = endDate + " " + endTime;

    const uuid = uuidv4();

    // console.log(startDateTime);
    // console.log(endDateTime);
    // resp.send("1");

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'deltaEvents',
        password: 'deltaEvents',
        database: 'deltaEvents'
    });
    connection.connect();

    const emptyArray = [0];

    connection.query(`INSERT INTO events (eventId, accountId, name, location, startDate, endDate, info, going, maybe, notGoing) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [uuid, session.userId , req.body.name, req.body.location, startDateTime, endDateTime, req.body.info, JSON.stringify(emptyArray), JSON.stringify(emptyArray), JSON.stringify(emptyArray)], (err, res) => {
        if (err) throw err;
    });  

    resp.send(uuid);
});

router.post("/manageEvent", (req, resp) => {
    if (session == undefined) { return resp.send("0"); }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'deltaEvents',
        password: 'deltaEvents',
        database: 'deltaEvents'
    });
    connection.connect();

    console.log(req.body);

    connection.query("UPDATE events SET name = ?, location = ? WHERE eventId = ?", [req.body.name, req.body.location, req.body.eventId], (err, res) => {
        if (err) throw err;
        resp.send(req.body.eventId);
    })  
})

router.post("/inviteLink", (req, resp) => {
    const id = req.body.eventId;
    const name = req.body.name;
    const type = req.body.type;

    // console.log(id);

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'deltaEvents',
        password: 'deltaEvents',
        database: 'deltaEvents'
    });
    connection.connect();

    if (type == 1) {
        connection.query("UPDATE events SET going = JSON_ARRAY_APPEND(going, '$', ?) WHERE eventId = ?", [name, id], (err, res) => {
            if (err) throw err;
        })
    } else if (type == 2) {
        connection.query("UPDATE events SET maybe = JSON_ARRAY_APPEND(maybe, '$', ?) WHERE eventId = ?", [name, id], (err, res) => {
            if (err) throw err;
        })
    } else if (type == 3) {
        connection.query("UPDATE events SET notGoing = JSON_ARRAY_APPEND(notGoing, '$', ?) WHERE eventId = ?", [name, id], (err, res) => {
            if (err) throw err;
        })
    }

    resp.send("1");
});

router.post("/adminSignup", (req, resp) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'deltaEvents',
        password: 'deltaEvents',
        database: 'deltaEvents'
    });
    connection.connect();

    connection.query(`INSERT INTO accounts (sysAdmin, username, password, email) VALUES (1, ?, ?, ?)`, [username, password, email], (err, res) => {
        if (err) { return resp.send("0"); }
        resp.send("1");
    });    

    // resp.end();
});

router.post("/adminSignin", (req, resp) => {
    session.userId = req.body.id;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'deltaEvents',
        password: 'deltaEvents',
        database: 'deltaEvents'
    });
    connection.connect();
    connection.query(`SELECT sysAdmin FROM accounts WHERE id = ?`, [req.body.id], (err, res) => {
        if (err) throw err;
        if (res[0].sysAdmin == 1) {
            return resp.send("2");
        } else {
            return resp.send("1");
        }
    }); 
})

router.get("/createEvent", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/createEvent.html"));
});

router.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/dashboard.html"));
});

router.get("/sysAdminDashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/sysAdminDashboard.html"));
});

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
});

router.get("/event", (req, resp) => {
    const id = req.query.eventId;

    console.log(id);

    if (id == undefined) { resp.status(404); }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'deltaEvents',
        password: 'deltaEvents',
        database: 'deltaEvents'
    });
    connection.connect();

    connection.query("SELECT * FROM events WHERE eventId = ?", [id], (err, res, fields) => {
        if (err) { resp.status(404); };
        let data = res[0];
        console.log(res);
        const startDateTime = moment(data.startDate, "YYYY-MM-DD hh:mm:ss").format("DD-MM-YYYY hh:mm A");
        const endDateTime = moment(data.endDate, "YYYY-MM-DD hh:mm:ss").format("DD-MM-YYYY hh:mm A");

        // console.log(data);

        const going = JSON.parse(data.going);
        const maybe = JSON.parse(data.maybe);
        const notGoing = JSON.parse(data.notGoing);

        going.shift();
        maybe.shift();
        notGoing.shift();

        const goingStr = going.join("<br>");
        const maybeStr = maybe.join("<br>");
        const notGoingStr = notGoing.join("<br>");

        if (data.going == "[0]" && data.maybe == "[0]" && data.notGoing == "[0]") {
            return resp.send(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>DELTA SYSTEMS: Event</title><meta name="description" content=""><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="../css/index.css"></head><body><header class="fixed"><h1 class="box title">DELTA EVENTS</h1></header><main><h2 class="title" id="name">${data.name}</h2><div class="split left no-margin"><div class="box" id="information"> ${data.info}</div></div><div class="split right no-margin"><div class="box"><h2 class="subtitle">Location:</h2><br><a id="location">${data.location}</a> </div><div class="box"><h2 class="subtitle">Date & Time</h2><br><a id="startDate"><a class="bold">Start Date & Time: </a>${startDateTime}</a></br><a id="endDate"><a class="bold">End Date & Time: </a>${endDateTime}</a></div></div></main></script></body></html>`)
        }
        return resp.send(`<!DOCTYPE html> <html> <head> <meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <title>DELTA SYSTEMS: Event</title> <meta name="description" content=""> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="stylesheet" href="../css/index.css"> </head> <body> <header class="fixed"> <h1 class="box title">DELTA EVENTS</h1> </header> <main> <h2 class="title" id="name">${data.name}</h2> <div class="split left no-margin"> <div class="box" id="information"> ${data.info} </div> </div> <div class="split right no-margin"> <div class="box"> <h2 class="subtitle">Location:</h2> <br> <a id="location">${data.location}</a> </div> <div class="box"> <h2 class="subtitle">Date & Time</h2> <br> <a id="startDate">${startDateTime}</a> <a id="endDate">${endDateTime}</a> </div> <div class="box"> <h2 class="subtitle">Going & Maybe</h2> <h1 class="bold">Going:</h1> <a>${goingStr}</a> <h1 class="bold">Maybe:</h1> <a>${maybeStr}</a> <h1 class="bold">Not Going:</h1> <a>${notGoingStr}</a> </div> </div> </main> </body> </html>`)
    })
});

router.get("/inviteLink", (req, resp) => {
    const id = req.query.eventId;

    if (id == undefined) { resp.status(404); }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'deltaEvents',
        password: 'deltaEvents',
        database: 'deltaEvents'
    });
    connection.connect();

    connection.query("SELECT * FROM events WHERE eventId = ?", [id], (err, res, fields) => { 
        if (err) { resp.status(404); };
        let data = res[0];
        const startDateTime = moment(data.startDate, "YYYY-MM-DD hh:mm:ss").format("DD-MM-YYYY hh:mm A");
        const endDateTime = moment(data.endDate, "YYYY-MM-DD hh:mm:ss").format("DD-MM-YYYY hh:mm A");

        return resp.send(`<!DOCTYPE html> <html> <head> <meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <title>DELTA EVENTS: You have been Invited!</title> <meta name="description" content=""> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="stylesheet" href="../css/index.css"> <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script> </head> <body> <header class="fixed"> <h1 class="box title">DELTA EVENTS</h1> </header> <main id="app"> <h1 class="title"> You have been invited to: ${data.name}</h1> <h1 class="subtitle"> Start Date & Time: ${startDateTime}</h1> <h1 class="subtitle"> End Date & Time: ${endDateTime}</h1> <br> <input type="text" class="textbox center-text thick" v-model="name" value="Type your Name here!"> <table class="buttons"> <tr> <td><button class="main-button" v-on:click="going">Going</button></td> <td><button class="main-button" v-on:click="maybe">Maybe</button></td> <td><button class="main-button" v-on:click="notGoing">Not Going</button></td> </table><a class="subtitle centered center-text no-underline">{{ error }}</a> <div class="box center-text"> <a href="/event?eventId=${data.eventId}">EVENT LINK</a> </div> <div class="box"> ${data.info} </div> </main> <script src="../js/inviteLink.js"></script> </body> </html>`);
    });
});

router.get("/getUserData", (req, resp) => {
    if (session == undefined) { resp.send("0"); }

    const id = session.userId;

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'deltaEvents',
        password: 'deltaEvents',
        database: 'deltaEvents'
    });
    connection.connect();

    connection.query("SELECT username, email FROM accounts WHERE id = ?", [id], (err, res) => {
        if (err) throw err;

        resp.send(JSON.stringify(res[0]));
    })
})

router.get("/accountSettings", (req, resp) => {
    if (session == undefined) { return resp.redirect("/"); }
    resp.sendFile(path.join(__dirname, "../public/html/accountSettings.html"));
})

router.get("/eventDetails", (req, resp) => {
    const accountID = session.userId;
    const eventId = req.query.eventId;

    if (accountID == undefined) { return resp.redirect("/"); }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'deltaEvents',
        password: 'deltaEvents',
        database: 'deltaEvents'
    });
    connection.connect();

    connection.query("SELECT name, location, info FROM events WHERE accountId = ? AND eventId = ?", [accountID, eventId], (err, res) => {
        if (err) { return resp.redirect("/"); }
        let data = res[0];
        console.log(data);
        const ret = {
            name: data.name,
            location: data.location,
            info: data.info
        }
        return resp.send(JSON.stringify(ret));
    })
});

router.get("/manageEvent", (req, res) => {
    if (session == undefined) { return res.redirect("/"); }
    return res.sendFile(path.join(__dirname, "../public/html/manageEvent.html"))
})

router.get("/eventList", (req, resp) => {
    if (session == undefined) { return res.redirect("/"); }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'deltaEvents',
        password: 'deltaEvents',
        database: 'deltaEvents'
    });
    connection.connect();

    connection.query("SELECT name, eventID FROM events WHERE accountId = ?", [session.userId], (err, res) => {
        if (err) throw err;

        resp.send(JSON.stringify(res));
    })
})

router.get("/userList", (req, resp) => {
    if (session == undefined || session.sysAdmin == 0) { return res.redirect("/"); }
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'deltaEvents',
        password: 'deltaEvents',
        database: 'deltaEvents'
    });
    connection.connect();

    connection.query("SELECT username, id FROM accounts", [], (err, res) => {
        if (err) throw err;

        resp.send(JSON.stringify(res));
    })
})

module.exports = router;
