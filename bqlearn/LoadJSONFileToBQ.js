const { BigQuery } = require('@google-cloud/bigquery')
const fs = require('fs')
const bq = new BigQuery()

// bq.getJobs().then(([jobs]) => {
//     jobs.map((job) => {
//         console.log(job.metadata.id)
//     })
// })

const metadata = {
    format: "JSON",
    schema: {
        fields: [
            { name: 'userId', type: 'INTEGER' },
            { name: 'id', type: 'INTEGER' },
            { name: 'title', type: 'STRING' },
            { name: 'body', type: 'STRING' }
        ],
    },
    location: 'US',
    writeDisposition: 'WRITE_TRUNCATE',
};

// const metadata = {
//     sourceFormat: 'NEWLINE_DELIMITED_JSON',
//     schema: {
//         fields: [
//             { name: 'name', type: 'STRING' },
//             { name: 'post_abbr', type: 'STRING' },
//         ],
//     },
//     location: 'US',
// };

bq
    .dataset("shopify_littledata")
    .table("Comments1")
    .load('./bqlearn/posts.json', metadata, (err, res) => { console.log(err.errors) })