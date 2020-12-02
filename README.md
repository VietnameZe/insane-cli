# insane-cli

## Run program

```
// INSTALL
npm install insane-cli

// HELP
insane-cli

// check insane-cli version
insane-cli --version  or  /v

// check links which are extracted from file named 'sample.txt'
insane-cli sample.txt

// check links which are extracted from file named 'sample.txt' excluding URLs in ignore.txt
insane-cli sample.txt  -i ignore.txt

// // check links of body's webpage by URL
insane-cli -url https://www.google.com

// Search in wayback machine
insane-cli -w https://finance.yahoo.com 2016

// Check links from Telescope 10 latest posts
insane-cli -telescope http://localhost:3000/posts

```
