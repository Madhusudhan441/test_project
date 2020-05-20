var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var multer = require('multer');
var fs = require('fs');
const path = require('path');


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors({origin:'http://localhost:3001',credentials:true}));

app.use(cors({ origin: 'D:/273/273_labs/canvas/frontend/src/components/submission/', credentials: true }));
//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_canvas',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "madhu",
    password: "madhu",
    database: "canvas"
  });
  con.connect(function(err) {
    if (err) throw err
});
app.post('/login',function(req,res){

  // Object.keys(req.body).forEach(function(key){
  //     req.body = JSON.parse(key);
  // });
  // var username = req.body.username;
  // var password = req.body.password;
  console.log("Inside Login Post Request");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ",req.body);
 if(req.body.stufac==="faculty"){
  con.query("SELECT *  FROM facultydetails WHERE facultyid = "+JSON.stringify(req.body.username), function (err, result, fields) {
    if (err) throw err;
   
  
    result.filter(function(user){
      console.log(user.username,user.facultyid,req.body.username)
      if(user.facultyid === req.body.username && user.password === req.body.password){
          res.cookie('cookie',req.body.username,{maxAge: 900000, httpOnly: false, path : '/'});
          req.session.user = user;
          req.session.username = "faculty"
          res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
          console.log(user.username)
          res.end(user.username);
       
      }
  })  

});
 }
 else{
  con.query("SELECT *  FROM studentdet WHERE studentid ="+JSON.stringify(req.body.username), function (err, result, fields) {
    if (err) throw err;


    result.filter(function(user){
      console.log(user.studentid,user.password)
      if(user.studentid === req.body.username && user.password === req.body.password){
          res.cookie('cookie',req.body.username,{maxAge: 900000, httpOnly: false, path : '/'});
          req.session.user = user;
          req.session.username = "student" 
          res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
          console.log(user.username)
          
          res.end(user.username);
      }
  })

});
 }
}); 
app.post('/signup',function(req,res){
  console.log(req.body)
  if(req.body.owner=="student"){
  con.query("INSERT INTO studentdet(studentid,username,password) VALUES(?,?,?)",[req.body.loginid,req.body.username,req.body.password], function (err, result, fields) {
    if (err) throw err
});
  }
  else{
    con.query("INSERT INTO facultydetails(facultyid,username,password) VALUES(?,?,?)",[req.body.loginid,req.body.username,req.body.password], function (err, result, fields) {
      if (err) throw err
  });
  }
});

app.post('/createfolder',function(req, res) {
console.log(req.body)
var dir = req.body.foldname;

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
});
var store = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './files/newfolder')
  },
  filename: function (req, file, cb) {
    console.log("hi",req.body,file)
  cb(null, '200' + '-' +file.originalname )
  }
  })
  
  var upl = multer({ storage: store }).single('file')
  app.post('/uploadfile',function(req, res) {
  console.log(req.body)
  upl(req, res, function (err) {
  if (err instanceof multer.MulterError) {
  return res.status(500).json(err)
  } else if (err) {
  return res.status(500).json(err)
  }
  return res.status(200).send(req.file)
  })
  });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './submissions/assignments')
  },
  filename: function (req, file, cb) {
    console.log("hi",req.body,file)
  cb(null, '200' + '-' +file.originalname )
  }
  })
  
  var upload = multer({ storage: storage }).single('file')
  app.post('/upload',function(req, res) {
    console.log(req.body)
  upload(req, res, function (err) {
  if (err instanceof multer.MulterError) {
  return res.status(500).json(err)
  } else if (err) {
  return res.status(500).json(err)
  }
  return res.status(200).send(req.file)
  })
  });
  app.post('/coursesearch', function(req, res){
    courseres=[]
    courseresult=[]
    console.log(req.body)
    var courses = []
      con.query("SELECT * FROM coursedet ", function (err, result, fields) {
    if (err) throw err;

   courses = result
   console.log("courses")
  
    // res.end(JSON.stringify(result))

console.log("hi")
console.log(courses)
    var searchResult = result.filter((course)=>{

      console.log(course.courseterm,req.body.cterm)
      if(course.courseterm===req.body.cterm) {
        console.log("inside")
        if(req.body.cname!=""){
          if(course.coursename.indexOf(req.body.cname) > -1)
          courseres.push(course)
          
        }
        else{
          courseres.push(course)
        }

      }

   });
  console.log("sdfds")
  console.log(courseres)
if(req.body.cid!=""){
   var searchResultad = courseres.filter((course1)=>{

    switch(req.body.cidfilt){
      case "exactly":
          console.log(course1.id,req.body.cid)
          if(course1.courseid===req.body.cid){
            console.log("hi",course1.id,req.body.cid)
            courseresult.push(course1)
          }
          break;

      case "contains":
      if(course1.courseid.indexOf(req.body.cid) > -1){
        courseresult.push(course1)
      }
      break;
      case "ge":
      if(course1.courseid>=req.body.cid){
        courseresult.push(course1)
      }
      break;

      case "le":
      if(course1.courseid<=req.body.cid){
        courseresult.push(course1)
      }
      break;
      default:
      if(course1.courseid===req.body.cid){
        courseresult.push(course1)
      }
      break;
    }
   });
  }
  else{
    courseresult=courseres;
  }
  console.log("hello")
   console.log(courseresult)
   res.end(JSON.stringify(courseresult));
   
});
  });

