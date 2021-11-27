const sharp = require("sharp");
const { encode } = require("blurhash");
const fs = require("fs").promises
const json = require("./src/master.json")

const encodeImageToBlurhash = path =>
  new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(5*20, 5*9, { fit: "inside" })
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
    }))).then(holes => {
        return {
            ...course,
            assets: {
                ...course.assets,
                holes
            }
        }
    })
})).then(output => fs.writeFile("./src/master.json", JSON.stringify(output, null, 4)))
