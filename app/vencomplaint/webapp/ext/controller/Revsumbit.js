sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        revsumbit: async function(oEvent) {
            debugger
            MessageToast.show("Custom handler invoked.");
            var oDialog = new sap.m.Dialog({
                title: "SUBMIT",
                resizable: true,
                draggable: true,
                content: [
                    new sap.m.Label({ text: "Are you sure you want to Submit?" })
                ],
                buttons: [
                    new sap.m.Button({
                        text: "Yes",
                        press: async function() {
                            debugger
                            var path = window.location.href;
                            		var regex = /pototcomp\('([^']+)'\)/;
                            		var compno = (regex.exec(path) || [])[1];
                            var desc = sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[2].mAggregations.items[1]._lastValue;
                            var status = "Submitted";
                            var Url = '/odata/v4/my/complains/' + compno; 
                            var testdata = JSON.stringify({
                                complainno: compno,
                                cdesc: desc,
                                cstatus: status
                            });
                            await $.ajax({
                                url: Url,
                                type: 'PATCH',
                                contentType: 'application/json',
                                data: testdata,
                                success: function (data) {
                                    debugger
                                    // Handle success
                                    MessageToast.show("Complaint Sumbitted.");
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    // Handle error
                                    console.error(textStatus, errorThrown);
                                    MessageToast.show("Unexpected Error Occurred.");
                                }
                            })
                            oDialog.close();
                            MessageToast.show("Successfully submitted");
                            window.history.go(-3);
                        }
                    }),
                    new sap.m.Button({
                        text: "No",
                        press: function() {
                            oDialog.close();
                            MessageToast.show("Cancelled");
                        }
                    })
                ]
            });
            
            oDialog.open();
            // window.history.go(-3);

        },
        revcancel: function() {
            // MessageToast.show("Custom handler invoked.");
            window.history.go(-3);
        }
    };
});