app.post('/getassignment',function(req,res){

var courseid = req.body.courseid
console.log(courseid)
var res1 = ""
  con.query("SELECT * FROM assignmentlist WHERE courseid ="+courseid, function (err, result, fields) {
    if (err) throw err;

   
    res.end(JSON.stringify(result))

});
})

app.post('/createannounce',function(req,res){
  console.log(req.body)
  con.query("INSERT INTO announcements(courseid,anct_name,anct_details,anct_date) VALUES(?,?,?,?)",[req.body.courseid,req.body.anct_name,req.body.anct_details,req.body.anct_date], function (err, result, fields) {
    if (err) throw err
});
res.writeHead(200,{
  'Content-Type' : 'text/plain'
})
res.end();

});
app.post('/createassignment',function(req,res){
  console.log(req.body)
  con.query("INSERT INTO  assignmentlist(name,due,marks,courseid) VALUES(?,?,?,?)",[req.body.asgmnt_name,req.body.asgmnt_due,req.body.asgmnt_marks,req.body.courseid], function (err, result, fields) {
    if (err) throw err
});
res.writeHead(200,{
  'Content-Type' : 'text/plain'
})
res.end();

});
app.post('/getpeople',function(req,res){
console.log(req.body)
    con.query("SELECT * FROM studentcourses WHERE courseid ="+req.body.courseid, function (err, result, fields) {
      if (err) throw err;
      console.log(result)
     
      res.end(JSON.stringify(result))

  });
  })
  app.post('/updateprofile',function(req,res){
    console.log("hi",req.body)
    if(req.body.stufac==="faculty"){
      con.query("UPDATE coursedet SET name = ?,email =?,phonenumber =?,about = ?,city =?,country =?,company = ?,school =?,hometown =?,languages =?,gender = ? WHERE studentid = ?",[req.body.name,req.body.email,req.body.phonenumber,req.body.about,req.body.city,req.body.country,req.body.company,req.body.school,req.body.hometown,req.body.languages,req.body.gender,req.body.loginid],function (err, result, fields) {
        if (err) throw err;
      
        res.end(JSON.stringify(result))
      })
    }
    else{
      con.query("UPDATE studentdet SET name = ?,email =?,phonenumber =?,about = ?,city =?,country =?,company = ?,school =?,hometown =?,languages =?,gender = ? WHERE studentid = ?",[req.body.name,req.body.email,req.body.phonenumber,req.body.about,req.body.city,req.body.country,req.body.company,req.body.school,req.body.hometown,req.body.languages,req.body.gender,req.body.loginid],function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result))
      })
    }
      })
      
      app.post('/createquiz',function(req,res){

        console.log(req.body)
        con.query("SELECT MAX(quizid) as mx from quiz",function (err, result, fields) {
          console.log(result)
          if (err) throw err;
      if(result[0].mx<1000){
        maxid = 1000
      }
      else{
        maxid =  parseInt(result[0].mx)+1
        maxqueid = maxid*10
      }
      console.log(maxid)
        con.query("INSERT INTO quiz(quizid,courseid,name,due,marks,quiztaken) VALUES(?,?,?,?,?,?)",[maxid,req.body.courseid,req.body.quizname,req.body.quizdue,req.body.quizmarks,"no"], function (err, result, fields) {
          if (err) throw err;
      });
      
      console.log(req.body.quesdet)
    req.body.quesdet.filter(function(quizdet){
      con.query("INSERT INTO quizques(quizid,quizquesid,quizname,quizquestion,quizopt1,quizopt2,quizopt3,quizopt4,quizopted) VALUES(?,?,?,?,?,?,?,?,?)",[maxid,maxqueid,req.body.quizname,quizdet.question,quizdet.option1,quizdet.option2,quizdet.option3,quizdet.option4,quizdet.crctans], function (err, result, fields) {
        if (err) throw err;
    });
    });
  });
      });
      app.post('/quizsub',function(req,res){
        console.log("inside subquiz")
        var score = 0
        con.query("SELECT quizquesid,quizopted FROM quizques WHERE quizid = "+JSON.stringify(req.body.quizid), function (err, result, fields) {
          if (err) throw err;
           
          result.filter(function(quizques){
            console.log(quizques)
          req.body.dataque.filter(function(quizans){
            console.log(quizans.name,quizans.value,quizques.quizquesid,quizques.quizopted)
            if(quizans.name==quizques.quizquesid && quizans.value==quizques.quizopted){
                score = score + 1
            } 
          })
          })
          console.log(score,req.body.courseid,req.body.loginid) 
          con.query("INSERT INTO grades(studentid,courseid,assignmentid,score) VALUES(?,?,?,?)",[req.body.loginid,req.body.courseid,req.body.quizid,score], function (err, result, fields) {
            if (err){
              console.log(err)
            } 
        });
        con.query("UPDATE  quiz SET quiztaken ='yes' WHERE quizid = "+JSON.stringify(req.body.quizid)+" and courseid="+JSON.stringify(req.body.courseid), function (err, result, fields) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
      });
        })
        res.end();
      });
      
  app.post('/getprofile',function(req,res){
    if(req.body.stufac==="faculty"){
      con.query("SELECT *  FROM facultydetails WHERE facultyid = "+JSON.stringify(req.body.loginid), function (err, result, fields) {
        if (err) {
        console.log(err)
        }
       res.end(result)
      })
    }
    else{
      con.query("SELECT *  FROM studentdet WHERE studentid ="+JSON.stringify(req.body.loginid), function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result))
      })
    }
        
  })

  app.post('/addcourse',function(req,res){
    console.log(req.body)
    con.query("INSERT INTO `coursedet` (`facultyid`, `courseid`, `coursename`, `coursedept`, `coursedes`, `courseroom`, `coursecapacity`, `waitlistcapacity`, `courseterm`, `coursecol`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[req.body.facultyid,req.body.courseid,req.body.coursename, req.body.coursedept, req.body.coursedes, req.body.courseroom,req.body.coursecap, req.body.coursewaitcap, req.body.courseterm, req.body.coursecol], function (err, result, fields) {
      if (err) throw err
  });
  res.writeHead(200,{
    'Content-Type' : 'text/plain'
  })
  res.end();
  
  });
 
