const mv = require('mv');

   // File Upload Function
   exports.uploadFile = (file, path) => {
    return new Promise(async (resolve, reject) => {
      var imgArr = [];
      for (let i = 0; i < file.length; i++) {
        const timeStampInMs = new Date().getTime();
        const time = timeStampInMs + i;
        const newFilename = time + '_' + file[i].originalname;
        const oldpath = file[i].path;
        const newpath = path + newFilename;
        mv(oldpath, newpath, function (err) {
          if (err) {
            reject(err);
          }
          var obj = {
            'name': newFilename,
            'size': file[i].size
          };
          imgArr.push(obj);
          if (i == file.length - 1) {
            resolve(imgArr);
          }

        });

      }

    });
  }
