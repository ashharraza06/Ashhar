sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Item",
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';
    var that = this;
    let arr = [];
    return {

        submit: async function (oEvent) {


            var url1 = this._view.getModel().sServiceUrl
            // var url1 = `/odata/v4/my/`

            // MessageToast.show("Custom handler invoked.");
            debugger
            debugger;
            var vendercode = sap.ui.getCore().byId("vencomplaint::vendor_poheadersObjectPage--fe::CustomSubSection::Complain-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[1].getText();
            var ponumber = sap.ui.getCore().byId("vencomplaint::vendor_poheadersObjectPage--fe::CustomSubSection::Complain-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[3].getText();
            var desc = sap.ui.getCore().byId("vencomplaint::vendor_poheadersObjectPage--fe::CustomSubSection::Complain-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[7]._lastValue;
            var id = sap.ui.getCore().byId("vencomplaint::vendor_poheadersObjectPage--fe::CustomSubSection::Complain-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[5].mProperties.selectedItemId;
            var a = sap.ui.getCore().byId("vencomplaint::vendor_poheadersObjectPage--fe::CustomSubSection::Complain-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[5].mForwardedAggregations.items;
            var comp;

            var panpath = window.location.href;

            var regex = /panno='([^']+)'/;

            // Execute the regular expression on the path and directly extract the value of pan
            var pan = (regex.exec(panpath) || [])[1];
            a.forEach(function (element) {
                // Check if element exists and has sId property
                if (element && element.sId) {
                    // Compare the sId with selectedItemId
                    if (element.sId === id) {
                        // If there's a match, push the sId into matchingSIds array
                        comp = element.mProperties.text;
                    }
                }
            });

            var status = "Submitted";
            var randomNumber = Math.floor(Math.random() * 1000000);

            // // Get the current timestamp
            var timestamp = new Date().getTime();

            // // Combine timestamp and random number to create a unique ID
            var uniqueId = timestamp + '-' + randomNumber;

            var compno = uniqueId.toString();

            var testdata = JSON.stringify({
                complainno: compno,
                cpono: ponumber,
                cvencode: vendercode,
                cpannum: pan,
                cstatus: status,
                ccomplain_about: comp,
                cdesc: desc
            });
            debugger
            let functionname = 'submitcomplaints';
            let oFunction = this._view.getModel().bindContext(`/${functionname}(...)`);
            oFunction.setParameter('data', testdata);
            oFunction.setParameter('status', JSON.stringify({ status: 'postComp' }));
            // oFunction.setParameter('file',this.file);
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
                        press: async function (oEvent) {
                            debugger

                            await oFunction.execute();
                            let fid;
                            for (let i = 0; i < arr.length; i++) {
                                fid = arr[i];

                                let filedata = JSON.stringify({ ID: fid, complaintno: compno });
                                // var url = '/odata/v4/my/files/' + fid;
                                var url = url1 + `files/`+fid;
                                $.ajax({
                                    url: url,
                                    type: 'PATCH',
                                    contentType: 'application/json',
                                    data: filedata,
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
                                })
                            }
                            // const oContext = oFunction.getBoundContext();
                            // await $.ajax({
                            //     url: url1 + `complains`,
                            //     type: 'POST',
                            //     contentType: 'application/json',
                            //     data: testdata,
                            //     success: function (data) {
                            //         debugger
                            //         // Handle success
                            //         MessageToast.show("Complaint Sumbitted.");
                            //     },
                            //     error: function (jqXHR, textStatus, errorThrown) {
                            //         // Handle error
                            //         console.error(textStatus, errorThrown);
                            //         MessageToast.show("Unexpected Error Occurred.");
                            //     }
                            // })
                            sap.ui.getCore().byId("vencomplaint::vendor_poheadersObjectPage--fe::CustomSubSection::Complain-innerGrid")
                                .mAggregations.content[0]
                                .mAggregations.content
                                .mAggregations.items[7]
                                .setValue("");
                            MessageToast.show("Submitted Succesfully");
                            window.history.go(-2);

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

        },
        cancel: function () {
            // MessageToast.show("Custom handler invoked.");
            // history.back();
            debugger
            sap.ui.getCore().byId("vencomplaint::vendor_poheadersObjectPage--fe::CustomSubSection::Complain-innerGrid")
                .mAggregations.content[0]
                .mAggregations.content
                .mAggregations.items[7]
                .setValue("");

            window.history.go(-2);
        },
        onAfterItemAdded: function (oEvent) {
            debugger;
            var url1 = this._view.getModel().sServiceUrl
            // var url1 = `/odata/v4/my/`
            var item = oEvent.getParameter("item");

            var _createEntity = function (item) {
                debugger;
                var data = {
                    mediaType: item.getMediaType(),
                    fileName: item.getFileName(),
                    size: item.getFileObject().size
                };

                var settings = {
                    // url: "/odata/v4/my/files",
                    url: url1 + `files`,
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                };

                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((results, textStatus, request) => {
                            resolve(results.ID);
                            debugger
                            arr.push(results.ID);
                        })
                        .fail((err) => {
                            reject(err);
                        });
                });
            };

            _createEntity(item)
                .then((id) => {
                    // var url = `/odata/v4/my/files(${id})/content`;
                    var url = url1 + `files(${id})/content`
                    item.setUploadUrl(url);
                    var oUploadSet = this.byId("uploadSet");
                    oUploadSet.setHttpRequestMethod("PUT");
                    oUploadSet.uploadItem(item);
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        onUploadCompleted: function (oEvent) {
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.removeAllIncompleteItems();
            oUploadSet.getBinding("items").refresh();
        },

        onRemovePressed: function (oEvent) {
            debugger
            oEvent.preventDefault();
            oEvent.getParameter("item").getBindingContext().delete();
            MessageToast.show("Selected file has been deleted");
        },

        onOpenPressed: function (oEvent) {
            debugger;
            oEvent.preventDefault();
            var item = oEvent.getSource();
            var fileName = item.getFileName();
            var url2 = this._view.getModel().sServiceUrl
            url2 = url2.replace('/odata/v4/my/', '');
            // var url2 = oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().getParent().getParent().getParent().oBindingContexts.undefined.oModel.sServiceUrl
            
            var _download = function(item) {
            	var settings = {
            		url: url2 + item.getUrl(),
            		method: "GET",
            		headers: {
            			"Content-type": "application/octet-stream"
            		},
            		xhrFields: {
            			responseType: 'blob'
            		}
            	};

            	return new Promise((resolve, reject) => {
            		$.ajax(settings)
            			.done((result) => {
            				resolve(result);
            			})
            			.fail((err) => {
            				reject(err);
            			});
            	});
            };

            _download(item)
            	.then((blob) => {
            		var url = window.URL.createObjectURL(blob);
            		// Open the URL in a new tab
            		window.open(url, '_blank');
            	})
            	.catch((err) => {
            		console.log(err);
            	});
        },


        _download: function (item) {
            debugger;
            var settings = {
                url: item.getUrl(),
                method: "GET",
                headers: {
                    "Content-type": "application/octet-stream"
                },
                xhrFields: {
                    responseType: 'blob'
                }
            }

            return new Promise((resolve, reject) => {
                $.ajax(settings)
                    .done((result) => {
                        resolve(result)
                    })
                    .fail((err) => {
                        reject(err)
                    })
            });
        },

        _createEntity: function (item) {
            debugger
            var data = {
                mediaType: item.getMediaType(),
                fileName: item.getFileName(),
                size: item.getFileObject().size
            };

            var settings = {
                url: "/attachments/files",
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                data: JSON.stringify(data)
            }

            return new Promise((resolve, reject) => {
                $.ajax(settings)
                    .done((results, textStatus, request) => {
                        resolve(results.ID);
                        debugger
                        arr.push(results.ID);
                    })
                    .fail((err) => {
                        reject(err);
                    })
            })
        },

        _uploadContent: function (item, id) {
            debugger
            var url = `/attachments/Files(${id})/content`
            item.setUploadUrl(url);
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.setHttpRequestMethod("PUT")
            oUploadSet.uploadItem(item);
        },

        //formatters
        formatThumbnailUrl: function (mediaType) {
            var iconUrl;
            switch (mediaType) {
                case "image/png":
                    iconUrl = "sap-icon://card";
                    break;
                case "text/plain":
                    iconUrl = "sap-icon://document-text";
                    break;
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    iconUrl = "sap-icon://excel-attachment";
                    break;
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    iconUrl = "sap-icon://doc-attachment";
                    break;
                case "application/pdf":
                    iconUrl = "sap-icon://pdf-attachment";
                    break;
                default:
                    iconUrl = "sap-icon://attachment";
            }
            return iconUrl;
        }
    };
});
