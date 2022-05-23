// 1. Импорт всех требуемых модулей
const path = require('path');
const fs = require('fs');

//2. Чтение содержимого папки **styles**
const folder = 'styles';
const pathFolder = path.join(__dirname, folder);

const bundleFolder = 'project-dist';
const bundlePath = path.join(__dirname, bundleFolder);

const writeBundleStream = fs.createWriteStream(path.join(bundlePath, 'bundle.css'), 'utf-8');
writeBundleStream.write('');

fs.readdir(pathFolder, {withFileTypes: true}, (err, files)=>{
  if (err) throw err;
  files.forEach(item=>{
    //3. Проверка является ли объект файлом и имеет ли файл нужное расширение
    if (item.isFile() && path.extname(item.name) == '.css') {
      //4. Чтение файла стилей
      fs.createReadStream(path.join(pathFolder, item.name), 'utf-8').on('data', chunk=>{
        //5. Запись прочитанных данных в массив  //6. Запись массива стилей в файл **bundle.css**
        writeBundleStream.write(chunk, err=>{
          if (err) throw err;
        });
      });
    }
  });
});

