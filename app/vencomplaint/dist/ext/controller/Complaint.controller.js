sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";return e.extend("vencomplaint.ext.controller.Complaint",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onBeforeBinding:function(e){debugger;var n=window.location.href;var t=n.indexOf("vencode='")+"vencode='".length;var i=n.substring(t,n.indexOf("'",t));var o=n.indexOf("poheaders('")+"poheaders('".length;var r=n.substring(o,n.indexOf("'",o));sap.ui.getCore().byId("vencomplaint::vendor_poheadersObjectPage--fe::CustomSubSection::Complain-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[1].setText(i);sap.ui.getCore().byId("vencomplaint::vendor_poheadersObjectPage--fe::CustomSubSection::Complain-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[3].setText(r)},onAfterBinding:async function(e){debugger;var n=null;var t=this.base.getView().getContent()[0].getSections()[3].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[0].mBindingInfos.items.binding;t.filter(new sap.ui.model.Filter({path:"complaintno",operator:sap.ui.model.FilterOperator.EQ,value1:n}));t.refresh()}}}})});