app.post('/getquiz',function(req,res){

  var courseid = req.body.courseid
  console.log(courseid)
  var res1 = ""
    con.query("SELECT * FROM quiz WHERE courseid ="+courseid, function (err, result, fields) {
      if (err) throw err;

     
      res.end(JSON.stringify(result))

  });
  })
  app.post('/getquizques',function(req,res){

    var quizid = req.body.quizid
    console.log( quizid)
    var res1 = ""
      con.query("SELECT * FROM quizques WHERE quizid ="+quizid, function (err, result, fields) {
        if (err) throw err;

      
        res.end(JSON.stringify(result))

    });
    })

app.post('/gradesearch',function(req,res){

  var courseid = req.body.id
  console.log(courseid)
  if(req.body.stufac=="student"){
 try {
    con.query("(SELECT G.studentid,cd.coursename,P.name,P.due,G.score,P.marks FROM grades as G INNER JOIN assignmentlist as P ON G.courseid=P.courseid and G.assignmentid = P.assignmentid INNER JOIN coursedet as cd ON G.courseid = cd.courseid WHERE G.courseid ="+courseid+" AND G.studentid = "+req.body.loginid+") UNION (SELECT H.studentid,dc.coursename,Q.name,Q.due,H.score,Q.marks FROM grades as H INNER JOIN quiz as Q ON H.courseid=Q.courseid and H.assignmentid = Q.quizid INNER JOIN coursedet as dc ON H.courseid = dc.courseid WHERE H.courseid ="+courseid+" AND H.studentid = "+req.body.loginid+")", function (err, result, fields) {
      if (err) throw err;

  console.log(result)
      res.end(JSON.stringify(result))


  });
} catch (error) {
   console.log("connection error")
}
  }
  else{
    con.query("(SELECT G.studentid,cd.coursename,P.name,P.due,G.score,P.marks FROM grades as G INNER JOIN assignmentlist as P ON G.courseid=P.courseid and G.assignmentid = P.assignmentid INNER JOIN coursedet as cd ON G.courseid = cd.courseid WHERE G.courseid ="+req.body.id+" AND cd.facultyid ="+req.body.loginid+") UNION (SELECT H.studentid,dc.coursename,Q.name,Q.due,H.score,Q.marks FROM grades as H INNER JOIN quiz as Q ON H.courseid=Q.courseid and H.assignmentid = Q.quizid  INNER JOIN coursedet as dc ON H.courseid = dc.courseid WHERE H.courseid ="+req.body.id+" AND dc.facultyid ="+req.body.loginid+")", function (err, result, fields) {
      if (err) throw err;

  console.log(result)
      res.end(JSON.stringify(result))


  });
  }
  })   
  

  app.get('/seeFolders',function(req,res){
    const Filehound = require('filehound');

    Filehound.create()
      .path("./files/")
      .directory()
      .find((err, subdirectories) => {
        if (err) return console.error(err);
    
        console.log(subdirectories);
        res.send(subdirectories)
      });
})

