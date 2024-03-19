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
                        press: function() {
                            
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

