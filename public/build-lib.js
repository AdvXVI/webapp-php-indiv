import fs from "fs";
import path from "path";

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

const libs = [
  {
    src: "node_modules/jquery/dist/jquery.min.js",
    dest: "public/dist/jquery/jquery.min.js",
  },
  {
    src: "node_modules/jquery-validation/dist/jquery.validate.min.js",
    dest: "public/dist/jquery-validation/jquery.validate.min.js",
  },
  {
    src: "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
    dest: "public/dist/bootstrap/bootstrap.bundle.min.js",
  },
  {
    src: "node_modules/bootstrap-icons/font/",
    dest: "public/dist/bootstrap-icons/",
  },
];

for (const { src, dest } of libs) {
  console.log(`Copying ${src} → ${dest}`);
  copyRecursive(src, dest);
}

console.log("Node_Modules -> Libraries successful");
