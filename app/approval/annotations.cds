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
                Value : complain_about,
                Label : 'complain_about',
            },{
                $Type : 'UI.DataField',
                Value : complainno,
                Label : 'complainno',
            },{
                $Type : 'UI.DataField',
                Value : desc,
                Label : 'desc',
            },{
                $Type : 'UI.DataField',
                Value : pannum,
                Label : 'pannum',
            },{
                $Type : 'UI.DataField',
                Value : pono,
                Label : 'pono',
            },{
                $Type : 'UI.DataField',
                Value : status,
                Label : 'status',
            },{
                $Type : 'UI.DataField',
                Value : vencode,
                Label : 'vencode',
            },],
    }
);
