sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('vencomplaint.ext.controller.Complaint', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf vencomplaint.ext.controller.Complaint
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				
			},
			routing:
			{
				onBeforeBinding: function (oEvent) {
					debugger
					var url = window.location.href;

					// Extract vencode
					var vencodeIndex = url.indexOf("vencode='") + "vencode='".length;
					var vencode = url.substring(vencodeIndex, url.indexOf("'", vencodeIndex));

					// Extract pono
					var ponoIndex = url.indexOf("poheaders('") + "poheaders('".length;
					var pono = url.substring(ponoIndex, url.indexOf("'", ponoIndex));

					sap.ui.getCore().byId("vencomplaint::vendor_poheadersObjectPage--fe::CustomSubSection::Complain-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[1].setText(vencode);
					sap.ui.getCore().byId("vencomplaint::vendor_poheadersObjectPage--fe::CustomSubSection::Complain-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[3].setText(pono);
					// sap.ui.getCore().byId("vencomplaint::vendor_poheadersObjectPage--fe::CustomSubSection::Complain--textcomp").mAggregations._counter.setText("fff")
				},
				onAfterBinding : function(oEvent)
				{
					debugger
					var add = this.base.getView().getContent()[0].getSections()[3].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[0].mBindingInfos.items.binding;
					add.filter(
						new sap.ui.model.Filter({
							path: "complaintno",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: null
						})
					);
				}
			}
		}
	});
});
