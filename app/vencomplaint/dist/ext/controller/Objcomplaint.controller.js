sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";var t;return e.extend("vencomplaint.ext.controller.Objcomplaint",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onBeforeBinding:async function(e){debugger;sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::FacetSubSection::Complaints").setVisible(false);var o=window.location.href;var n=/pototcomp\('([^']+)'\)/;var g=(n.exec(o)||[])[1];sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[0].mAggregations.items[0].mAggregations.items[1].setText(g);var i;var s;var r;var a;var m;var c;var p=JSON.stringify({complainno:g});let d="submitcomplaints";debugger;let u=this.getView().getModel().bindContext(`/${d}(...)`);u.setParameter("data",p);u.setParameter("status",JSON.stringify({status:"getComp"}));await u.execute();debugger;let b=u.getBoundContext();t=b.getValue();debugger;let v=t.value;v=JSON.parse(v);i=v[0].cpono;s=v[0].cvencode;c=v[0].cpannum;r=v[0].cstatus;m=v[0].ccomplain_about;a=v[0].cdesc;debugger;sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[0].mAggregations.items[1].mAggregations.items[1].setText(i);sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[0].mAggregations.items[2].mAggregations.items[1].setText(c);sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[1].mAggregations.items[0].mAggregations.items[1].setText(s);sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[1].mAggregations.items[1].mAggregations.items[1].setText(m);sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[1].mAggregations.items[2].mAggregations.items[1].setText(r);sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[2].mAggregations.items[1].setValue(a);if(r!="Reverted"){var l=sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[2].mAggregations.items[1];l.setEditable(false);sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::FooterBar::CustomAction::revsumbit").setVisible(false);sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::FooterBar::CustomAction::revcancel").setText("Back")}else{var l=sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::CustomSubSection::Comps-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items[2].mAggregations.items[1];l.setEditable(true);sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::FooterBar::CustomAction::revsumbit").setVisible(true);sap.ui.getCore().byId("vencomplaint::vendor_poheaders_pototcompObjectPage--fe::FooterBar::CustomAction::revcancel").setText("Cancel")}},onAfterBinding:async function(e){debugger;var t=window.location.href;var o=/pototcomp\('([^']+)'\)/;var n=(o.exec(t)||[])[1];var g=this.base.getView().getContent()[0].getSections()[3].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[0].mBindingInfos.items.binding;g.filter(new sap.ui.model.Filter({path:"complaintno",operator:sap.ui.model.FilterOperator.EQ,value1:n}))}}}})});