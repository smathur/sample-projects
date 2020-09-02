const { collectAnswer, QAEventsEmitter } = require('./nodelearn-module')
const questions = [
    "What is your name? ",
    "What is your age? ",
    "What is your location? ",
    "What is your profession? "
]

//Second parameter specifies the callback function which will be called once the
//task is done
collectAnswer(questions, answers => {
    const [name, age, location] = answers
    console.log("Thankyou for your answers.")
    console.log(answers)
    process.exit()
})

QAEventsEmitter.on("Answered", answer => console.log(`Response Provided: ${answer}`))
QAEventsEmitter.on("Done", answers => console.log(`${answers.length} questions were answered`))