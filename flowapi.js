//some snippets to expore the GlideFlow and sn_fd.FlowAPI
// Client flow
(function () {

    var inputs = {};

    inputs['current'] = { // GlideRecord
        table: 'incident',
        sys_id: '9fffc328731823002728660c4cf6a742'
    };
    inputs['table_name'] = 'incident';

    GlideFlow.startFlow('x_220561_twittertw.tweet_incident', inputs).then(function (res) {


        console.log(res)

        GlideFlow.getExecution(res.getExecutionId())
            .then(function (execution) {
                return execution.awaitCompletion();
            }, errorResolver)
            .then(function (completion) {

                var status = completion.status;
                console.log(status);

                // Available Outputs:
                var outputs = completion.outputs;
                console.log(outputs);
            }, errorResolver());

        function errorResolver(error) {
            // Handle errors in error resolver
            console.log(error);
        }
    })

})();

//server

(function() {
	
	try {
    
    var grIncident = new GlideRecord('incident');
		grIncident.get('')
    
		var inputs = {};
		inputs['current'] = grIncident; // GlideRecord of table:  
		inputs['table_name'] = 'incident';

		// Start Asynchronously: Uncomment to run in background.
		// sn_fd.FlowAPI.startFlow('x_220561_twittertw.tweet_incident', inputs);
				
		// Execute Synchronously: Run in foreground.
		var result = sn_fd.FlowAPI.executeFlow('x_220561_twittertw.tweet_incident', inputs);
    
		
	} catch (ex) {
		var message = ex.getMessage();
		gs.error(message);
	}
	
})();


//server action
(function() {
	
	try {
		var inputs = {};
		inputs['tweet'] = 'just a tweet to twitter'; // String 

		// Start Asynchronously: Uncomment to run in background. Code snippet will not have access to outputs.
		// sn_fd.FlowAPI.startAction('x_220561_twittertw.tweet', inputs);
				
		// Execute Synchronously: Run in foreground. Code snippet has access to outputs.
		var outputs = sn_fd.FlowAPI.executeAction('x_220561_twittertw.tweet', inputs);

		// Get Outputs:
		// Note: outputs can only be retrieved when executing synchronously.
		gs.log(outputs);
		
	} catch (ex) {
		var message = ex.getMessage();
		gs.error(message);
	}
	
})();
