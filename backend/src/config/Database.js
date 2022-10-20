import mysql from "mysql";
import connection from "mysql/lib/Connection.js";
import * as dotenv from 'dotenv'
dotenv.config({path:"../../env"})
export class Database {


    connection;

    connect() {
        this.connection = mysql.createConnection({
            host: process.env.RDS_HOSTNAME,
            user: process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
            port: process.env.RDS_PORT
        });
        this.connection.connect(function(err) {
            if (err) {
                console.log(connection.port);
                console.error('Database.js connection failed: ' + err.stack);
                return;
            }

            console.log('Connected to database.');
        });
    }

    isConnected() {
        return this.connection.isConnected();
    }

    close() {
        this.connection.end();
    }
}