const fs = require("fs").promises;
const inquirer = require("inquirer")
const sharp = require("sharp");
const { encode } = require("blurhash");
const path = require("path")
const json = require("./src/master.json")
const clipboard = require("clipboardy")

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

const run = async () => {
    const courseInfo = await inquirer.prompt([
        {
            type: 'input',
            name: 'courseName',
            message: "What is the name of the course?"
        },
        {
            type: 'input',
            name: 'folder',
            message: "Which folder should be loaded?"
        },
        {
            type: 'input',
            name: 'slug',
            message: "What url should be used for the website?"
        },
        {
            type: "confirm",
            name: "public",
            message: "Should this course be visible on the home page?"
        }
    ])

    const files = (await fs.readdir(path.join(__dirname, courseInfo.folder)))
        .filter(file => file.endsWith(".jpg") || file.endsWith(".png"))

    let responses = [];
    
    for(const file of files) {
        console.log()
        const input = await inquirer.prompt([
            {
                type: "input",
                name: "description",
                message: "Description for " + file
            },
            {
                type: "number",
                name: "yards",
                message: "Yards for " + file
            },
            {
                type: "number",
                name: "par",
                message: "Par for " + file
            },
        ])

        const blurhash = await encodeImageToBlurhash(path.join(__dirname, courseInfo.folder, file));

        responses.push({url: file, ...input, blurhash})
    }

    //append to master.json file, using slug to check if it exists, if exists, ask to overwrite

    const course = {
        ...courseInfo,
        assets: {
            logo: "logo.png",
            holes: responses
        }
    }


    if(json.find(({slug}) => slug === course.slug)) { // Slug already exists
        const { conflict } = await inquirer.prompt([{
            type: "list",
            name: "conflict",
            message: `Slug ${course.slug} already exists... Overwrite the JSON?`,
            choices: [
                {
                    name: "Append all holes in folder to the existing course",
                    value: "append"
                },
                {
                    name: "Overwrite the existing course, entirely",
                    value: "overwrite"
                },
                {
                    name: "Copy the generated course JSON to my clipboard only",
                    value: "clipboard"
                }
            ]
        }])

        if(conflict === "overwrite") {
            fs.writeFile("./src/master.json", JSON.stringify([
                    ...json.filter((({slug}) => course.slug !== slug)), // remove the original slug
                    course
                ],
            null, 4))
            await fs.rmdir(path.join(__dirname, "public/assets", course.folder), { recursive: true })
            await fs.mkdir(path.join(__dirname, "public/assets", course.folder))
            await Promise.all(files.map((file) => {
                return fs.copyFile(path.join(__dirname, course.folder, file), path.join(__dirname, "public/assets", course.folder, file))
            }))
            console.log("Successfully completed image load!")
        } else if(conflict === "copy") {
            clipboard.writeSync(JSON.stringify(course, null, 4))
            console.log("Course JSON succesfully copied to clipboard, paste it in src/master.json")
        } else if(conflict === "append") {
            const toModify = json.find(({slug}) => slug === course.slug);
            toModify.assets.holes.push(course.assets.holes);
            await Promise.all(files.map((file) => {
                return fs.copyFile(path.join(__dirname, course.folder, file), path.join(__dirname, "public/assets", course.folder, file))
            }))
        }

    } else {
        const { confirm } = await inquirer.prompt({
            type: "confirm",
            name: "confirm",
            message: "Confirm changes?",
            default: true
        })

        if(confirm) {
            fs.writeFile("./src/master.json", JSON.stringify([...json, course], null, 4))
            await fs.mkdir(path.join(__dirname, "public/assets", course.folder))
            await Promise.all(files.map((file) => {
                return fs.copyFile(path.join(__dirname, course.folder, file), path.join(__dirname, "public/assets", course.folder, file))
            }))
            console.log("Successfully completed image load!")

        } else {
            clipboard.writeSync(JSON.stringify(course, null, 4))
            console.log("Aborting changes, saved progress to clipboard.")
        }
    }

}

    

run();

