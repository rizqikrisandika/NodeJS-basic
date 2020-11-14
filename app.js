const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express()
const port = 3000
//konfigurasi koneksi db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'viruz99',
    database: 'crud-nodejs'
});
//konek db
connection.connect((error) => {
    if(error) throw error;
    console.log('Database Connected');
});
//set views direktori
app.set('views',path.join(__dirname,'views'));
//set folder public static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));


app.get('/',(req,res)=>{
    let sql = "SELECT * FROM produk";
    let query =  connection.query(sql,(error, results)=>{
        res.render('produk.ejs',{produk: results});
    });   
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});