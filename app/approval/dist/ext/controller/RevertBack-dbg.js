sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    return {
        RevertBack: function (oEvent) {
            debugger
            var comm = this.byId("approval::complainsObjectPage--fe::CustomSubSection::Comments--ta").getValue();
            var path = window.location.href;
            var regex = /complains\('([^']+)'\)/;
            var match = path.match(regex);
            var compno = match[1];
            var status = "Reverted";
            let testdata = JSON.stringify({ complainno: compno, cstatus: status });
            var url = '/odata/v4/my/complains/' + compno;
            // MessageToast.show("Custom handler invoked.");
            let functionname = 'submitcomplaints';
            var oFunction = this._view.getModel().bindContext(`/${functionname}(...)`);
            // let oFunction = oEvent.oSource.bindContext(`/${functionname}(...)`);
            oFunction.setParameter('data', testdata);
            oFunction.setParameter('status', JSON.stringify({ status: 'patchComp1' }));
            var oDialog = new sap.m.Dialog({
                title: "Revert",
                resizable: true,
                draggable: true,
                content: [
                    new sap.m.Label({ text: "Are you sure you want to Revert Back to vendor?" })
                ],
                buttons: [
                    new sap.m.Button({
                        text: "Yes",
                        press: async function () {
                            debugger
                            // var compno = sap.ui.getCore().byId("approval::complainsObjectPage--fe::FormContainer::ComplaintDetails::FormElement::DataField::complainno::Field-content").mAggregations.contentEdit[0].mProperties.value
                            // var compno = sap.ui.getCore().byId("approval::complainsObjectPage--fe::FormContainer::Complaint::FormElement::DataField::complainno::Field-content").mAggregations.contentDisplay.mProperties.text
                            //    var path = window.location.href;
                            //    var regex = /complains\('([^']+)'\)/;
                            //    var match = path.match(regex);
                            //    var compno = match[1];
                            //     var status = "Reverted";
                            //     let testdata = JSON.stringify({cstatus : status });
                            //     var url = '/odata/v4/my/complains/' + compno;
                            //   await  $.ajax({
                            //         url: url,
                            //         type: 'PATCH',
                            //         contentType: 'application/json',
                            //         data: testdata,
                            //         success: function (data) {
                            //             debugger
                            //             // Handle success
                            //             console.log(data);

                            //         },
                            //         error: function (jqXHR, textStatus, errorThrown) {
                            //             // Handle error
                            //             debugger
                            //             console.error(textStatus, errorThrown);
                            //         }
                            //     });
                            await oFunction.execute();
                            var testdata1 = JSON.stringify({ complainno: compno, comments : comm });
                            oFunction.setParameter('data', testdata1);
                            oFunction.setParameter('status', JSON.stringify({ status: 'postComm' }));
                            await oFunction.execute();
                            oDialog.close();
                            MessageToast.show("Reverted Successfully");
                            location.reload();
                        }
                    }),
                    new sap.m.Button({
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

