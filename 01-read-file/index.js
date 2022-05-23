const path = require('path');
const fs = require('fs');

const file = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(file, 'utf-8');
let data = '';

readableStream.on('data', chunk=>{
  data += chunk.toString();
});
readableStream.on('end', ()=>console.log(data));
readableStream.on('error', err=>console.log('Error: ' + err.message));
