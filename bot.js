const { Botkit } = require('botkit');
const { TwilioWhatsAppAdapter } = require('@botbuildercommunity/adapter-twilio-whatsapp');
const restify = require("restify");
const { MongoDbStorage } = require('botbuilder-storage-mongodb');
const { BotkitCMSHelper } = require('botkit-plugin-cms');
const { MSSQLStorage } = require('@botbuildercommunity/storage-mssql');
const sql = require('mssql');
const { SlackAdapter, SlackMessageTypeMiddleware, SlackIdentifyBotsMiddleware, SlackEventMiddleware } = require('botbuilder-adapter-slack');
// const { WebexAdapter } = require('botbuilder-adapter-webex');
const { WebAdapter } = require('botbuilder-adapter-web');
// const { FacebookAdapter, FacebookEventTypeMiddleware } = require('botbuilder-adapter-facebook');
// const { HangoutsAdapter } = require('botbuilder-adapter-hangouts');
// const { TwilioAdapter } = require('botbuilder-adapter-twilio-sms');
var express = require('express');
var app = express();
require('x-date');
var now = new Date().format('yyyy-mm-dd HH:MM:ss');
//VARIABLES DE SESION
var session = require('express-session');
app.use(session({secret: 'fd64g6fd46fdh4d1', resave: true, saveUninitialized: true}));
var skoked_id;

// Load process.env values from .env file
require('dotenv').config();

//CONEXION CON MONGO DB
/*
if (process.env.MONGO_URI) {
    storage = mongoStorage = new MongoDbStorage({
        url : process.env.MONGO_URI,
        database: "botframework",
        collection: "botframework",
        useUnifiedTopology: true
    });
}
*/

/*
// register it so it will show up in controller.plugins
controller.addPluginExtension('botframework', mongoStorage);

// use it
controller.plugins.database.user.get('id', function(err, user) { console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA') });
*/

//CONEXION DE FABIBOT CON SQL SERVER
    const storage = new MSSQLStorage({ 
    user: process.env.dbuser,
    password: process.env.dbpassword,
    server: process.env.dbserver,
    database: process.env.dbname,
    table: process.env.dbtable
    //database: "GESTION_PROVEEDORES",
    });






const whatsAppAdapter = new TwilioWhatsAppAdapter({
    accountSid: 'AC26f85089d487044b9061830f2317963c', // Account SID
    authToken: 'd4ddd03bd834f29cf923875769e9c1df', // Auth Token
    phoneNumber: '+12193277262', // The From parameter consisting of whatsapp: followed by the sending WhatsApp number (using E.164 formatting)
    endpointUrl: 'https://efdbe6ba3e46.ngrok.io/api/whatsapp/messages' // Endpoint URL you configured in the sandbox, used for validation
});


/* ----------------------------------------------------------------------
 * .-.   .-.      .-.
 * : :.-.: :      : :
 * : :: :: : .--. : `-.  .--. .-.,-.
 * : `' `' ;' '_.'' .; :' '_.'`.  .'
 *  `.,`.,' `.__.'`.__.'`.__.':_,._;
 * Configure the Webex Teams adapter
 * ----------------------------------------------------------------------
 */
// const adapter = new WebexAdapter({
//     enable_incomplete: true,
//     // access_token: process.env.WEBEX_ACCESS_TOKEN,
//     // public_address: process.env.WEBEX_PUBLIC_ADDRESS,
//     secret: 'random-secret-1234',
// })

/* ----------------------------------------------------------------------
 *  .--. .-.               .-.
 * : .--': :               : :.-.
 * `. `. : :   .--.   .--. : `'.'
 * _`, :: :_ ' .; ; '  ..': . `.
 * `.__.'`.__;`.__,_;`.__.':_;:_;
 * Configure the Slack adapter
 * ----------------------------------------------------------------------
//  */
// const adapter = new SlackAdapter({
//     // enable_incomplete: true,
//     verificationToken: process.env.verificationToken,
//     clientSigningSecret: process.env.clientSigningSecret,  
//     botToken: process.env.botToken,
//     // clientId: process.env.clientId,
//     // clientSecret: process.env.clientSecret,
//     // scopes: ['bot'],
//     // redirectUri: process.env.redirectUri,
//     // getTokenForTeam: getTokenForTeam,
//     // getBotUserByTeam: getBotUserByTeam,
// });

// let tokenCache = {};
// let userCache = {};

// if (process.env.TOKENS) {
//     tokenCache = JSON.parse(process.env.TOKENS);
// } 

// if (process.env.USERS) {
//     userCache = JSON.parse(process.env.USERS);
// } 

// async function getTokenForTeam(teamId) {
//     if (tokenCache[teamId]) {
//         return new Promise((resolve) => {
//             setTimeout(function() {
//                 resolve(tokenCache[teamId]);
//             }, 150);
//         });
//     } else {
//         console.error('Team not found in tokenCache: ', teamId);
//     }
// }

// async function getBotUserByTeam(teamId) {
//     if (userCache[teamId]) {
//         return new Promise((resolve) => {
//             setTimeout(function() {
//                 resolve(userCache[teamId]);
//             }, 150);
//         });
//     } else {
//         console.error('Team not found in userCache: ', teamId);
//     }
// }


