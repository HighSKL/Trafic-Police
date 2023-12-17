export let addPeopleErrorsArr: string[] = []

//@ts-ignore
window.errarr = addPeopleErrorsArr

export let setAddPeopleErrorsArr = (newArr:string[]) => {
    addPeopleErrorsArr = newArr
}