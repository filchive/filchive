# Filchive

*A FileCoin Version of Internet Archive*

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

##Usage
###Configuration
config the 'lotus' part of conf.js or set the Lotus API URL and token in your environment variable 
config the retrievePath of conf.js and make sure your Lotus daemon has the write permission
```bash
# run app
node ./server.js [port]


