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
				onAfterBinding: function (oEvent) {
					debugger
					var path = window.location.href;

					// sap.ui.getCore().byId("approval::complainsObjectPage--fe::CustomSubSection::Attachements--uploadSet-uploader-fu_button").setVisible(false);
					// sap.ui.getCore().byId("approval::complainsObjectPage--fe::CustomSubSection::Attachements--uploadSet-uploadButton").setVisible(false);
					var regex = /complains\('([^']+)'\)/;
					var match = regex.exec(path);
					var compno = match ? match[1] : null;

					var add = this.base.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[0].mBindingInfos.items.binding;
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
