const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
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
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    let sql = 'SELECT * FROM produk';
    let query =  connection.query(sql,(error, results)=>{
        res.render('produk.ejs',{produk: results});
    });   
});

app.get('/tambah_produk',(req,res)=>{
    res.render('form_tambah.ejs');
});

app.post('/tambah',(req,res)=>{
    let sql = 'INSERT INTO produk SET ?';
    let data = {nama : req.body.nama,harga : req.body.harga};
    let query = connection.query(sql, data,(error, results)=>{
        res.redirect('/');
    });
});


app.listen(port, () => {
    console.log(`Aplikasi berjalan di port ${port}!`)
});