const mysql = require('mysql');


//Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,  
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME        
});

//View Users
exports.view = (req,res) => {
    //Connect to DB
    pool.getConnection((err,connection) => {
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);

    //User the connection
    connection.query('SELECT *FROM user',(err,rows) => {
        //when done with the connection , release it
        connection.release();

        if(!err) {
            res.render('home',{ rows });
        }
        else {
            console.log(err);
        }
        console.log('The data from user table: \n',rows);

    });
});
}


exports.login = (req,res) => {
    //Connect to DB
    pool.getConnection((err,connection) => {
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);

    //User the connection
    connection.query('SELECT *FROM user',(err,rows) => {
        //when done with the connection , release it
        connection.release();

        if(!err) {
            res.render('login-user',{ rows });
        }
        else {
            console.log(err);
        }
        console.log('The data from user table: \n',rows);

    });
});
}

//Find USER by Search
exports.find = (req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log('Connected as ID ' + connection.threadId);
    
        let searchTerm = req.body.search;

        //User the connection
        connection.query('SELECT *FROM user WHERE first_name LIKE ? OR Hobbies LIKE ? ',['%' + searchTerm + '%','%' + searchTerm + '%'],(err,rows) => {
            //when done with the connection , release it
            connection.release();
    
            if(!err) {
                res.render('login-user',{ rows });
            }
            else {
                console.log(err);
            }
            console.log('The data from user table: \n',rows);
    
        });
    });
}

exports.form = (req,res) => {
    res.render('add-user');
}


//Add new User
exports.create = (req,res) => {
    //res.render('add-user');
    const { first_name, last_name, email, phone, Hobbies, comments} = req.body;

    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log('Connected as ID ' + connection.threadId);
    
        let searchTerm = req.body.search;

        //User the connection
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, Hobbies = ?, comments = ?',[first_name, last_name, email, 
            phone, Hobbies, comments],(err,rows) => {
            //when done with the connection , release it
            connection.release();
    
            if(!err) {
                res.render('add-user',{ alert: 'User added successfully.' });
            }
            else {
                console.log(err);
            }
            console.log('The data from user table: \n',rows);
    
        });
    });
}

//Edit user
exports.edit = (req,res) => {
    //res.render('edit-user');
    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log('Connected as ID ' + connection.threadId);
    
        //User the connection
        connection.query('SELECT *FROM user WHERE id = ?',[req.params.id],(err,rows) => {
            //when done with the connection , release it
            connection.release();
    
            if(!err) {
                res.render('edit-user',{ rows });
            }
            else {
                console.log(err);
            }
            console.log('The data from user table: \n',rows);
    
        });
    });
}

//update user
exports.update = (req,res) => {
    //res.render('edit-user');
    const { first_name, last_name, email, phone, Hobbies, comments} = req.body;
    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log('Connected as ID ' + connection.threadId);
    
        //User the connection
        connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?,Hobbies = ?, comments = ? WHERE id = ?',[first_name,last_name,email,
            phone,Hobbies,comments, req.params.id],(err,rows) => {
            //when done with the connection , release it
            connection.release();
    
            if(!err) {
                pool.getConnection((err,connection) => {
                    if(err) throw err;
                    console.log('Connected as ID ' + connection.threadId);
                
                    //User the connection
                    connection.query('SELECT *FROM user WHERE id = ?',[req.params.id],(err,rows) => {
                        //when done with the connection , release it
                        connection.release();
                
                        if(!err) {
                            res.render('edit-user',{ rows, alert: `${first_name} has been uodated` });
                        }
                        else {
                            console.log(err);
                        }
                        console.log('The data from user table: \n',rows);
                
                    });
                });
            }else {
                console.log(err);
            }
            console.log('The data from user table: \n',rows);
    
        });
    });
}


//Delete user
exports.delete = (req,res) => {
    //res.render('edit-user');
    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log('Connected as ID ' + connection.threadId);
    
        //User the connection
        connection.query('DELETE FROM user WHERE id = ?',[req.params.id],(err,rows) => {
            //when done with the connection , release it
            connection.release();
    
            if(!err) {
                res.redirect('/');
            }
            else {
                console.log(err);
            }
            console.log('The data from user table: \n',rows);
    
        });
    });
}



//Viewall Users
exports.viewall = (req,res) => {
    //Connect to DB
    pool.getConnection((err,connection) => {
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);

    //User the connection
    connection.query('SELECT *FROM user WHERE id = ?',[req.params.id],(err,rows) => {
        //when done with the connection , release it
        connection.release();

        if(!err) {
            res.render('view-user',{ rows });
        }
        else {
            console.log(err);
        }
        console.log('The data from user table: \n',rows);

    });
});
}