// // Use SlackEventMiddleware to emit events that match their original Slack event types.
// adapter.use(new SlackEventMiddleware());

// // Use SlackMessageType middleware to further classify messages as direct_message, direct_mention, or mention
// adapter.use(new SlackMessageTypeMiddleware());

/* ----------------------------------------------------------------------
 *  __      __      ___.                        __           __   
 * /  \    /  \ ____\_ |__   __________   ____ |  | __ _____/  |_ 
 * \   \/\/   // __ \| __ \ /  ___/  _ \_/ ___\|  |/ // __ \   __\
 *  \        /\  ___/| \_\ \\___ (  <_> )  \___|    <\  ___/|  |  
 *   \__/\  /  \___  >___  /____  >____/ \___  >__|_ \\___  >__|  
 *        \/       \/    \/     \/           \/     \/    \/     
 * Configure the Websocket adapter
 * ----------------------------------------------------------------------
 */
const adapter = new WebAdapter({});

// const adapter = new FacebookAdapter({
//     // enable_incomplete: true,
//     // verify_token: process.env.FACEBOOK_VERIFY_TOKEN,
//     getAccessTokenForPage: async(team) => { console.log('GET TOKEN FOR TEAM', team); if (team === process.env.FACEBOOK_PAGE_ID) { return process.env.FACEBOOK_ACCESS_TOKEN } },
//     app_secret: process.env.FACEBOOK_APP_SECRET,
// })

// // emit events based on the type of facebook event being received
// adapter.use(new FacebookEventTypeMiddleware());


// const adapter = new HangoutsAdapter({
//     // enable_incomplete: true,
//     token: process.env.GOOGLE_TOKEN,
//     google_auth_params: {
//         credentials: JSON.parse(process.env['GOOGLE_CREDS'])
//     }
// });

// const adapter = new TwilioAdapter({
//     // enable_incomplete: true,
//     // twilio_number: process.env.TWILIO_NUMBER,
//     // account_sid: process.env.TWILIO_ACCOUNT_SID,
//     // auth_token: process.env.TWILIO_AUTH_TOKEN,
// });

const controller = new Botkit({
    debug: true,
    webhook_uri: '/api/messages',
    webserver_middlewares: [(req, res, next) => { console.log('REQUIERO > ', req.url); next(); }],
    // disable_console: true,
    adapter: adapter,
    // disable_webserver: true,
    // adapterConfig: {
    //     appId: process.env.APP_ID,
    //     appPassword: process.env.APP_PASSWORD
    // },
    storage
});

 const cms = new BotkitCMSHelper({
     cms_uri: process.env.cms_uri,
     token: process.env.cms_token,
 });

// // add cms tools
 controller.usePlugin(cms);

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {


    //COMPARANDO PREGUNTAS Y RESPUESTAS TANTO DE SCRIT CMS COMO DE JS

    /* catch-all that uses the CMS to trigger dialogs */
    if (controller.plugins.cms) {
        controller.on('message,direct_message', async (bot, message) => {
            session.skoked = message.user;
            console.log('USUARIO: '+message.user);
            //console.log('CANAL: '+message.channel);

            let results = true; 

            //results = await controller.plugins.cms.testTrigger(bot, message);
            await bot.reply(message, {type: 'typing'});
            setTimeout(async () => {
                // will have to reset context because turn has now ended.
                await bot.changeContext(message.reference);               
                results = await controller.plugins.cms.testTrigger(bot, message);

                if(results == false)
                {   
                    await bot.reply(message,{
                    text: 'Lo siento, aún me encuentro en fase de desarrollo, pronto aprendere como responderte a "<b>' + message.text +'</b>"',
                    quick_replies: [
                      {
                          title: 'AYUDA',
                          payload: 'AYUDA',
                      },
                      {
                          title: 'QUIEN ERES',
                          payload: 'QUIEN ERES',
                      }
                    ]
                    });

                }

    

            }, 3000);
            
            
             if (results !== false) {
                // do not continue middleware!
                return false;
            }         


        });

    }



    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '/features');


    // load "packaged" plugins
    // turn on verbose console logging of send/receive/web requests
    // controller.usePlugin(require('./plugins/verbose/index.js'));

    if (controller.webserver) {

        controller.webserver.get('/', (req, res) => {
            res.send(controller.version);
        });


        controller.webserver.get('/install', (req, res) => {
            // getInstallLink points to slack's oauth endpoint and includes clientId and scopes
            res.redirect(controller.adapter.getInstallLink());
        });

        controller.webserver.get('/install/auth', async (req, res) => {
            try {
                const results = await controller.adapter.validateOauthCode(req.query.code);

                console.log('FULL OAUTH DETAILS', results);



                // Store token by team in bot state.
                tokenCache[results.team_id] = results.bot.bot_access_token;

                // Capture team to bot id
                // TODO: this will have to be customized
                userCache[results.team_id] =  results.bot.bot_user_id;

                res.json('Success! Bot installed.');

            } catch (err) {
                console.error('OAUTH ERROR:', err);
                res.status(401);
                res.send(err.message);
            }
        });
    }
});

