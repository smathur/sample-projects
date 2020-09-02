const http = require('http')
const url = require('url')

const server = http.createServer((req,res) => {
    const parsedURL = url.parse(req.url)
    console.log(parsedURL)
    res.end("Hello World")
})

server.listen(3000)