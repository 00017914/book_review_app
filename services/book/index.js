const fs = require('fs');
const path = require('path');

// Read file synchronously with proper error handling
try {
    const rawData = fs.readFileSync(global.mock_db, 'utf8');
    const books = JSON.parse(rawData);
    module.exports = {
        getAll() {
            return books;
        },
        create(req, res) {
            let new_id = genRandId(4)
                    
            const book = req.body
    
            const new_book = {
                id: new_id,
                books : book
            }
    
            tickets.push(new_book)
            
            writeToFile(books)
            
            return new_book
        }
    }
    
    // create function for overwriting the db file updated db content
    let writeToFile = async (users) => {
        await 
            fs.writeFileSync(
                global.mock_db,
                JSON.stringify(
                    users, null, 4
                ),
                'utf8'
            )
    }
    
    // generate random id inspired by uuid
    let genRandId = (count) =>{
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        for (let i = 0; i < count; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }
    }
 catch (err) {
    console.error("Error loading mock DB:", err);
    process.exit(1);
}