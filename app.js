const express    = require('express'),
      app        = express();
const http       = require('http').createServer(app);
const Client     = require('replitdb-client'),
      client     = new Client();
const bodyParser = require('body-parser');
const fs         = require('fs');

const readFileAsync = fileName => new Promise(
	(resolve, reject) => {
		fs.readFile(
			fileName,
			(error, data) => {
				error === null
					? resolve(data)
					: reject(error);
			}
		);
	}
);

console.log("starting to get scores");

let scores;

client.getAll().then((s) => {
	console.log("got scores");
	scores = s;
});

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true, limit: "10kb" }));

app.get('/', async(req, res) => {
    if(req.get('X-Replit-User-Id')) {
        
        const user = await client.get(req.get('X-Replit-User-Name'));

        if(user == null) {
            await client.set(req.get('X-Replit-User-Name'), '-1');
        }

        res.sendFile(__dirname + '/public/views/index.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/login', async (req, res) => {
    if(req.get('X-Replit-User-Id')) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + "/public/views/login.html");
    }
});

app.get('/leaderboard', (req, res) => {
    console.log("In leaderboard");
    if(req.get('X-Replit-User-Id')) {

        /* const scores = await client.getAll();

        console.log("Go scores");

		readFileAsync("/public/views/leaderboard.html");

        const htmlPlusData = html.toString().replace(
            "${SCORES}"
            , JSON.stringify(scores)
        );

        res.send(htmlPlusData);
		
		console.log("getting scores"); */

		res.render("leaderboard", {
			scores
		});

    } else {
        console.log("redirect");
        res.redirect('/login');
    }
});

app.post('/submit', async (req, res) => {
    
    if(req.get('X-Replit-User-Name')) {

        const user = req.get('X-Replit-User-Name');
        const score = parseInt(req.body.score);

        const t = await client.get(user);
        const previous = parseInt(t);

        if(score > previous) {
            client.set(user, score).then(() => {
				scores.user = score;
			}).catch(err => {
				res.send("Error setting score");
			});
        }

    } else {
        res.send("Error");
    }

});

app.use(express.static('./public'));

app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/public/views/404.html');
});

http.listen(5050, () => {
    let time = new Date().toLocaleString() + " UTC time";
    console.log('listening on localhost:5050 starting at ' + time);
});