app.get('/seeFoldFiles',function(req,res){
  // if (process.argv.length <= 2) {
  //     console.log("Usage: " + __filename + " ./public/files");
  //     process.exit(-1);
  // }
   
  console.log(req.query)
  // var path = process.argv[2];
   console.log("inside see files")
  fs.readdir( req.query.path, function(err, items) {
      //console.log(items);
   
      res.end(JSON.stringify(items));
  });
  
  

           
})
app.get('/seeFiles',function(req,res){
    // if (process.argv.length <= 2) {
    //     console.log("Usage: " + __filename + " ./public/files");
    //     process.exit(-1);
    // }
     
    // var path = process.argv[2];
     console.log("inside see files")
    fs.readdir( "./submissions/assignments/", function(err, items) {
        //console.log(items);
     
        res.end(JSON.stringify(items));
    });
    
    

             
})
app.post('/downloadfile-file/:file(*)', function(req, res){
  console.log('Inside DOwnload File');
  console.log(req.body.pathfile)
  var file = req.params.file;
  var filelocation = path.join(__dirname + req.body.pathfile, file);
  var img = fs.readFileSync(filelocation);
  var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, {
      'Content-type': 'application/pdf'
  });
  res.end(JSON.stringify(base64img));

});
app.post('/download-file/:file(*)', function(req, res){
    console.log('Inside DOwnload File');
    var file = req.params.file;
    var filelocation = path.join(__dirname + '/submissions/assignments/', file);
    var img = fs.readFileSync(filelocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, {
        'Content-type': 'application/pdf'
    });
    res.end(JSON.stringify(base64img));

});
  //   app.get('/downloadassign',(req, res) => {
  //     console.log("hello")
  //     console.log(req.query)
  //     var file = req.params.file;
  //     var fileLocation = path.join('./submissions/assignments/','200-HW4_013707187.pdf');
  //     console.log(fileLocation);
  //     res.download(fileLocation); 
  
  // });

app.post('/getannounce',function(req,res){

  var courseid = req.body.courseid
  console.log(courseid)

    con.query("SELECT * FROM announcements WHERE courseid ="+courseid, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result))
  });
})
app.post('/requestpermission',function(req,res){
console.log("hello",req.body)
  con.query("UPDATE  studentcourses SET coursestatus ='enrolled' WHERE studentid = "+JSON.stringify(req.body.loginid)+" and courseid="+JSON.stringify(req.body.courseid), function (err, result, fields) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
});
res.end();
});


app.post('/getannouncedet',function(req,res){

  

    con.query("SELECT * FROM announcements WHERE courseid ="+req.body.courseid+" AND anct_id="+req.body.anct_id, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result))
  });
})
app.post('/getassignmentdet',function(req,res){

  

  con.query("SELECT * FROM assignmentlist WHERE courseid ="+req.body.courseid+" AND assignmentid="+req.body.assignmentid, function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result))
});
})


