module.exports = {
    index(request, response) {
        const { room, question, action } = request.params;
        const { password } = request.body;
        console.log(room, question, action, password );
    }
}