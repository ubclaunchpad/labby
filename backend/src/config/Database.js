import mysql from "mysql";

export class Database {


    connection;
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    connect() {
            this.connection.connect(function (err) {
                if (err) {
                    console.error('Database.js connection failed: ' + err.stack);
                    return;
                }

                console.log('Connected to database.');
            });
    }



    close() {
        this.connection.end();
    }
}