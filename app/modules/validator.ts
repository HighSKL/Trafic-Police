export const validator = (regExp: RegExp, errorName: string, setErrorsState:(errorName:string, removeError?:boolean)=>void, value: string) => 
regExp.test(value)?setErrorsState(errorName, true):setErrorsState(errorName)

export const validatorAuth = <FieldErrorType>(regExp: RegExp, errorType:FieldErrorType, value: string, errorSet:any) => regExp.test(value)?true:errorSet(errorType)