///this is an api creation JWT

const express=require("express")
const jwt =require("jsonwebtoken")

const app=express();

app.get("/api",(req,res)=>{
    res.json({
        message : "hey there! welcome to this api",
    });
});
///pushing data 
app.post("/api/posts",verifyToken,(req,res)=>{
    jwt.verify(req.token,"secretkey",(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message : "Posts Created",
                authData
            });
        }
    })
});
///creation of a token
app.post("/api/login",(req,res)=>{
    const user={
        id : 1,
        username :"John",
        email : "john@gmail.com",
    };

    jwt.sign({user:user},"secretkey",(err,token)=>{
        res.json({
            token,
        });
    });
});
///function to verify whether the generated token is same as the information extracted from the header such as name and password
function verifyToken(req,res,next){
    const bearerHeader=req.headers["authorization"]
    if(typeof(bearerHeader!== "undefined"))
    {
        const bearerToken=bearerHeader.split(" ")[1]
        req.token=bearerToken
        next();
    }
    else{
        res.sendStatus(403)
    }
}

app.listen(3000,(req,res)=>{
    console.log("the server is runnning on port 3000");
})