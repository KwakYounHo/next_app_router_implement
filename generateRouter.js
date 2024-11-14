const fs = require("fs");
const path = require("path");

function findDir(root) {
  return new Promise((resolve, reject) => {
    try {
      fs.readdir(root, { withFileTypes: true }, (err, files) => {
        if (err) throw err;

        let result = [];
        let pending = files.length;

        if (!pending) resolve(result);

        files.forEach((file) => {
          if (file.isDirectory()) {
            filePath = `${file.parentPath}/${file.name}`;
            result.push(filePath);

            findDir(filePath)
              .then((arr) => {
                result = result.concat(arr);
                if (!--pending) resolve(result);
              })
              .catch((e) => reject(e));
          } else {
            if (!--pending) resolve(result);
          }
        });
      });
    } catch (e) {
      reject(e);
    }
  });
}

findDir(path.join(__dirname, "src", "app")).then((arr) => console.log(arr));
