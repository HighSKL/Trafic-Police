export const validator = <FieldErrorType>(regExp: RegExp, errorName: string, setErrorsState:any, value: string) => 
// regExp.test(value)?console.log('good'):console.log('Shit')

// regExp.test(value)?setErrorsState(()=>errorsContainer.map((error)=>{
//     if(error !== errorName)
//         return error;
// })):setErrorsState(()=>errorsContainer.push(errorName))

// regExp.test(value)?setErrorsState(errorName):setErrorsState(errorName, true)
regExp.test(value)?setErrorsState(errorName, true):setErrorsState(errorName)