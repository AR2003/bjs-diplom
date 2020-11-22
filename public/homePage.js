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
		if (response.success == true) {
			ProfileWidget.showProfile(response.data);
		} else {
			moneyOperation.setMessage(response.success,response.error)
		}
	});

moneyOperation.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, (response) => {
		if (response.success == true) {
			ProfileWidget.showProfile(response.data);
		} else {
			moneyOperation.setMessage(response.success,response.error)
		}
	});

moneyOperation.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, (response) => {
		if (response.success == true) {
			ProfileWidget.showProfile(response.data);
		} else {
			moneyOperation.setMessage(response.success,response.error)
		}
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
	if (response.success == true) {
			personList.clearTable();
			personList.fillTable(response.data);
			moneyOperation.updateUsersList(response.data);
		} else {
			personList.setMessage(response.success,response.error)
		}
	});

personList.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (response) => {
	if (response.success == true) {
			personList.clearTable();
			personList.fillTable(response.data);
			moneyOperation.updateUsersList(response.data);
		} else {
			personList.setMessage(response.success,response.error)
		}
	});
