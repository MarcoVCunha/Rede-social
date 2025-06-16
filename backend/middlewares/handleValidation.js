const {validationResult} = require('express-validator') // Import validationResult from express-validator

const validate = (req, res, next) => { 
    const errors =  validationResult(req) // Get validation errors from the request

    if(errors.isEmpty()){
        return next()
    } // If there are no errors, proceed to the next middleware

    const extractedErrors = [] // Initialize an array to hold the error messages

    errors.array().map((err) => extractedErrors.push(err.msg)) // Map through the errors and push the error messages into the extractedErrors array

    return res.status(422).json({
        errors: extractedErrors
    }) // Return a 422 status code with the extracted error messages
}
module.exports = validate