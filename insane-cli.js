#!/usr/bin/env node

const fs = require('fs')
const readline = require('readline')
const colors = require('colors')
const request = require('request')
const { url } = require('inspector')
const { Data } = require('./data');
const { Util } = require('./util');
const { readFiles } = require('./util')
const util = require('./util')

// wayback api
const waybackApi = "http://archive.org/wayback/available?"


// let filename = process.argv[2]
// if(process.argv.length === 3)
let argv3 = process.argv[2]
let argv4 = process.argv[3]

const readIgnoreFile = async () => {
    let ignoreURL = []
    const fileStream = fs.createReadStream(process.argv[4])
    const rl = readline.createInterface({
        input: fileStream,
    })

    for await (const line of rl) {
        if (!line.startsWith('#')) {
            ignoreURL.push(line)
        }
    }
    return ignoreURL
}

if (argv3 != null) {
    if (argv4 != null) { // for URL process
        if (argv3 === '-url' || argv3 === '/url') {
            request(argv4, function (error, response, body) {
                if (response.statusCode === 200) { // only process url with statusCode 200
                    
                    new Data(body).getURLandPrint()

                } else {
                    console.log('Bad link'.red)
                }
            })

        } else if (argv3 === '-w' || argv3 === '/w') {
            // This is for searching webpage in wayback machine
            // usage syntax: insane-cli -w url yyyy-mm-dd-hh-ss
            // The timestamp is optional, and if not provided, it will
            // retrieve the lates archived version of the page
            let timeStamp = ""
            if (process.argv[4]) {
                timeStamp = process.argv[4]
            }
            const url = `${waybackApi}url=${argv4}&timestamp=${timeStamp}`
            request(url, function (error, response, body) {
                const { archived_snapshots } = JSON.parse(body)
                if (Object.keys(archived_snapshots).length === 0 && archived_snapshots.constructor === Object) {
                    console.log("No archived record found")
                }
                else {
                    const year = archived_snapshots.closest.timestamp.substring(0, 4)
                    const month = archived_snapshots.closest.timestamp.substring(4, 6)
                    const day = archived_snapshots.closest.timestamp.substring(6, 8)
                    const hour = archived_snapshots.closest.timestamp.substring(8, 10)
                    const min = archived_snapshots.closest.timestamp.substring(10, 12)
                    const sec = archived_snapshots.closest.timestamp.substring(12, 14)
                    console.log(`Archived URL: ${archived_snapshots.closest.url}`)
                    console.log(`Archived Time: ${year}-${month}-${day} ${hour}-${min}-${sec}`)
                }
            })
        } else if (argv3 === '-j' || argv3 === '--json' || argv3 === '/j') {
            // do something to print JSON from here

            let filename = argv4

            try {
                if (fs.existsSync(filename)) { // check if file exist
                    (async () => {
                        await fs.promises.readFile(filename)
                            .then(function (data) {

                                let finalURLs = new Data().getURLs(data)
                                printURLStatusInJSON(finalURLs)

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

        } else if (argv3 === '--all' || argv3 === '--good' || argv3 === '--bad') {
            ///////////////

            let filename = argv4

            try {
                if (fs.existsSync(filename)) { // check if file exist
                    (async () => {
                        await fs.promises.readFile(filename)
                            .then(function (data) {

                                new Data(data).printURLStatusByFlag(argv3) // argv3: flag (--good, etc)

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

        } else if (argv4 === '-i' || argv4 === '--ignore') {
            readIgnoreFile().then(lists => {
                let filename = argv3

                try {
                    if (fs.existsSync(filename)) { // check if file exist
                        (async () => {
                            await fs.promises.readFile(filename)
                                .then(function (data) {
                                    let finalURLs = new Data().getURLs(data)
                                    finalURLs = finalURLs.filter(url => {
                                        let flag = true
                                        for (let i = 0; i < lists.length; i++) {
                                            if (url.includes(lists[i])){
                                                flag = false
                                            } 
                                        }
                                        return flag
                                    })
                                    printURLStatus(finalURLs)

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
        } else {
            console.log('Command not found!')
        }
    } else {
        if (argv3 === '--version' || argv3 === '/v') {
            console.log('Insane-CLI Version 1.0'.green)
        } else { // for local file process, read and process
            let filename = argv3

            util.readFiles(filename).then( urls => {
                new Data(urls).getURLandPrint()
            })

        }
    }

} else {
    util.showHelp()
}


function printURLStatusByFlag(urls, flag) {

    for (let i = urls.length; i--;) {
        try {
            request(urls[i], { method: 'HEAD', timeout: 1800 }, function (error, response, body) {

                //console.error('error:', error);
                let status = response && response.statusCode
                if (status !== null) {
                    // if (status === 200) {
                    //     console.log('[' + status + ']GOOD - ' + urls[i].green)
                    // } else if (status === 400 || status === 404) {
                    //     console.log('[' + status + ']BAD - ' + urls[i].red)
                    // } else if (status === 301 || status === 307 || status === 308) {
                    //     console.log('[' + status + ']REDIRECT - ' + urls[i].blue)
                    // } else {
                    //     console.log('UNKNOWN - ' + urls[i].grey)
                    // }
                    if (flag === '--good') {
                        if (status === 200) {
                            console.log('[' + status + ']GOOD - ' + urls[i].green)
                        }
                    } else if (flag === '--bad') {
                        if (status === 400 || status === 404) {
                            console.log('[' + status + ']BAD - ' + urls[i].red)
                        }
                    } else if (flag === '--all') {
                        if (status === 200) {
                            console.log('[' + status + ']GOOD - ' + urls[i].green)
                        } else if (status === 400 || status === 404) {
                            console.log('[' + status + ']BAD - ' + urls[i].red)
                        } else if (status === 301 || status === 307 || status === 308) {
                            console.log('[' + status + ']REDIRECT - ' + urls[i].blue)
                        } else {
                            console.log('UNKNOWN - ' + urls[i].grey)
                        }
                    }
                }
            })
        } catch (error) {
            console.error('WTF - ' + urls[i].yellow)
        }
    }
}

function printURLStatusInJSON(urls) {

    var res = []

    let str = ""
    for (let i = urls.length; i--;) {
        getObj(urls[i]).then((data) => {
            console.log(JSON.parse(JSON.stringify(data)))
        })
    }

    console.log(str)
}

function getObj(input) {
    return new Promise((resolve, reject) => {
        try {
            request(input, { method: 'HEAD', timeout: 1800 }, function (error, response, body) {

                //console.error('error:', error);
                let status = response && response.statusCode
                if (status !== null) {
                    var obj = {
                        url: input,
                        statuscode: status
                    }
                    resolve(obj)
                }
            })
        } catch (error) {
            //console.error('WTF - ' + urls[i].yellow)
        }
    })
}
