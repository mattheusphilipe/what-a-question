const Database = require('../db/config');

module.exports = {
async create(request, response) {

    try {
            const db = await Database();
            let roomId;
            let isThereRoomId = false;
            const { password } = request.body;

            do {

                for (let i = 0; i < 6;i++) {
                    i == 0
                    ? roomId = Math.floor(Math.random() * 10).toString()
                    : roomId += Math.floor(Math.random() * 10).toString()
                }

                const roomsExistIds = await db.all(`
                    SELECT id FROM rooms
                `);

                
                isThereRoomId = roomsExistIds.some(idRoom => idRoom === roomId);

                if (!isThereRoomId) {
                    db.run(`
                    INSERT INTO rooms (id, pass) 
                    VALUES(${parseInt(roomId)}, ${password})`);
                }
            } while(isThereRoomId);


        await db.close();

        response.redirect(`/room/${roomId}`);

    } catch (err) {
        console.error(err)
    }

        
        
    },

    async open(request, response) {
        // params valores separados por / => room/:roomId/
        // quando é query eles sao atributos após o ? eseparados por vírgula id=2
       
        try{

            const { roomId } = request.params; 
            const db = await Database();

            const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND status = 0`);
            const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND status = 1`);
            let isQuestions = true;
            
            if(!questions.length && !questionsRead.length) {
                isQuestions = false;
            }
            
            await db.close();

            return response.render("room", {roomId, questions, questionsRead, isQuestions});
        
        } catch(err) {
            console.error(err);
        }
    },

    enter(request,response) {
        const { roomId } = request.body;

        response.redirect(`/room/${roomId}`);
    }

}