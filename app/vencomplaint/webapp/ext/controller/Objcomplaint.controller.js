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
				onBeforeBinding: async function (oEvent) {
					debugger
					sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::FacetSubSection::Complaints").setVisible(false);

					var details
					var path = window.location.href;
					var regex = /pototcomp\('([^']+)'\)/;
					var compno = (regex.exec(path) || [])[1];
					sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[0].mAggregations.items[0].mAggregations.items[1].setText(compno);
					// sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[0].mAggregations.items[1].mAggregations.items[1].getText();
					var Url = "/odata/v4/my/complains?$filter=complainno eq '" + compno + "'";
					var pono;
					var vencode;
					var status;
					var desc;
					var abt;
					var pan;
					await $.ajax({
						url: Url,
						type: 'GET',
						contentType: 'application/json',
						success: function (data) {
							// Handle success
							debugger
							let arr = data.value[0];
							details = arr;
							pono = arr.cpono;
							vencode = arr.cvencode;
							pan = arr.cpannum;
							status = arr.cstatus;
							abt = arr.ccomplain_about;
							desc = arr.cdesc;

							console.log("pono:", pono);
							console.log("vencode:", vencode);
							console.log("status:", status);
							console.log("desc:", desc);
							console.log("abt:", abt);
							console.log("pan:", pan);

							console.log('detais fetched successfully:', data);
							// Process the files data as needed
						},
						error: function (jqXHR, textStatus, errorThrown) {
							// Handle error
							console.error('Error fetching details:', textStatus, errorThrown);
						}
					});
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
					debugger;


				},
				onAfterBinding: function (oEvent) {
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
				}
			}
		}
	});
});
