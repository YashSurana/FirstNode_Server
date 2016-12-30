var express = require('express')
var app = express()
var fs= require('fs')
var path = require('path')
var bodyParser = require('body-parser')
app.use( bodyParser.json() )       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})) 
//app.use(express.json())       // to support JSON-encoded bodies
//app.use(express.urlencoded()) // to support URL-encoded bodies
app.use(express.static('public'))

fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
  if (err) return console.log(err)
  console.log('Hello World > helloworld.txt')
});

app.get('/content_form.html', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/content_form.html'))
})
app.get('/retailer', function (req, res) {
console.log('hi get')
	fs.readFile('retailer.json','utf8',function(err,data){
	console.log('read')
		res.send(data)
		//console.log(data)
		//res.end(data)
	});
})

app.post('/retailer/add', function (req, res) {
	console.log(req.body.headerHtml);
	fs.writeFile('header.htm', req.body.headerHtml, function (err,data) {
	if (err) return console.log(err)
	console.log('Hello World > helloworld.txt')
	res.send(data);
	});
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})