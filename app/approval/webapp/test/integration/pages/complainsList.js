sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'approval',
            componentId: 'complainsList',
            contextPath: '/complains'
        },
        CustomPageDefinitions
    );
});