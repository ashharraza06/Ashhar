sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'vencomplaint/test/integration/FirstJourney',
		'vencomplaint/test/integration/pages/vendorList',
		'vencomplaint/test/integration/pages/vendorObjectPage'
    ],
    function(JourneyRunner, opaJourney, vendorList, vendorObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('vencomplaint') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThevendorList: vendorList,
					onThevendorObjectPage: vendorObjectPage
                }
            },
            opaJourney.run
        );
    }
);