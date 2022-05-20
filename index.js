import express, { urlencoded } from "express";
import cors from "cors";
import fetch from "node-fetch";
import Redis from "redis";
import e from "express";

const PORT = 5011;
const DEFAULT_EXPIRATION = 3600;
const app = express();
const redisClient = Redis.createClient(); // url is suggested when in production
await redisClient.connect();
app.use(cors());

const getOrSetRedisCache = async (path, url) => {
  const cache = await redisClient.GET(`${path}`, (err, data) => {
    if(err) return err;
    return data;
  })
  if(cache !== null){
    return JSON.parse(cache);
  }
  const payload = await fetchRequest(url);
  if(payload.error){
    return payload.error
  } else {
    redisClient.SETEX(path, DEFAULT_EXPIRATION, JSON.stringify(payload));
    return payload;    
  }
}

const fetchRequest = async (url) => {
  try {
    const response = await fetch(url);
    return response.ok ? await response.json() : null;
  } catch (error) {
    return { error: error.message };
  }
}

const isURL = (s) => {
  var regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
  return regexp.test(s); 
}

const requestUrlValidator = async (path, url) => {
  if(isURL(url)){
    return await getOrSetRedisCache(path, url);
  } else {
    return "error";
  }
}


app.get("/", (_,res) => {
  res.json({
    payload:"hello world!"
  });  
});

app.get("/photos", async (req, res) => {
  const url = "https://jsonplaceholder.typicode.com/albums";
  const payload = await requestUrlValidator(req.path, url);
  res.json({
    payload
  });
});

app.get("/photos/:id", async (req, res) => {
  const url = `https://jsonplaceholder.typicode.com/albums/${req.params.id}`;
  const payload = await requestUrlValidator(req.path, url);
  res.json({
    payload
  })
});


app.listen(PORT,()=> console.log("server listening..."))