const path = require('path');
const fs = require('fs');

const folderName = 'files';
const folderPath = path.join(__dirname, folderName);

const newFolder = 'files-copy';
const newFolderPath = path.join(__dirname, newFolder);


async function copyDir(folderPath, newFolderPath) {
    
  //удаляем директорию и ожидаем завершения удаления
  await fs.promises.rm(newFolderPath, {recursive: true, force: true}); 
    
  // создаем новую директорию
  fs.mkdir(newFolderPath, (err)=>{
    if (err) throw err;    
  }); 

  //читаем директорую 
  fs.readdir(folderPath, {withFileTypes: true}, (err, files) =>{
    if (err) throw err;
    //перебираем объект Dirent
    files.forEach(element => {
      //если файл, то копируем 
      if (element.isFile()){
        fs.copyFile(path.join(folderPath, element.name), path.join(newFolderPath, element.name), err=>{
          if (err) throw err;
        });
        //если директория, то создаем аналогичую     
      } else if (element.isDirectory()) {
        fs.mkdir(path.join(newFolderPath, element.name), {recursive: true}, err=>{
          if (err) throw err;
        });
        //копируем из папки файлы в новую папку
        copyDir(path.join(folderPath, element.name), path.join(newFolderPath, element.name));
      }
    });
  });
}

copyDir(folderPath, newFolderPath);




