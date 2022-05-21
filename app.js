import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import cors from "cors";
import methodOverride from "method-override";
import Redis from "redis";

// init app middleware
const PORT = 3000;
const app = express();
const client = Redis.createClient();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set('views', './views');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride("_method"));
await client.connect();



// route
app.get("/", (_, res, __) => {
  res.render("searchusers");
});

app.post("/user/search", async (req, res) => {
  let id = req.body.id;
  let users = await client.hGetAll(id,(err, obj) => {
    if(err) return {error: err };
    return obj !== null ? {error: "Invalid User"} : {payload: obj };
  })
  
  if(Object.keys(users).length){
    res.render("details", {
      user:users
    });
  } else {
    res.render("searchusers", {
      error: true,
      message: "Invalid User"
    })
  }
});

app.get("/user/add", (req, res) => {
  res.render("adduser")
});

app.post("/user/add", async (req, res) => {
  let { id, firstName, lastName, email, telephone } = req.body;
  if([id,firstName,lastName,email,telephone].some(item => item === "")){
    res.render("adduser", {
      error: true,
      message: "Form invalid"
    })
  }

  const newUser = await client.hSet(
    id, 
    [
      "id", id,
      "first_name", firstName,
      "last_name", lastName,
      "email", email,
      "phone", telephone
    ],(err, reply) => {
      if(err) console.log(err)
      return reply;
    }
  ); 

  if(newUser){
    res.redirect("/");  
  } else {
    res.render("adduser", {
      error: true,
      message: "Invalid user"
    })
  }
});

app.delete("/user/delete/:id", async (req, res) => {
  const user = await client.del(req.params.id);
  user && res.redirect("/");
});


app.listen(PORT, ()=> console.log("server listening..."));