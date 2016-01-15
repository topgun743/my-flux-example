var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
	createNewItem: function( item ) {
		AppDispatcher.dispatch({
			eventName: AppConstants.NEW_ITEM,
			newItem: item // example data
		});
	}
};

module.exports = AppActions;