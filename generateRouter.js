import fs from "fs";
import path from "path";

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
            const filePath = `${file.parentPath}/${file.name}`;
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

const root = path.join(import.meta.dirname, "src", "app");
console.log(root);
const arr = await findDir(root);
console.log(arr);
const pages = {};
arr.forEach((e) => {
  const solve = e.split("/");
  const strKey = Array.from(String(solve[solve.length - 1]));
  const key = [
    strKey[0].toUpperCase(),
    [...strKey.slice(1, strKey.length)].join(""),
  ].join("");
  pages[key] = e + "/page.jsx";
});

fs.writeFile("./coponents.json", JSON.stringify(pages), "utf8", (err) => {
  if (err) throw err;
});
