"use strict"

const logoutAttempt = new LogoutButton();
logoutAttempt.action = () => ApiConnector.logout((response) => {
		if (response.success == true) {
			location.reload();
		} 
	});


ApiConnector.current((response) => {
	if (response.success == true) {
			ProfileWidget.showProfile(response.data);
	} 
})


const rateList = new RatesBoard();
setInterval(ApiConnector.getStocks((response) => {
	if (response.success == true) {		
        rateList.clearTable();
		rateList.fillTable(response.data);
	} 
}) , 6000);


const moneyOperation = new MoneyManager();
moneyOperation.addMoneyCallback = (data) => ApiConnector.addMoney(data, (response) => {
	    let resultMessage = "";
		if (response.success == true) {
			ProfileWidget.showProfile(response.data);
			resultMessage = "Пополнение счета успешно выполнено";			
		} else {
			resultMessage = response.error;
		}
		moneyOperation.setMessage(response.success,resultMessage)
	});resultMessage

moneyOperation.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, (response) => {
	    let resultMessage = "";
		if (response.success == true) {			
			ProfileWidget.showProfile(response.data);
			resultMessage = "Конвертация успешно выполнена";
		} else {
			resultMessage = response.error;
		}
		moneyOperation.setMessage(response.success,resultMessage)
	});

moneyOperation.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, (response) => {
	    let resultMessage = "";
		if (response.success == true) {
			ProfileWidget.showProfile(response.data);
			resultMessage = "Перевод успешно выполнен";
		} else {
			resultMessage = response.error;
		}
		moneyOperation.setMessage(response.success,resultMessage)
	});


const personList = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
	if (response.success == true) {
        personList.clearTable();
		personList.fillTable(response.data);
		moneyOperation.updateUsersList(response.data);
	} 
})

personList.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (response) => {
	let resultMessage = "";
	if (response.success == true) {
			personList.clearTable();
			personList.fillTable(response.data);
			moneyOperation.updateUsersList(response.data);
			resultMessage = "Добавление пользователя успешно выполнено";
		} else {
			resultMessage = response.error;
		}
		personList.setMessage(response.success,resultMessage)
	});

personList.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (response) => {
	let resultMessage = "";
	if (response.success == true) {
			personList.clearTable();
			personList.fillTable(response.data);
			moneyOperation.updateUsersList(response.data);
			resultMessage = "Удаление пользователя успешно выполнено";
		} else {
			resultMessage = response.error;
		}
		personList.setMessage(response.success,resultMessage)
	});
