const express = require('express')
const faker = require('faker');
const app = express()
const port = 80

app.use('/', express.static('public'));
app.use(express.json());



var data = "Real-Time Update 1";
var number = 1;

/*
app.get("/", (req, res) => {
  var html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8")
  res.status(200).send(html)
})
*/

app.get('/server-sent-events', function(req, res) {

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    var interval = setInterval(function(){
		const id = faker.random;
		const name = faker.name;
		const finance = faker.finance;
		const commerce = faker.commerce;
		const curr_time = new Date();

        _data = {"id": id.number(),
        "user": name.firstName(),
        "merchant": name.firstName(),
		"created_at": curr_time,
        "amount": finance.amount(),
        "currency": finance.currencyCode(),
        "product_id": id.number(),
        "quantity": id.number()}
	  
	    data = "Real-Time Update "+number;
        console.log("SENT: "+ JSON.stringify(_data));
		
		res.write(`data: ${JSON.stringify(_data)}\n\n`)
        number++;
    }, 60);  // one order per 60 milisecond which is 1000 orders per minute

    // close
    res.on('close', () => {
        clearInterval(interval);
        res.end();
    });
})

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}  

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})