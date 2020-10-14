module.exports = {
	retrievePath: '/app/retrieval',
	lotus: {
		api: process.env.LOTUS_API || '',
		token: process.env.LOTUS_TOKEN || '',
	},
};
