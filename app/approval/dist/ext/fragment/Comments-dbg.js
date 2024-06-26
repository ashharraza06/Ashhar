sap.ui.define([
    "sap/m/MessageToast",
    "sap/suite/ui/commons/util/DateUtils"
], function (MessageToast) {
    'use strict';

    return {
        //         onPress: function(oEvent) {
        //             // MessageToast.show("Custom handler invoked.");
        //             debugger
        //             var cdialog = new sap.m.Dialog({
        //                 title: "Comments",
        //                 endButton: new sap.m.Button({
        //                     text: "Close",
        //                     press: async function() {
        //                         cdialog.close();
        //                     },
        //                     layoutData: new sap.m.FlexItemData({
        //                         // Add layoutData for flexible item behavior
        //                         growFactor: 5,
        //                         alignSelf: "End" // Align the button to the end (right)
        //                     })
        //                 })
        //             });
        //             cdialog.addContent(new sap.m.VBox({
        //                 width:"60vw"
        //             }));

        //             function generateUniqueId() {
        //                 // Generate a random number
        //                 var randomNumber = Math.floor(Math.random() * 1000000);

        //                 // Get the current timestamp
        //                 var timestamp = new Date().getTime();

        //                 // Combine timestamp and random number to create a unique ID
        //                 var uniqueId = timestamp + '-' + randomNumber;

        //                 return uniqueId;
        //             }
        //             debugger
        //             var oTimelineItem = new sap.suite.ui.commons.TimelineItem("thisuniqid1" + generateUniqueId(), {
        //                 dateTime: "12/3/34",
        //                 // title: "demo title1",
        //                 userNameClickable: false,
        //                 // userNameClicked: "onUserNameClick",
        //                 // select: "onPressItems",
        //                 // userPicture: "Photo",
        //                 text: 'Demo Comments',
        //                 userName: "Comments"
        //             });



        //             cdialog.addContent(oTimelineItem);

        //             cdialog.open(); // Open the dialog
        // debugger
        //         }
        onPress: async function (oEvent) {
            debugger
            var cdialog = new sap.m.Dialog({
                title: "Comments",
                endButton: new sap.m.Button({
                    text: "Close",
                    press: async function () {
                        cdialog.close();
                    },
                    layoutData: new sap.m.FlexItemData({
                        // Add layoutData for flexible item behavior
                        growFactor: 5,
                        alignSelf: "End" // Align the button to the end (right)
                    })
                })
            });
            cdialog.addContent(new sap.m.VBox({
                width: "60vw"
            }));

            function generateUniqueId() {
                var randomNumber = Math.floor(Math.random() * 1000000);
                var timestamp = new Date().getTime();
                var uniqueId = timestamp + '-' + randomNumber;
                return uniqueId;
            }
            debugger
            var path = window.location.href;
            var regex = /complains\('([^']+)'\)/;
            var match = path.match(regex);
            var getcomp = match ? match[1] : null;
            var testdata = JSON.stringify({
                complainno: getcomp
            });
            let functionname = 'submitcomplaints';
            debugger
            let oFunction = this._view.getModel().bindContext(`/${functionname}(...)`);
            oFunction.setParameter('data', testdata);
            oFunction.setParameter('status', JSON.stringify({ status: 'getComments' }));
            await oFunction.execute();
            debugger

            let context = oFunction.getBoundContext();
            let getdata = context.getValue();
            let result = getdata.value;
            result = JSON.parse(result);
            var len = result.length;
            for (var i = 0; i < result.length; i++) {
                var oTimelineItem = new sap.suite.ui.commons.TimelineItem("thisuniqid1" + generateUniqueId(), {
                    dateTime: "12/3/34",
                    // title: "demo title1",
                    userNameClickable: false,
                    // userNameClicked: "onUserNameClick",
                    // select: onPressItems,
                    // userPicture: "Photo",
                    text: result[i].comments
                    // userName: result[i].CREATEDBY
                });
                cdialog.addContent(oTimelineItem);
            }
            // var t;
            // function onPressItems(oEvent) {
            //     debugger
            //     // Get the clicked timeline item
            //     t = oEvent.getSource().mProperties.text;
            //     commnetbox.setValue(t);
            //     cdialog.close();
            // }

            cdialog.open();
        }

    };
});