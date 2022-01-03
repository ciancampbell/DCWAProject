var mysql = require('promise-mysql');

var pool

mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'collegedb'
})
.then((result)=> {
    pool = result
})
.catch((error)=>{
    console.log(error)
})

var getStudents = function(){
    return new Promise((resolve, reject)=>{
        pool.query('select * from student')
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(error)
            })
    })
}

var getStudent = function(student_id){
    return new Promise((resolve, reject)=>{
        var myQuery = {
            sql: 'select * from student WHERE sid = ?',
            values: [student_id]
        }

        pool.query(myQuery)
        .then((result)=>{
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}

var addStudent = (sid, name, gpa) => {
	return new Promise((resolve, reject) => {
		let query = {
			sql: `insert into student (sid, name, gpa) values (?, ?, ?)`,
			values: [sid, name, gpa]
		}
		pool.query(query)
			.then((result) => {
				resolve(result)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

var getModule = (mid) => {
	return new Promise((resolve, reject) => {
		let query = {
			sql: "select * from module where mid = ?",
			values: [mid]
		}
		pool.query(query)
			.then((result) => {
				resolve(result)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

var setModule = (mid, name, credits) => {
	return new Promise((resolve, reject) => {
		let query = {
			sql: "update module set name = ?, credits = ? where mid = ?",
			values: [name, credits, mid]
		}
		pool.query(query)
			.then((result) => {
				resolve(result)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

var getStudentsAgl = (mid) => {
	return new Promise((resolve, reject) => {
		let query = {
			sql: "select * from student s left join student_module m on s.sid = m.sid where m.mid = ?",
			values: [mid]
		}
		pool.query(query)
			.then((result) => {
				resolve(result)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

var deletestudent = (sid) => {
	return new Promise((resolve, reject) => {
		let query = {
			sql: "delete from student where sid = ?",
			values: [sid]
		}
		pool.query(query)
			.then((result) => {
				resolve(result)
			})
			.catch((error) => {
				console.log(error)
				reject(error)
			})
	})
}
module.exports = { getStudents, getStudent, deletestudent, getModule, setModule, getStudentsAgl, addStudent}