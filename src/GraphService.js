import React from "react";

const graph = require("@microsoft/microsoft-graph-client");

export default async function getUserDetails(accessToken) {
	const client = graph.Client.init({
		authProvider: (done) => {
			done(null, accessToken);
		},
	});

	const user = await client.api("/me").select("displayName").get();
	return user;
}
