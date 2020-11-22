"use strict"
const newFormAttempt = new UserForm();


newFormAttempt.loginFormCallback = (data) => ApiConnector.login(data, (response) => {
		if (response.success == true) {
			location.reload();
		} else {
			newFormAttempt.setLoginErrorMessage(response.error)
		}
	});

newFormAttempt.registerFormCallback = (data) => ApiConnector.register(data, (response) => {
		if (response.success == true) {
			location.reload();
		} else {
			newFormAttempt.setRegisterErrorMessage(response.error)
		}
	});




