using MyService as service from '../../srv/service';

annotate service.complains with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : complainno,
            Label : 'Complaint No',
        },
        {
            $Type : 'UI.DataField',
            Value : pannum,
            Label : 'Pan No',
        },
        {
            $Type : 'UI.DataField',
            Value : vencode,
            Label : 'Vendor Code',
        },
    ]
);
annotate service.complains with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Complaint Details',
            ID : 'ComplaintDetails',
            Target : '@UI.FieldGroup#ComplaintDetails',
        },
    ],
    UI.FieldGroup #ComplaintDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : complainno,
                Label : 'Complaint No',
            },
            {
                $Type : 'UI.DataField',
                Value : pono,
                Label : 'PO Number',
            },
            {
                $Type : 'UI.DataField',
                Value : pannum,
                Label : 'Pan Number',
            },
            {
                $Type : 'UI.DataField',
                Value : vencode,
                Label : 'Vendor Code',
            },
            {
                $Type : 'UI.DataField',
                Value : complain_about,
                Label : 'Complain About',
            },
            {
                $Type : 'UI.DataField',
                Value : status,
                Label : 'Status',
            },{
                $Type : 'UI.DataField',
                Value : desc,
                Label : 'Complain Description',
            },],
    }
);
annotate service.complains with {
    desc @UI.MultiLineText : true
};
