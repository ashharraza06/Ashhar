sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var getdata;
	return ControllerExtension.extend('approval.ext.controller.ListController', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf approval.ext.controller.ListController
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				debugger
				let statusbar = this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.mAggregations.filterItems[0];
				statusbar.setVisible(false);
			},
			routing:
			{
				onBeforeBinding:async function(){
					debugger;
					var testdata = JSON.stringify({
						complainno: '11'
					});
					let functionname = 'submitcomplaints';
					let oFunction = this.getView().getModel().bindContext(`/${functionname}(...)`);
					oFunction.setParameter('data', testdata);
					oFunction.setParameter('status', JSON.stringify({ status: 'getallComp' }));
					await oFunction.execute();
					let context = oFunction.getBoundContext();
					getdata = context.getValue()
					let result = getdata.value;
					result = JSON.parse(result);
					// debugger
					// for ( var i = 0 ; i < result.length; i++){
					// 	var submitdate = result[i].createdAt
					// 	var currdate = new Date();
					// 	var sub = new Date(submitdate);
					// 	var time = currdate.getTime() - sub.getTime();
					// 	var day = Math.floor(time/(1000 * 3600 * 24));
					// 	let d = JSON.stringify({
					// 		complainno: result[i].complainno,
					// 		days : day
					// 	});
					// 	oFunction.setParameter('data', d);
            		// 	oFunction.setParameter('status', JSON.stringify({ status: 'patchDays' }));
					// 	await oFunction.execute();
					// }
				}
			}
		}
	});
});
