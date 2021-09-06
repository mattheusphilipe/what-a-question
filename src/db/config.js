const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

module.exports = function() {
    return open({
        filename: './src/db/whatQuestion.sqlite',
        driver: sqlite3.Database,
    });
}