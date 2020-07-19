// init
const express = require("express");
const app = express();
const _Port = process.env.PORT || 3000;

module.exports = {
    execute: (client) => {
        // static
        app.use(express.static("public"));
    
        // routing
        app.get("/", (req, resp) => {
            resp.json({
                sttus:"ok"
            });
        })
    
        app.listen(_Port, (e)=>{
            console.log(`Listening to Port: ${_Port}`);
        })
    }
}