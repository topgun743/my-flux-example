var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');

var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var ListStore = assign({}, EventEmitter.prototype, {

    // Actual collection of model data
    items: [],

    // Accessor method we'll use later
    getAll: function() {
        return this.items;
    },

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	
	/**
   * @param {function} callback
   */
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

  /**
   * @param {function} callback
   */
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

AppDispatcher.register( function( payload ) {

    switch( payload.eventName ) {

        case AppConstants.NEW_ITEM:

            // We get to mutate data!
            ListStore.items.push( payload.newItem );
			
			// Tell the world we changed!
            //ListStore.trigger(CHANGE_EVENT);
			ListStore.emitChange();
			
            break;

    }

    return true; // Needed for Flux promise resolution

}); 

module.exports = ListStore;