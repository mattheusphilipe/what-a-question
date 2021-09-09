const Database = require('../db/config');

module.exports = {


    async index(request, response) {
        const { room, question, action } = request.params;
        const { password } = request.body;
        
        try {

            const db = await Database();

            // traz apenas um dado
            const { pass } = await db.get(`
                SELECT * FROM rooms WHERE id = ${room}
            `);

            console.log(room, question, action, pass === password);

            if (pass === password) {
                
                if (action === 'delete') {

                    await db.run(`DELETE FROM questions WHERE id = ${question}`);

                } else if (action === 'check') {
                    
                    const t = await db.run(`UPDATE questions SET status = 1 WHERE id = ${question}`);
                    console.log('aqui', t)
                }

                await db.close();

                
            } else {
                response.render('passincorrect',  {roomId: room});
            }


        } catch (err) {
            console.error(err);
        }

        response.redirect(`/room/${room}`);
    },

    async create(request, response) {
        const { question } = request.body;
        const { room } = request.params;

        try {

            const db = await Database();

            await db.run(`
                INSERT INTO questions (title, status, room)
                VALUES("${question}", 0, ${room})
            `);

            await db.close();

        } catch (err) {
            console.error(err);
        }
        
        response.redirect(`/room/${room}`);
    }
}