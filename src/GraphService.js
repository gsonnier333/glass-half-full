import React from "react";

const graph = require("@microsoft/microsoft-graph-client");

function getAuthenticatedClient(accessToken) {
	//we can reuse this function for all our api queries here
	const client = graph.Client.init({
		authProvider: (done) => {
			done(null, accessToken);
		},
	});

	return client;
}

export async function getUserDetails(accessToken) {
	const client = getAuthenticatedClient(accessToken);

	const user = await client.api("/me").get();
	return user;
}

export async function getMail(accessToken) {
	const client = getAuthenticatedClient(accessToken);

	const mail = await client
		.api("/me/messages/")
		.select("body,bodyPreview,subject,from,id")
		.get();

	return mail;
}
