var express = require("express");
var mySQLDAO = require('./mySQLDAO')
var ejs = require('ejs');
var app = express();

app.set('view engine', 'ejs')


app.get('/', (req,res)=>{
    res.render("index")
})

app.get('/listStudents', (req,res)=>{
    mySQLDAO.getStudents()
        .then((result)=>{
            console.log(result)
            res.render('students', {students:result})
        })
        .catch((error)=>{
            res.send(error)
        })
})

app.get('/students/:student', (req,res)=>{
    mySQLDAO.getStudent(req.params.student)
    .then((result)=>{
        console.log(result)
        res.render('students', {students:result})
    })
    .catch((error)=>{
        res.send(error)
    })
})

app.get('/addStudent', (req, res) => {
	res.render("addStudent", { errors: undefined, sqlError: undefined, sid: "", name: "", gpa: "" })
})

app.get('/students/delete/:sid', (req, res) => {
	sql.deletestudent(req.params.sid)
		.then((result) => {
			res.redirect('/Students')
		})
		.catch((error) => {
			if (error.errno == 1451) {
				res.render("error", { student: req.params.sid, message: "has associated modules and cannot be deleted." })
			} else {
				res.send(`Unknown error occurred while attempting to delete student ${req.params.sid}.`)
			}
		})
})

app.get('/modules', (req, res) => {
	sql.getmodule()
		.then((result) => {
			console.log(result)
			res.render("modules", { modules: result })
		})
		.catch((error) => {
			res.send(error)
		})
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})

