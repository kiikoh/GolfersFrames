const sharp = require("sharp");
const { encode } = require("blurhash");
const fs = require("fs").promises
const json = require("./src/master.json")

const encodeImageToBlurhash = path =>
  new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(128, 128, { fit: "inside" })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err);
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 8, 5));
      });
  });

Promise.all(json.map((course) => {
    return Promise.all(course.assets.holes.map((photo => {
        return encodeImageToBlurhash(`./public/assets/${course.folder}/${photo.url}`)
            .then(hash => {
                return {
                    ...photo,
                    blurhash: hash
                }
            })
    })))
})).then(values => console.log(values))




encodeImageToBlurhash("./public/assets/NJN/hole1.jpg").then(hash => {
  console.log(hash);
});