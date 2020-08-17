const fetch = require('node-fetch')
const {BigQuery} = require('@google-cloud/bigquery')

// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(res => checkStatus(res))
//     .then((res) => res.json())
//     .then(data => {
//         console.log(data.length)
//     })
//     .catch(err => console.log("Error Occurred - " + err.statusText))

const posts = [
    {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\n' +
        'suscipit recusandae consequuntur expedita et cum\n' +
        'reprehenderit molestiae ut ut quas totam\n' +
        'nostrum rerum est autem sunt rem eveniet architecto'
    },
    {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body: 'est rerum tempore vitae\n' +
        'sequi sint nihil reprehenderit dolor beatae ea dolores neque\n' +
        'fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\n' +
        'qui aperiam non debitis possimus qui neque nisi nulla'
    }
]


LoadJSON()

async function LoadJSON() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()  
    console.log("Fetch Count: " + posts.length)
    pushJSONToBQ(posts)
}


async function pushJSONToBQ(posts) {
    const bqClient = new BigQuery()
    const t = await bqClient.dataset("shopify_littledata").table("Comments")
    await t.insert(posts)
    t.getRows().then(data => console.log("Inserted Row Count: " + data.length))
}

function checkStatus(res) {
    if (res.status >= 200 && res.status < 300)
        return res
    else {
        let err = new Error(res.statusText)
        err.response = res
        throw err
    }
}

