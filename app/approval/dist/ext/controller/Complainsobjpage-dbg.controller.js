sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('approval.ext.controller.Complainsobjpage', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf approval.ext.controller.Complainsobjpage
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing:
			{
				onBeforeBinding: async function (oEvent) {
					debugger;
					var path = window.location.href;
					var regex = /complains\('([^']+)'\)/;

					// Match the regex against the path
					var match = path.match(regex);

					// Extract the complain number from the match
					var compno = match[1];
					var testdata = JSON.stringify({
						complainno: compno
					});
					let functionname = 'submitcomplaints';
					debugger
					let oFunction = this.getView().getModel().bindContext(`/${functionname}(...)`);
					// let oFunction = this._view.getModel().bindContext(`/${functionname}(...)`);
					oFunction.setParameter('data', testdata);
					oFunction.setParameter('status', JSON.stringify({ status: 'getComp' }));
					// oFunction.setParameter('file',this.file);
					await oFunction.execute();
					// getBoundContext();
					debugger
					let context = oFunction.getBoundContext();
					var getdata = context.getValue();
					debugger;
					let result = getdata.value;
					result = JSON.parse(result);
					var days = result[0].days;
					var notify = (7 - days) + " days left to take action";
					var notifyControl = sap.ui.getCore().byId("approval::complainsObjectPage--fe::CustomSubSection::Noti--notification");

					// Remove existing color classes if any
					notifyControl.removeStyleClass("greenText yellowText redText");

					// Add color class based on the value of days
					if (days <= 2) {
						notifyControl.addStyleClass("greenText");
					} else if (days >= 3 && days <= 5) {
						notifyControl.addStyleClass("yellowText");
					} else {
						notifyControl.addStyleClass("redText");
					}

					// Set the text content
					notifyControl.setText(notify);

				},
				onAfterBinding: function (oEvent) {
					debugger
					var path = window.location.href;

					// sap.ui.getCore().byId("approval::complainsObjectPage--fe::CustomSubSection::Attachements--uploadSet-uploader-fu_button").setVisible(false);
					// sap.ui.getCore().byId("approval::complainsObjectPage--fe::CustomSubSection::Attachements--uploadSet-uploadButton").setVisible(false);
					var regex = /complains\('([^']+)'\)/;
					var match = regex.exec(path);
					var compno = match ? match[1] : null;

					var add = this.base.getView().getContent()[0].getSections()[3].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[0].mBindingInfos.items.binding;
					add.filter(
						new sap.ui.model.Filter({
							path: "complaintno",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: compno
						})
					);
				}

			}
		}
	});
});
