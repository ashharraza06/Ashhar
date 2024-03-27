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
            Value : cpannum,
            Label : 'Pan No',
        },
        {
            $Type : 'UI.DataField',
            Value : cvencode,
            Label : 'Vendor Code',
        },
        {
            $Type : 'UI.DataField',
            Value : cstatus,
            Label : 'Status',
        },
        {
            $Type : 'UI.DataFieldForAnnotation',
            Target : '@UI.Chart#days',
            Label : 'Days',
        },
    ]
);
annotate service.complains with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Complaint',
            ID : 'Complaints',
            Target : '@UI.FieldGroup#Complaint',
        },
    ],
    UI.FieldGroup #Complaint : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : complainno,
                Label : 'Complaint No',
            },
            {
                $Type : 'UI.DataField',
                Value : cpannum,
                Label : 'PAN Number',
            },
            {
                $Type : 'UI.DataField',
                Value : cvencode,
                Label : 'Vendor Code',
            },
            {
                $Type : 'UI.DataField',
                Value : cpono,
                Label : 'PO Number',
            },
            {
                $Type : 'UI.DataField',
                Value : ccomplain_about,
                Label : 'Complain About',
            },{
                $Type : 'UI.DataField',
                Value : cdesc,
                Label : 'Complain Description',
            },{
                $Type : 'UI.DataField',
                Value : cstatus,
                Label : 'Status',
            },],
    }
);
annotate service.complains with @(
    UI.DeleteHidden : true
);
annotate service.complains with @(
    UI.SelectionFields : [
        cstatus,
    ]
);
annotate service.complains with {
    cstatus @Common.Label : 'cstatus'
};
annotate service.complains with @(
    UI.DataPoint #days : {
        Value : days,
        MinimumValue : 1,
        MaximumValue : 7,
        CriticalityCalculation : {
            ImprovementDirection : #Minimize,
            DeviationRangeHighValue : 5,
            ToleranceRangeHighValue : 3,
        },
    },
    UI.Chart #days : {
        ChartType : #Bullet,
        Measures : [
            days,
        ],
        MeasureAttributes : [
            {
                DataPoint : '@UI.DataPoint#days',
                Role : #Axis1,
                Measure : days,
            },
        ],
    }
);
