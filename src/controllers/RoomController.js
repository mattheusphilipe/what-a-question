const Database = require('../db/config');

module.exports = {
async create(request, response) {

    try {

        const db = await Database();
        let roomId;
        const { password } = request.body;

        for (let i = 0; i < 6;i++) {
            i == 0
             ? roomId = Math.floor(Math.random() * 10).toString()
            : roomId += Math.floor(Math.random() * 10).toString()
        }

        db.run(`
            INSERT INTO rooms (id, pass) 
            VALUES(${parseInt(roomId)}, ${password})`);

        db.close();
        response.redirect(`/room/${roomId}`);
        
    } catch (err) {
        console.error(err)
    }

        
        
    }
}