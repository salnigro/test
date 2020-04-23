const {OAuth2Client} = require('google-auth-library');
const fs = require('fs');

const CREDENTIALS = JSON.parse(fs.readFileSync('credentials.json','utf8'));
const CLIENT_ID = CREDENTIALS.web.client_id;
const GOOGLE_CLIENT = new OAuth2Client(CLIENT_ID);

module.exports = {
    verifyIdToken: async(req,res, next) =>{
        try{
            const token =  req.header('Authorization').substring(7);
            const ticket = await GOOGLE_CLIENT.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            req.payload = ticket.getPayload();
            next();
        } catch(exception){
            res.writeHead(401);
            res.end();
        }
    }
}