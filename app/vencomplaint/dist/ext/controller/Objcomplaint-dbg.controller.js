// const { get } = require("@sap/cds");
// const { results } = require("@sap/cds/lib/utils/cds-utils");

sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	var getdata;
	// var g_status = 0;
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
				onBeforeBinding: async function (oEvent) {
					debugger
					// var url1 = this.base.getAppComponent().getManifestObject()._oBaseUri._string
					sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::FacetSubSection::Complaints").setVisible(false);

					var path = window.location.href;
					var regex = /pototcomp\('([^']+)'\)/;
					var compno = (regex.exec(path) || [])[1];
					sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[0].mAggregations.items[0].mAggregations.items[1].setText(compno);
					// sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[0].mAggregations.items[1].mAggregations.items[1].getText();
					// var Url = "/odata/v4/my/complains?$filter=complainno eq '" + compno + "'";
					var pono;
					var vencode;
					var status;
					var desc;
					var abt;
					var pan;
					// await $.ajax({
					// 	url: url1 + `odata/v4/my/complains?$filter=complainno eq '" + compno + "'`,
					// 	type: 'GET',
					// 	contentType: 'application/json',
					// 	success: function (data) {
					// 		// Handle success
					// 		debugger
					// 		let arr = data.value[0];
					// 		pono = arr.cpono;
					// 		vencode = arr.cvencode;
					// 		pan = arr.cpannum;
					// 		status = arr.cstatus;
					// 		abt = arr.ccomplain_about;
					// 		desc = arr.cdesc;

					// 		console.log("pono:", pono);
					// 		console.log("vencode:", vencode);
					// 		console.log("status:", status);
					// 		console.log("desc:", desc);
					// 		console.log("abt:", abt);
					// 		console.log("pan:", pan);

					// 		console.log('detais fetched successfully:', data);
					// 		// Process the files data as needed
					// 	},
					// 	error: function (jqXHR, textStatus, errorThrown) {
					// 		// Handle error
					// 		console.error('Error fetching details:', textStatus, errorThrown);
					// 	}
					// });
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
					getdata = context.getValue();
					debugger;
					let result = getdata.value;
					result = JSON.parse(result);
					pono = result[0].cpono;
					vencode = result[0].cvencode;
					pan = result[0].cpannum;
					status = result[0].cstatus;
					abt = result[0].ccomplain_about;
					desc = result[0].cdesc;

					debugger
					sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[0].mAggregations.items[1].mAggregations.items[1].setText(pono);
					sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[0].mAggregations.items[2].mAggregations.items[1].setText(pan);
					sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[1].mAggregations.items[0].mAggregations.items[1].setText(vencode);
					sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[1].mAggregations.items[1].mAggregations.items[1].setText(abt);
					sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[1].mAggregations.items[2].mAggregations.items[1].setText(status);
					// sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[2].mAggregations.items[1].setText(desc);
					sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[2].mAggregations.items[1].setValue(desc);
					if (status != "Reverted") {
						var textArea = sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[2].mAggregations.items[1];

						// Set the editable property to false
						textArea.setEditable(false);
						sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::FooterBar::CustomAction::revsumbit").setVisible(false);
						sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::FooterBar::CustomAction::revcancel").setText("Back");
					}
					else
					{
						var textArea = sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[2].mAggregations.items[1];

						// Set the editable property to false
						textArea.setEditable(true);
						sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::FooterBar::CustomAction::revsumbit").setVisible(true);
						sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::FooterBar::CustomAction::revcancel").setText("Cancel");
					}
				},
				onAfterBinding: async function (oEvent) {
					debugger
					// if (!g_status) {
						debugger;
					var path = window.location.href;
					var regex = /pototcomp\('([^']+)'\)/;
					var compno = (regex.exec(path) || [])[1];
					var add = this.base.getView().getContent()[0].getSections()[3].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[0].mBindingInfos.items.binding;
					add.filter(
						new sap.ui.model.Filter({
							path: "complaintno",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: compno
						})
					);
					// g_status++;
					// }
					
				}
			}
		}
	});
});
