const pinoLogger = require('pino');

const options = {

	logLevel : ()=>{

		if(process.env.LOG_LEVEL === undefined){
			return  process.env.LOG_LEVEL || 'info';

		}else{
			return process.env.LOG_LEVEL;
		}
	},

	enablePretty: () =>{
		return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;
	}
};

const logger = pinoLogger({

	level: options.logLevel(),
	crlf: true,
	prettyPrint: options.enablePretty(),
	messageKey: 'message',
	useLevelLabels: true,

});

module.exports = logger;
