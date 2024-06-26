sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onPress: function(oEvent) {
            var cdialog = new sap.m.Dialog({
                title: "Approval Comments",
                endButton: new sap.m.Button({
                    text: "Close",
                    press: async function() {
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
                width:"60vw"
            }));

            function generateUniqueId() {
                // Generate a random number
                var randomNumber = Math.floor(Math.random() * 1000000);

                // Get the current timestamp
                var timestamp = new Date().getTime();

                // Combine timestamp and random number to create a unique ID
                var uniqueId = timestamp + '-' + randomNumber;

                return uniqueId;
            }
            var oTimelineItem = new sap.suite.ui.commons.TimelineItem("thisuniqid1"+generateUniqueId(),{
                dateTime: "12/3/34",
                title: "demo title1",
                userNameClickable: false,
                // userNameClicked: "onUserNameClick",
                select: "onPressItems",
                userPicture: "Photo",
                text: 'Demo Comment1',
                userName: "username1"
            });
            var oTimelineItem1 = new sap.suite.ui.commons.TimelineItem("thisuniqid2"+generateUniqueId(),{
                dateTime: "12/3/34",
                title: "demo title2",
                userNameClickable: false,
                // userNameClicked: "onUserNameClick",
                select: onPressItems,
                userPicture: "Photo",
                text: 'Demo Comment2',
                userName: "username2"
            });            
            cdialog.addContent(oTimelineItem);
            cdialog.addContent(oTimelineItem1);

            function onPressItems(oEvent) {
                debugger
                // Get the clicked timeline item
                var oClickedItem = oEvent.getSource();
            
                // Perform actions based on the clicked timeline item
                console.log("Timeline item clicked:", oClickedItem.getTitle());
                // Example: Open a popover or display more details
            }
    
            cdialog.open(); // Open the dialog
debugger

        }
    };
});
