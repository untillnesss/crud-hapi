import fs from 'fs'

const fileName = 'books.json'

const Utils = {
    //get the Book data from json file
    getBookData: () => {
        const jsonData = fs.readFileSync(fileName)
        return JSON.parse(jsonData)
    },
    //read the user data from json file
    saveUserData: (data) => {
        const stringifyData = JSON.stringify(data)
        fs.writeFileSync(fileName, stringifyData)
    }
}

export default Utils;