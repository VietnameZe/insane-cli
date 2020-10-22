const request = require('request')

class Data {
    pattern1 = /\bhttps?::\/\/\S+/gi
    pattern2 = /\bhttps?:\/\/\S+/gi   
    
    constructor(dts) {
      this.dts = dts
    }
  
    // Calculate the total for the set of numbers
    

    getURLandPrint() {
        let dataInput = this.dts
        let finalURLs = this.getURLs(dataInput)
        this.printURLStatus(finalURLs)
    }

    
  
    // Calculate the average for the set of numbers
    getURLs(data) {
        let finalURLs = []
        // console.log(data + "Xxxxxxxxx")
        let tempArr = data.toString().split(/[({\\<"^`|>})]/)
    
        for (let i = tempArr.length; i--;) {
            let tmp = (tempArr[i].match(this.pattern1) || tempArr[i].match(this.pattern2)) != null ?
                tempArr[i].match(this.pattern1) || tempArr[i].match(this.pattern2) : ""
    
            if (tmp.length === 1) {
                if (tmp !== "") finalURLs.push(tmp[0])
            } else {
                for (let i = tmp.length; i--;) {
                    finalURLs.push(tmp[i])
                }
            }
        }
        finalURLs = [...new Set(finalURLs)]
        return finalURLs
    }
    printURLStatus(urls) {

        for (let i = urls.length; i--;) {
            try {
                request(urls[i], { method: 'HEAD', timeout: 1800 }, function (error, response, body) {
    
                    //console.error('error:', error);
                    let status = response && response.statusCode
                    if (status !== null) {
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
                })
            } catch (error) {
                console.error('WTF - ' + urls[i].yellow)
            }
        }
    }
    printURLStatusByFlag(flag) {
        let urls = this.getURLs(this.dts)


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
  }
  
  // Export our Data class
  module.exports.Data = Data;