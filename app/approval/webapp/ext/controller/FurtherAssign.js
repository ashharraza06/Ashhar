sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        FurtherAssign: function(oEvent) {
            debugger
            // MessageToast.show("Custom handler invoked.");
            var oDialog = new sap.m.Dialog({
                title: "Sumbit",
                resizable: true,
                draggable: true,
                content: [
                    new sap.m.Label({ text: "Are you sure you want to Further Assign?" })
                ],
                buttons: [
                    new sap.m.Button({
                        text: "Yes",
                        press: async function() {
                            debugger
                            // var compno = sap.ui.getCore().byId("approval::complainsObjectPage--fe::FormContainer::ComplaintDetails::FormElement::DataField::complainno::Field-content").mAggregations.contentEdit[0].mProperties.value
                            // var compno = sap.ui.getCore().byId("approval::complainsObjectPage--fe::FormContainer::Complaint::FormElement::DataField::complainno::Field-content").mAggregations.contentDisplay.mProperties.text
                            var path = window.location.href;
                            var regex = /complains\('([^']+)'\)/;
                            var match = path.match(regex);
                            var compno = match[1];
                            var status = "Further Assigned";
                            let testdata = JSON.stringify({cstatus : status });
                            var url = '/odata/v4/my/complains/' + compno;
                            await $.ajax({
                                url: url,
                                type: 'PATCH',
                                contentType: 'application/json',
                                data: testdata,
                                success: function (data) {
                                    debugger
                                    // Handle success
                                    console.log(data);
            
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    // Handle error
                                    debugger
                                    console.error(textStatus, errorThrown);
                                }
                            });
                            oDialog.close();
                            MessageToast.show("The complaint has forwarded successfully");
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
        }
    };
});

