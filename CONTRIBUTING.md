## Clone and change to working directory

```
git clone https://github.com/VietnameZe/insane-cli.git
cd insane-cli
```

## Required dependencies

Install [colors](https://www.npmjs.com/package/colors), [request](https://www.npmjs.com/package/request):

```
npm i --save colors request
```

## Install Prettier
```
npm install --save-dev --save-exact prettier

// run script
npx prettier --write .
```


## Install ESLint
```
npm install eslint --save-dev

// Set up a configuration file
npx eslint --init

// usage
npx eslint fileName.js

```

## Install Prettier & ESLint extension for VS Code
```
Prettier & ESLint in 'extension' section. 
```



## To run globally

You need to use `npm link` in `insane-cli` directory to run CLI in form: `insane-cli <args-see-below>`.
Otherwise you can use syntax: `node insane-cli <args-see-below>` to run.
In rare case, you might need executive permission for `insane-cli.js`. If problem occurs, use `chmod +x insane-cli.js`
