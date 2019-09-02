
require('dotenv').config();

let fastify = require('fastify')({logger: true});
const CORS = require('fastify-cors');
const manifesto = require('../config/information/manifesto');

// routes
const routesIndex = require('../../api');

const create =  async () => {

	try {

		let port =
      process.env.PORT_EXPOSE === undefined
      	? manifesto.configuration.default_port
      	: process.env.PORT_EXPOSE;

		let host = process.env.HOST === undefined ?
			manifesto.configuration.default_host :
			process.env.HOST;

		fastify.register(CORS, {
			origin: true
		});

		fastify.register(routesIndex);

		await fastify.listen({
			port: port,
			host: host
		});

		return fastify;

	} catch (err) {

		fastify.log.error("Cannot start Fastify server.");
		fastify.log.error(err);

		process.exit(1);
	}
};

const start =  async () => {
	let fastify = await create();

	await fastify.ready();

	fastify.log.info(`server listening on ${fastify.server.address().port}`);
	fastify.log.info(`App Author: ${manifesto.information.Company}`);
	fastify.log.info(`App Version: ${manifesto.information.version}`);
	fastify.log.info(`Created by: ${manifesto.information.author}`);
	fastify.log.info(`Application: ${process.env.API_NAME}`);

	return fastify;

};

const docs = async ()=>{
	const fastify = await create();
	await fastify.ready();

	if (fastifySwagger.generateDocs) {

		await fastifySwagger.generateDocs(fastify);
		fastify.log.info('Successfully started swagger documentation');
		process.exit(0);

	} else {

		fastify.log.error(
			`Cannot generate docs, NODE_ENV is: ${process.env.NODE_ENV}`
		);

		process.exit(1);
	}

};

start();

module.exports = {
	start,
	docs,
	create,
	fastify
	//fastify
};
