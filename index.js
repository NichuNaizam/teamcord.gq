let express = require('express');
let app = express();

let Discord = require('discord.js')
let client = new Discord.Client();

require('dotenv').config();

let bodyParser = require('body-parser');

let PORT = 80;
let Static_Path = __dirname + "/public";

app.use(express.static(Static_Path));
app.set('view engine', 'ejs');

let urlencoded = bodyParser.urlencoded({ extended: false })
// Web Requests

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/index', function (req, res) {
    res.render('pages/index');
});

app.get('/search', function (req, res) {
    res.render('pages/search');
});

app.get('/features', function (req, res) {
    res.render('pages/features');
});

// Web Post Requests

app.post("/search", urlencoded, function (req, res) {
    let uid = req.body.uid;
    client.users.fetch(uid).then(async (user) => {
        let avatarURL = user.displayAvatarURL();
        var data = {
            avatar: avatarURL,
            username: user.tag,
        }

        console.log(JSON.stringify(data))
        console.log(JSON.stringify(req.body))

        res.render('pages/searchresult', { data: data });
    }).catch(() => {
        res.render('pages/404-search')
    })
})

// Console Logs when web server is ready

app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`);
});

// Discord Events

client.on('ready', () => {
    console.log("Discord Client is ready");
})

// Discord Login

client.login(process.env.TOKEN);

// 404 Web Request Handling

app.use((req, res,next)=>{
    res.status(404).render('pages/404')
 });
