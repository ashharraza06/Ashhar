sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        Resolve: function(oEvent) {
            debugger
            // MessageToast.show("Custom handler invoked.");
            var oDialog = new sap.m.Dialog({
                title: "Resolve",
                resizable: true,
                draggable: true,
                content: [
                    new sap.m.Label({ text: "Are you sure you want to Resolve?" })
                ],
                buttons: [
                    new sap.m.Button({
                        text: "Yes",
                        press: function() {
                            debugger
        
                           
                            var compno = sap.ui.getCore().byId("approval::complainsObjectPage--fe::FormContainer::ComplaintDetails::FormElement::DataField::complainno::Field-content").mAggregations.contentEdit[0].mProperties.value
                            var status = "Resolved";
                            let testdata = JSON.stringify({status : status });
                            var url = '/odata/v4/my/complains/' + compno;
                            $.ajax({
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
                            MessageToast.show("Complaint has updated Successfully");
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
