sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('vencomplaint.ext.controller.Objcomplaint', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf vencomplaint.ext.controller.Objcomplaint
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing: {
				onBeforeBinding: function (oEvent) {
					debugger
					var path = window.location.href;
					var regex = /pototcomp\('([^']+)'\)/;
					var compno = (regex.exec(path) || [])[1];

				}
			}
		}
	});
});
