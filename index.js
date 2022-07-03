const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 8089;
const cors = require("cors");
const app = express();
const Schemas = require("./Schema.js");
const jwt = require("jsonwebtoken");
const server = http.createServer(app);
require('dotenv').config();
app.use(cors());
app.use(express.urlencoded({extended:true}));
const jwtKey = process.env.SASTA_JWT;
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
const mongoose = require("mongoose");
const DB = "mongodb+srv://snips:snips@cluster0.hscsw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const DB = 'mongodb://localhost:27017/schoolProject';

const Chat = new mongoose.model("chattings", Schemas.chatSchema);
const Students = new mongoose.model("student", Schemas.studentSchema);
const Teacher = new mongoose.model("teachers", Schemas.teacherSchema);


// Connecting to Database

mongoose.connect(DB).then(() => {
	console.log("Connected to Database");
}).catch(err => console.log("Error while connecting - "+err));



io.on('connection', (socket) => {
    console.log(`A User Connected At ${new Date().getMinutes()}:${new Date().getSeconds()}`);
    socket.on("message", async(arr) => {
      if(validate2(arr['token'], arr['role'])) {
        console.log(arr);
        await addMsg(arr['from'], arr['to'], arr['msg'], arr['adm'], arr['role'], arr['cls'], arr['fromName'], arr['toName'])
        .then(data => {
          if(data) {
            io.emit("messageArrived", arr);
          }
        });
    }
    })
});

const validate2 = async(token, role) => {
  try{
		var data = jwt.verify(token, jwtKey);
		if(data.role==role) {
      var d;
      if(data.role==role) return true;
      else return false;
    }
	}catch(err){
		console.log(err)
		return false;
	}
}

const addMsg = async(from, to, msg, adm, role, calass, fromName, toName) => {
    try {
        var date = new Date();
        var d = `${date.getHours()}:${date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()} - ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        var arr = {
          message : msg,
          date : d,
          from : from,
          to : to,
          adm : adm,
          fromRole : role,
          cls : calass,
          fromName: fromName,
          toName : toName,
          createdAt : `${new Date().getTime()}`
        };
        var d = await new Chat(arr).save();
        return true;
    } catch(err) {
        return false;
    }
}


app.get("/api/getPreviousChat", async(req, res) => {
    var token = req.query.token;
    var sId = req.query.from;
    var tId = req.query.to;
    var role = req.query.role;
    var r;
    try {
    await validate(token, sId, role)
    .then(data => {
      r = data;
    });
    var d;
    if(r) {
      var d1 = await Chat.find({from : sId, to : tId});
      console.log(d1);
      var d2 = await Chat.find({from : tId, to : sId});
      console.log(d2);
      d1 = d1.concat(d2);
      d1.sort((a, b) => {
        return a.createdAt - b.createdAt;
    });
      res.json({
        message: "yes",
        chat : d1 
      });
    }
    else {
      res.json({
        message: "no"
      });
    }
    } catch(err) {
      console.log(err);
      res.json({
        message: "no"
      });
    }
});


app.get("/api/getPrevChat", async(req, res) => {
  var token = req.query.token;
    var sId = req.query.student;
    var tId = req.query.teacher;
    var role = req.query.role;
    var r;
    console.log("sId = "+sId);
    console.log("tId = "+tId);
    console.log("token = "+token);
    try {
    await validate(token, tId, role)
    .then(data => {
      r = data;
      console.log(r);
    });
    var d;
    if(r) {
      var d1 = await Chat.find({from : sId, to : tId});
      console.log(d1);
      var d2 = await Chat.find({from : tId, to : sId});
      console.log(d2);
      d1 = d1.concat(d2);
      d1.sort((a, b) => {
        return a.createdAt - b.createdAt;
    });
      res.json({
        message: "yes",
        chat : d1 
      });
    }
    else {
      res.json({
        message: "no"
      });
    }
    } catch(err) {
      console.log(err);
      res.json({
        message: "no"
      });
    }
});


app.get("/api/getStudents", async(req, res) => {
    var token = req.query.token;
    var id = req.query.id;
    console.log(id);
    try{
      var data = jwt.verify(token, jwtKey);
      var data = await Chat.find({from : id});
      var d2 = await Chat.find({to : id});
      data = data.concat(d2);
      messages = [];
      data.forEach(function(i){
      var done=0;
      messages.forEach(function(l){
        if(i.adm==l.adm){
        l.data.push(i)
        done=1;
        }
      })
      if(done==0){
        messages.push({
        name : i.fromName,
        from : i.from,
        adm:i.adm,
        cls : i.cls,
        data:[i]
        })
      }
      });
      res.json({
        message: "yes",
        data : messages.reverse()
      })
    }catch(err){
      console.log(err)
      res.json({
        message:"no"
      });
    }
});








const validate = async(token, from, role) => {
	try{
		var data = jwt.verify(token, jwtKey);
		if(data.role==role) {
      var d;
      if(data.role=="student") {
        d = await Students.find({_id : from});
      }
      else {
        d = await Teacher.find({_id : from});
        console.log(d);
      }
      if(d.length==0) {
        return false;
      }
      else {
        return true;
      }
    }
	}catch(err){
		console.log(err)
		return false;
	}
}


// Chat.find({}, (err, chat) => 
//  {
//    chat.forEach(async(e) => {
//     await Chat.deleteOne({_id : e['_id']});
//     console.log("deleted");
//    })
//  }
// )


// Starting Server
server.listen(port, () => {
    console.log('listening on *:8080');
});

/*
arr = new Array();
array.forEach((e) => {
  var fArr;
  var a = e['adm'];
  var basic = {name, a, cls};
  var chat = {};
  array.forEach((e, index) => {
    if(e['adm']==a) {
      chat.push({message: e['msg'], date : e['date']});
      array.splice(index, 1);
    }
    fArr.push{basicInfo : basic, chat : chat};
    arr.push(fArr);
  });
  console.log(data);
})
*/

