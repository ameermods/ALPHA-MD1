const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0VOWFhvZEVJUWFkY282TVNmdzlmOGhrMlhGdWNNQXZSOUo4c3NoRzRXMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSTA3ckRaRkw1WkNCSU0wRGtyZ1UyQmpJcnlEb3cyMFBIZWdyWTdMcC9sdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNSXJjcUxsbjBUa1FuZ3QwOTMvc0ErdWhqazExZ0lJTUtRNkFBTytFSjFzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6RWtvMVZ5aDBiS1R4T1paK2ZZRm92R003UFdYYnhKVmM2QWhTNHIxNWlRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlEa1ppYUsxWHliZklid0Rpc01ydjhxRzRvcmNhdEtoT3lSV3NWVlFJRlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBiZWZmcExUdXVrcWxha0cxazdkYVBjK044a1Z1MGFMbG0xZ09melQweVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0VQdmxCZzJwcGNORzNXeFJGK1Bpb3BLZ1V4V3F0NlZXNXFzem9ORGVVQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHVEa0VEVy90cGZGSkE0QUhBak1pMzF0azk3Ynd6S1NvcEl0VDJjVUhtST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFJRjU1RTlodWwvTDZHVStmeFNLK1B4WERid3d1TG5oakZEckVaYTM1V3ozeVJzYUwvb2FjcFdmWDBRNXFoNFdEY0Z5MnRjc25wUmhVUFpHeFVSaWlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjksImFkdlNlY3JldEtleSI6ImlrbG91bWt2Y3ljRmZmNWVUYkx0U3N6ckt3c2p1Y01ZN2dVN0JjRjdzQms9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTE3NTMwMDYwOTg4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijg1MTUzQjIxODY0QjNCMkM2MTJDMUQxMjNENDMwNTA4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjUxODk2Mjd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkxNzUzMDA2MDk4OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwREY0QkVFRDU2OUM3NTAxNkJGRjc3N0MwNjExOTA3MCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI1MTg5NjI3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJSSHVMYjFrUFJlLXc1c0trMTc4QVRBIiwicGhvbmVJZCI6IjBjNzcyYzZjLTI2YWUtNGZjZi1hNTlmLWMzMTg3YTFkNzQyMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzNXZPbjUvS0VzM1ZCZEsxZmI5ZldDd3hIU009In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTWlMUmFlRjNCYUZDUDdySGJEcHcyb2N1TUhZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjlBVzFWOUhYIiwibWUiOnsiaWQiOiI5MTc1MzAwNjA5ODg6NzFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4LSF4LWU4a2E4LW0IOC1reCwjOC1vCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTXZHc3ZBSEVPdWIwYllHR0FjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiN2tPTm5zZnhFRFNWdDJteXJzcWR0bTRyUDBZUkUwdUY1NHhSYldsVGt6VT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWWJETUVoTXp1WjJtc0t6cHJnZW9RZXMwcTJDa0Y3bzExSHpHK0FQSVVsTDFMTE1RUEdiNGczR1dnbXU5aXRNdm5VaHdOOW9YdFAyME9NRVpiZDlEQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6IllDdnpxaGpmdEpFU3l6UFJVQkVrTkQ3RHZLd2pKMUtvNUkyakdBYk96NldOWHdCZ3ZWZHVrNS9ibThOWlhTajhOVHErWC9rUUs0NUwybzJmWVJic2hRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE3NTMwMDYwOTg4OjcxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmU1RGpaN0g4UkEwbGJkcHNxN0tuYlp1S3o5R0VSTkxoZWVNVVcxcFU1TTEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjUxODk2MjQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUGh3In0=',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "Ameer",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Ameer God",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐌𝐄𝐄𝐑-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://ik.imagekit.io/eypz/1725168688493_RSjq1BK9I.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
