sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'approval/test/integration/FirstJourney',
		'approval/test/integration/pages/complainsList',
		'approval/test/integration/pages/complainsObjectPage'
    ],
    function(JourneyRunner, opaJourney, complainsList, complainsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('approval') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThecomplainsList: complainsList,
					onThecomplainsObjectPage: complainsObjectPage
                }
            },
            opaJourney.run
        );
    }
);