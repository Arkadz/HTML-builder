const path = require('path');
const fs = require('fs');
const { stdout, stdin } = process;

const file = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(file, 'utf-8');

stdout.write('Hello! Enter text:\n');
writeStream.write('');
stdin.on('data', (chunk)=>{
  if (chunk.toString().toLowerCase().includes('exit')) {
    process.exit();
  }
  writeStream.write(chunk);
});
process.on('exit', () => stdout.write('Goodbye!'));
process.on('SIGINT', ()=> process.exit());

