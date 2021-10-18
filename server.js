var express = require("express");

const app = express();

const authMiddleware = (req, res, next) => {

    const authRoutes = [
        "/place-order",
        "/path",
        "/place-order",
        "/dashboard-data"
    ]



    if(authRoutes.includes(req.url)) {
        if (req.headers.secret && req.headers.secret == "987654321") {
            next();
          } else {
            res.status(401).send("Not Authorized");
          }
    } else {
        next();
    }    
  
};

const loggerMiddleware = (req, res, next) => {
  console.log("In the Middleware");
  const logData = { url: req.url, method: req.method, headers: req.headers };
  console.log(logData);
  next();
};

const oldPathMiddleware = (req, res, next) => {
  console.log("In the athal middleware");
  if (req.url == "/oldPath") {
    req.url = "/path";
  }
  next();
};

const hackerMiddleWare = ( req, res, next) => {
    console.log("req.headers.userName", req.headers.userName)
    if(req.headers.username == "chamikara") {
        req.headers.secret = "987654321"
    }
    next()

}

app.use(hackerMiddleWare);
app.use(authMiddleware);
app.use(loggerMiddleware);
app.use(oldPathMiddleware);

app.get("/", (req, res) => {
  res.send("Home path");
});

app.get("/path", (req, res) => {
  res.send(" path");
});

app.listen(3002, () => {
  console.log("app is listen on port 3002");
});
