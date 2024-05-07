const MICROSERVICE_CONFIG = {
	AUTHENTICATE_USER: {
		URL: process.env.AUTHENTICATION_MICROSERVICE_URL || 'http://0.0.0.0:4001',
		TIMESHEET_URL: process.env.TIMESHEET_MICROSERVICE_URL || 'http://0.0.0.0:3000',
		get GET_USERS_API_URL() {
			return this.URL + '/v1/user/list';
		},
		GET_TIMESHEET_BY_PROJECT_ID_API_URL(projectId) {
			return this.TIMESHEET_URL + `/v1/timesheet/time/project/${projectId}`;
		},
		get GET_USER_AUTHENTICATE_API_URL() {
			return this.URL + '/v1/auth/de-crypt-token';
		}
	},
	SOCKET_SERVER: {
		URL: process.env.SOCKET_URL || 'http://localhost:4005'
	},
	MATTERMOST_URL: process.env.MATTERMOST_URL || 'http://192.180.2.127:3001',
	API_GATEWAY_URL: process.env.API_GATEWAY_URL || 'http://0.0.0.0:4000'
};

module.exports = MICROSERVICE_CONFIG;
