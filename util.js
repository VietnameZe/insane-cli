
const fs = require("fs");
const readline = require("readline");


function readFiles(filename) {
    return new Promise((resolve, reject)=> {
        try {
                if (fs.existsSync(filename)) { // check if file exist
                    (async () => {
                        await fs.promises.readFile(filename)
                            .then(function (data) {

                                resolve(data.toString())

                            })
                            .catch(function (error) {
                                console.log(error)
                            })
                    })()
                } else {
                    console.log('File not found!')
                }
            } catch (err) {
                console.error(err)
            }
    })
}

function showHelp() {
    console.log('HOW TO USE'.bgGreen)
    console.log('------------------------------------------------'.blue)
    console.log(' insane-cli'.green + ' for instructions'.blue)
    console.log(' insane-cli [--version][/v]'.green + ' to check current version'.blue)
    console.log(' insane-cli [file-path]'.green + ' process a file'.blue)
    console.log(' insane-cli -url [full-url-link]'.green + ' process body\'s link'.blue)
    console.log(' insane-cli -j [file-path]'.green + ' print results in JSON format'.blue)
    console.log(' insane-cli [file-path] -i/--ignore [ignore.txt]'.green + ' ignore URLs in ignore.txt while testing a file'.blue)
}

module.exports = {
    readFiles,
    showHelp
  };
