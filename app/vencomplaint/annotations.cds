using MyService as service from '../../srv/service';

annotate service.vendor with @(
    UI.DeleteHidden : true
);
annotate service.poheader with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Complaint History',
            ID : 'ComplaintsHistory',
            Target : 'pototcomp/@UI.LineItem#ComplaintsHistory',
        },
    ]
);
annotate service.complains with @(
    UI.LineItem #ComplaintsHistory : [
        {
            $Type : 'UI.DataField',
            Value : complainno,
            Label : 'Complaint No',
        },{
            $Type : 'UI.DataField',
            Value : complain_about,
            Label : 'Complain About',
        },{
            $Type : 'UI.DataField',
            Value : status,
            Label : 'Status',
        },]
);
annotate service.vendor with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : panno,
            Label : 'PAN Number',
        },
        {
            $Type : 'UI.DataField',
            Value : vencode,
            Label : 'Vendor Code',
        },
    ]
);
annotate service.vendor with {
    panno @Common.FieldControl : #ReadOnly
};
annotate service.vendor with {
    vencode @Common.FieldControl : #ReadOnly
};
annotate service.vendor with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'PO Details',
            ID : 'PODetails',
            Target : 'poheaders/@UI.LineItem#PODetails',
        },
    ]
);
annotate service.poheader with @(
    UI.LineItem #PODetails : [
        {
            $Type : 'UI.DataField',
            Value : pono,
            Label : 'PO Number',
        },{
            $Type : 'UI.DataField',
            Value : vendor,
            Label : 'Vendor Code',
        },{
            $Type : 'UI.DataField',
            Value : amount,
            Label : 'Amount',
        },]
);
annotate service.poheader with {
    pono @Common.FieldControl : #ReadOnly
};
annotate service.poheader with {
    vendor @Common.FieldControl : #ReadOnly
};
annotate service.poheader with {
    amount @Common.FieldControl : #ReadOnly
};
annotate service.complains with {
    complainno @Common.FieldControl : #ReadOnly
};
annotate service.complains with {
    pono @Common.FieldControl : #ReadOnly
};
annotate service.complains with {
    pannum @Common.FieldControl : #ReadOnly
};
annotate service.complains with {
    vencode @Common.FieldControl : #ReadOnly
};
annotate service.complains with {
    complain_about @Common.FieldControl : #ReadOnly
};
annotate service.complains with {
    status @Common.FieldControl : #ReadOnly
};
