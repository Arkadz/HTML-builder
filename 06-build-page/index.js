const path = require('path');
const fs = require('fs');

const projectDistPath = path.join(__dirname, 'project-dist');
const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');

//assets
async function copyDir(folderPath, newFolderPath) {
    
  await fs.promises.rm(newFolderPath, {recursive: true, force: true}); 
      
  fs.mkdir(newFolderPath, (err)=>{
    if (err) throw err;    
  }); 
  
  fs.readdir(folderPath, {withFileTypes: true}, (err, files) =>{
    if (err) throw err;
  
    files.forEach(element => {
  
      if (element.isFile()){
        fs.copyFile(path.join(folderPath, element.name), path.join(newFolderPath, element.name), err=>{
          if (err) throw err;
        });
  
      } else if (element.isDirectory()) {
        fs.mkdir(path.join(newFolderPath, element.name), {recursive: true}, err=>{
          if (err) throw err;
        });
  
        copyDir(path.join(folderPath, element.name), path.join(newFolderPath, element.name));
      }
    });
  });
}

copyDir(assetsPath, path.join(projectDistPath, 'assets'));

//html
fs.mkdir(projectDistPath, {recursive: true}, (err)=>{
  if (err) throw err;
});
  
let buffer = '';
  
fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data)=>{
  if (err) throw err;
  buffer += data;
  fs.readdir(componentsPath, {withFileTypes: true}, (err, files)=>{
    if (err) throw err;  
    files.forEach(file=>{
      if (file.isFile() && path.extname(file.name) === '.html') {
        fs.readFile(path.join(componentsPath, file.name), 'utf-8', (err, data)=>{
          if (err) throw err;
          const replacedBlock = '{{' + path.parse(file.name).name + '}}';
          buffer = buffer.replace(replacedBlock, data);
          fs.writeFile(path.join(projectDistPath, 'index.html'), buffer, err=>{
            if (err) throw err;
          });
        });
      }  
    });
  });
});

//css
const writeBundleStream = fs.createWriteStream(path.join(projectDistPath, 'style.css'), 'utf-8');
writeBundleStream.write('');

fs.readdir(stylesPath, {withFileTypes: true}, (err, files)=>{
  if (err) throw err;
  files.forEach(item=>{
   
    if (item.isFile() && path.extname(item.name) == '.css') {
   
      fs.createReadStream(path.join(stylesPath, item.name), 'utf-8').on('data', chunk=>{
   
        writeBundleStream.write(chunk, err=>{
          if (err) throw err;
        });
      });
    }
  });
});

