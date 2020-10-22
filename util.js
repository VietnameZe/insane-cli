
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

module.exports = {
    readFiles
  };

