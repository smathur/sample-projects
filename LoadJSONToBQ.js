const fetch = require('node-fetch')
// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(res => checkStatus(res))
//     .then((res) => res.json())
//     .then(data => {
//         console.log(data.length)
//     })
//     .catch(err => console.log("Error Occurred - " + err.statusText))

const jsonPosts = LoadJSON()
console.log (jsonPosts)
const {Storage} = require('@google-cloud/storage')
const storage = new Storage()






function checkStatus(res) {
    if (res.status >= 200 && res.status < 300)
        return res
    else {
        let err = new Error(res.statusText)
        err.response = res
        throw err
    }
}

async function LoadJSON() {
    const posts = ["test"]
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        posts = await res.json()  
    } catch (err) {
        console.log("Unable to fetch data")
    }
    console.log("Reached last line")
    return posts
}
