var express = require("express"),
    sharejs = require("share"),
    redis   = require("redis"),
    app     = express();

    var url = require("url");

var redisClient;

if (process.env.REDISTOGO_URL) {
    let rtg = require("url").parse(process.env.REDISTOGO_URL);
    redisClient = redis.createClient(rtg.port, rtg.hostname);
    redisClient.auth(rtg.auth.split(":")[1]);
} else {
    redisClient = redis.createClient();
}

sharejs.server.attach(app, { 
    db: { 
        type: "redis", 
        client: redisClient 
    } 
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/:id?", function(_, res){
    res.render("home");
});

app.listen((process.env.PORT || 8000), process.env.IP, function(){
    console.log("The MarkEditor Server Has Started!");
});