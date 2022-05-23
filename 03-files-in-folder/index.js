const path = require('path');
const fs = require('fs');
const { readdir } = require('fs/promises') ;

const folder = 'secret-folder';
const folderPath = path.join(__dirname, folder);

readdir(folderPath, {withFileTypes: true}, (files, error)=>{
    if (error) throw error;
}).then(item=>{
    item.filter(dirent=>!dirent.isDirectory()).forEach(item=>{
        let result = item.name.slice(0, item.name.lastIndexOf('.')) + ' - ' + path.extname(item.name).slice(1) + ' - ';
        fs.stat(path.join(__dirname, folder, item.name), (err, stats)=>{
            if (err) throw err;
            result += (stats.size + 'bytes');
            console.log(result);
        });
    });
});





    


 



