var React          = require('react'),
    LogEntryList   = require('./LogEntryList'),
    eventStore  = require('../../stores/EventStore'),
    ErrorMessages  = require('../ErrorMessages');

var LogEntriesComponent = React.createClass({
    getInitialState: function() {
        return {
            createView: false,
            events: [],
            errors: []
        };
    },

    componentDidMount: function () {
        eventStore.getEvents().then(function(res) {
            this.setState({events: res.events});
        }.bind(this), this.initError);
    },

    initError: function() {
        this.onError("Could not load events from server");
    },

    clearErrors: function() {
        this.setState({errors: []});
    },

    onError: function(error) {
        var errors = this.state.errors.concat([error]);
        this.setState({errors: errors});
    },

    render: function() {
        return (
            <div>
                <ErrorMessages errors={this.state.errors} onClearErrors={this.clearErrors} />

                <hr />

                <LogEntryList events={this.state.events} />
            </div>
            );
    },
});

module.exports = LogEntriesComponent;