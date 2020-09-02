/*
Ask a list of questions to the user, collect answers and 
print an output string using the answers collected.
Do not use loops, use callback functions, recursion.

Design Asynchronous Flow
    - The body of the callback function will be provided as a parameter (anonymous function) 
    at the time of invocation of the function (f).
    - Once the tasks to be perform by function (f) is complete, call the callback function (c) 
    to pass the results to the caller as a parameter to the callback function. 
    - The next operations to be performed with the result of function (f) should go in the body
    of the callback function (c)
*/
const readline = require('readline')
const { EventEmitter } = require('events')
const emitter = new EventEmitter()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

module.exports.QAEventsEmitter = emitter

//Default Export
module.exports.collectAnswer = (questions, done) => {  
    const [firstQuestion] = questions
    const answers = []

    const questionAnswered = (answer) => {
        //Fire an event when a question is answered
        emitter.emit("Answered", answer)
        //Push the answer in an array 
        if (answers.push(answer) < questions.length) {
            //if length of answer array is less than questions array
            //ask the next question
            rl.question(questions[answers.length], questionAnswered)
        }
        else {
            //Invoke the callback function provided as the second parameter
            //Pass the result as paramter to the callback function
            emitter.emit("Done", answers)
            done(answers)
        }
    }
    //Ask the first question
    rl.question(firstQuestion, questionAnswered)
    //return the event emitter object
    return emitter;
}