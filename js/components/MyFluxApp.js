var React = require('react');
var ListStore = require('../stores/ListStore');
var AppActions = require('../actions/AppActions');

function getItemsState() {
  return {
    allItems: ListStore.getAll()
  };
}

var _cnt = 0;
var _names = ['Peter', 'John', 'Sarah', 'Julia', 'Richard', 'Max', 'Tom'];
var MyFluxApp = React.createClass({

  getInitialState: function() {
    return getItemsState();
  },

  componentDidMount: function() {
    ListStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ListStore.removeChangeListener(this._onChange);
  },
  
  createNewItem: function() {
	var index = Math.floor((Math.random() * 6) + 0); 
	AppActions.createNewItem({id: ++_cnt , name: _names[index] });
  },

  /**
   * @return {object}
   */
  render: function() {
  
    // Remember, ListStore is global!
    // There's no need to pass it around
    var items = this.state.allItems;

    // Build list items markup by looping
    // over the entire list
    var itemHtml = items.map( function( listItem ) {

        // "key" is important, should be a unique
        // identifier for each list item
        return <li key={ listItem.id }>
            { listItem.name }
          </li>;

    });

    return <div>
        <ul>
            { itemHtml }
        </ul>

        <button onClick={ this.createNewItem }>New Item</button>

    </div>;
  },

  /**
   * Event handler for 'change' events coming from the ListStore
   */
  _onChange: function() {
    this.setState(getItemsState());
  }

});

module.exports = MyFluxApp;