app.get('/getassignmentfac',function(req,res){
  res.writeHead(200,{
    'Content-Type' : 'application/json'
});
console.log(assignmentlist)
  res.end(JSON.stringify(assignmentfaclist))

})
app.post('/getcourselist',function(req,res){

  var stuname = req.body.stuname  
  console.log(stuname)
if(req.body.stufac==="faculty"){
  con.query("SELECT * FROM  coursedet JOIN facultydetails on coursedet.facultyid=facultydetails.facultyid WHERE facultydetails.username="+JSON.stringify(req.body.stuname), function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result))
});
}
else{
  con.query("SELECT * FROM  studentcourses JOIN coursedet ON coursedet.courseid = studentcourses.courseid JOIN studentdet ON studentdet.username=studentcourses.username WHERE studentdet.username="+JSON.stringify(req.body.stuname), function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result))
});
}
  
})



  app.post('/regcourse', function(req, res){
    console.log("hello",req.body.stuname,req.body.courseid)
  if(req.body.enrollstatus=="Drop"){
    console.log("hello",req.body.stuname,req.body.courseid)
  con.query("SELECT * from studentcourses WHERE username="+JSON.stringify(req.body.stuname)+"AND courseid="+JSON.stringify(req.body.courseid), function (err, result, fields) {
    if (err) throw err;

  console.log(",,,,,,,",result)
    con.query("DELETE FROM studentcourses WHERE username="+JSON.stringify(req.body.stuname)+"AND courseid="+JSON.stringify(req.body.courseid), function (err, result, fields) {
      if (err) throw err;

  });
  
 if(result[0].coursestatus=="enrolled"){
  con.query("UPDATE  studentcourses SET coursestatus ='enrolled' WHERE coursestatus='waitlist' and courseid="+JSON.stringify(req.body.courseid)+" LIMIT 1"  , function (err, result, fields) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
});
con.query("SELECT * FROM coursedet WHERE courseid="+mysql.escape(req.body.courseid), function (err, result, fields) {
  if (err) throw err;
  con.query("UPDATE coursedet SET coursecapacity = ? WHERE courseid = ?",[result[0].coursecapacity+1,req.body.courseid], function (err, result, fields) {
    if (err) throw err;
});
    
});
 }
});
  res.end()
  }
  else{
    con.query("SELECT * FROM coursedet WHERE courseid="+mysql.escape(req.body.courseid), function (err, result, fields) {
      if (err) throw err;
    console.log(result)
console.log("hi",result[0].coursecapacity-1)
     if(result[0].coursecapacity>0){
       console.log("........................",result[0].coursecapacity-1,req.body.courseid,JSON.stringify(req.body.courseid))
      
    con.query("INSERT INTO studentcourses(studentid,username,courseid,coursestatus) VALUES(?,?,?,?)",['402',req.body.stuname,req.body.courseid,'enrolled'], function (err, result, fields) {
      if (err) throw err
  });
  con.query("UPDATE coursedet SET coursecapacity = ? WHERE courseid = ?",[result[0].coursecapacity-1,req.body.courseid], function (err, result, fields) {
    if (err) throw err;
});
    
     }
     else if(result[0].waitlistcapacity>0){
      con.query("INSERT INTO studentcourses(studentid,username,courseid,coursestatus) VALUES(?,?,?,?)",['402',req.body.stuname,req.body.courseid,'waitlist'], function (err, result, fields) {
        if (err)throw err
    });
    con.query("UPDATE coursedet SET waitlistcapacity = ? WHERE courseid = ?",[result[0].waitlistcapacity-1,req.body.courseid], function (err, result, fields) {
      if (err) throw err;
  });
     }
     else{
       console.log("Class is full")
     }
  });
    
  }
  res.end()
  });
 assignmentlist = [{"name":"Homework1","due":"Mar 8 at 11:59pm","marks":"10pts","courseid":"200"},{"name":"Homework2","due":"Mar 8 at 11:59pm","marks":"10pts","courseid":"200"},{"name":"Homework3","due":"Mar 8 at 11:59pm","marks":"10pts","courseid":"200"},{"name":"Homework4","due":"Mar 8 at 11:59pm","marks":"10pts","courseid":"200"}]
 assignmentfaclist = [{"name":"Homework1","due":"Mar 8 at 11:59pm","marks":"10pts","courseid":"200"},{"name":"Homework2","due":"Mar 8 at 11:59pm","marks":"10pts","courseid":"200"},{"name":"Homework3","due":"Mar 8 at 11:59pm","marks":"10pts","courseid":"200"},{"name":"Homework4","due":"Mar 8 at 11:59pm","marks":"10pts","courseid":"200"}]
//  Users = [{
//   username : "admin",
//   password : "admin"}]
//  courses=[{"term":"fall","name":"CMPE 200","id":"200","status":"registered"},{"term":"spring","name":"CMPE 200","id":"200","status":"registered"},{"term":"fall","name":"CMPE 240","id":"240","status":"not registered"},{"term":"spring","name":"CMPE 273","id":"273","status":"not registered"}]
//   courseres=[]
  courseresult=[]
app.listen(3001);
console.log("Server Listening on port 3001");