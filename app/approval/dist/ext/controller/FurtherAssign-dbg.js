// sap.ui.define([
//     "sap/m/MessageToast"
// ], function (MessageToast) {
//     'use strict';

//     return {
//         FurtherAssign: function (oEvent) {
//             var path = window.location.href;
//             var regex = /complains\('([^']+)'\)/;
//             var match = path.match(regex);
//             var compno = match[1];
//             var status = "Further Assigned";
//             let testdata = JSON.stringify({ complainno: compno, cstatus: status });
//             var url = '/odata/v4/my/complains/' + compno;
//             let functionname = 'submitcomplaints';
//             var oFunction = this._view.getModel().bindContext(`/${functionname}(...)`);
//             // let oFunction = oEvent.oSource.bindContext(`/${functionname}(...)`);
//             oFunction.setParameter('data', testdata);
//             oFunction.setParameter('status', JSON.stringify({ status: 'patchComp1' }));
//             debugger
//             // MessageToast.show("Custom handler invoked.");
//             var oDialog = new sap.m.Dialog({
//                 title: "Sumbit",
//                 resizable: true,
//                 draggable: true,
//                 content: [
//                     new sap.m.Label({ text: "Are you sure you want to Further Assign?" })
//                 ],
//                 buttons: [
//                     new sap.m.Button({
//                         text: "Yes",
//                         press: async function () {
//                             debugger
//                             // var compno = sap.ui.getCore().byId("approval::complainsObjectPage--fe::FormContainer::ComplaintDetails::FormElement::DataField::complainno::Field-content").mAggregations.contentEdit[0].mProperties.value
//                             // var compno = sap.ui.getCore().byId("approval::complainsObjectPage--fe::FormContainer::Complaint::FormElement::DataField::complainno::Field-content").mAggregations.contentDisplay.mProperties.text
//                             // var path = window.location.href;
//                             // var regex = /complains\('([^']+)'\)/;
//                             // var match = path.match(regex);
//                             // var compno = match[1];
//                             // var status = "Further Assigned";
//                             // let testdata = JSON.stringify({cstatus : status });
//                             // var url = '/odata/v4/my/complains/' + compno;
//                             // await $.ajax({
//                             //     url: url,
//                             //     type: 'PATCH',
//                             //     contentType: 'application/json',
//                             //     data: testdata,
//                             //     success: function (data) {
//                             //         debugger
//                             //         // Handle success
//                             //         console.log(data);

//                             //     },
//                             //     error: function (jqXHR, textStatus, errorThrown) {
//                             //         // Handle error
//                             //         debugger
//                             //         console.error(textStatus, errorThrown);
//                             //     }
//                             // });
//                             await oFunction.execute();
//                             oDialog.close();
//                             MessageToast.show("The complaint has forwarded successfully");
//                             location.reload();
//                         }
//                     }),
//                     new sap.m.Button({
//                         text: "No",
//                         press: function () {
//                             oDialog.close();
//                             MessageToast.show("Cancelled");
//                         }
//                     })
//                 ]
//             }).addStyleClass("myCustomDialogClass");

//             oDialog.open();
//         }
//     };
// });
sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Select",
    "sap/m/Label",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/ui/layout/VerticalLayout",
    "jquery.sap.global"
], function (MessageToast, Select, Label, Dialog, Button, VerticalLayout) {
    'use strict';

    return {
        FurtherAssign: async function (oEvent) {
            debugger;
            var path = window.location.href;
            var regex = /complains\('([^']+)'\)/;
            var match = path.match(regex);
            var compno = match[1];
            var status = "Further Assigned";
            let testdata = JSON.stringify({ complainno: compno, cstatus: status });
            var url = '/odata/v4/my/complains/' + compno;
            // var url1 = '/odata/v4/my/approvers'
            var url1 = this._view.getModel().sServiceUrl
            // var baseurl1 = 
            let functionname = 'submitcomplaints';
            var oFunction = this._view.getModel().bindContext(`/${functionname}(...)`);
            oFunction.setParameter('data', testdata);
            oFunction.setParameter('status', JSON.stringify({ status: 'patchComp1' }));

            var oSelect = new Select({
                items: {
                    path: "/approvers",
                    template: new sap.ui.core.Item({
                        key: "{id}",
                        text: "{name}" // Display the name property of each approver
                    })
                }
            });

            var oModel = new sap.ui.model.json.JSONModel();

            // Fetch data from backend
            await $.ajax({
                url: url1 + `approvers`, // Replace with the actual backend endpoint URL
                type: "GET",
                success: function (data) {
                    debugger
                    let arr = data.value;
                    var aApprovers = arr.map(item => ({ name: item.name }));

                    oModel.setData({ approvers: aApprovers });
                    oSelect.setModel(oModel);
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching approvers:", error);
                }
            });

            var oDialog = new Dialog({
                title: "Submit",
                resizable: true,
                draggable: true,
                content: [
                    new VerticalLayout({
                        content: [
                            new Label({ text: "Select Person to Further Assign:" }),
                            oSelect
                        ]
                    })
                ],                
                buttons: [
                    new Button({
                        text: "Yes",
                        press: async function () {
                            await oFunction.execute();
                            oDialog.close();
                            MessageToast.show("The complaint has been forwarded successfully");
                            location.reload();
                        }
                    }),
                    new Button({
                        text: "No",
                        press: function () {
                            oDialog.close();
                            MessageToast.show("Cancelled");
                        }
                    })
                ]
            }).addStyleClass("myCustomDialogClass");

            oDialog.open();
        }
    };
});
