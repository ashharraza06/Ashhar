namespace db;

using {
    cuid,
    managed
} from '@sap/cds/common';

@cds.persistence.exists
entity vendorinfo {
    key panno     : String;
    key vencode   : String;
        poheaders : Composition of many poheader
                        on poheaders.vendor = $self.vencode;
}

@cds.persistence.exists
entity poheader {
    key pono      : String;
        vendor    : String;
        pannum    : String;
        amount    : String;
        potoven   : Association to one vendorinfo
                        on potoven.vencode = vendor;
        pototcomp : Composition of many complaint
                        on pototcomp.cpono = pono;
}

@cds.persistence.exists
entity complaint : managed {
    key complainno      : String;
        cpono           : String;
        cvencode        : String;
        cpannum         : String;
        cstatus         : String;
        //    @Common.FilterDefaultValue: 'Submitted';
        ccomplain_about : String;
        cdesc           : String;
        days            : Integer;
        wid             : String;
        comptopo        : Association to one poheader
                              on comptopo.pono = cpono;
        comptofile      : Composition of many files
                              on comptofile.complaintno = complainno;
        comptocomm      : Composition of many comments
                              on comptocomm.complainno = complainno;
        comptoworkflow  : Composition of many workflowhisotry
                              on comptoworkflow.complainno = complainno;

}

@cds.persistence.exists
entity files : cuid, managed {
    @Core.MediaType  : mediaType
    content     : LargeBinary;

    @Core.IsMediaType: true
    mediaType   : String;
    fileName    : String;
    size        : Integer;
    url         : String;
    complaintno : String;
    filetocom   : Association to one complaint
                      on filetocom.complainno = complaintno;
}

@cds.persistence.exists
entity comments : managed {
    key idd        : UUID;
        complainno : String;
        comments   : String;
        commtocomp : Association to one complaint
                         on commtocomp.complainno = complainno;
}

@cds.persistence.exists
entity approvers {
    key keyy : String;
    key name : String;
}

@cds.persistence.exists
entity workitems {
    key wid  : String;
    key name : String;
}
@cds.persistence.exists
entity levels{
    
   key level : String;
   key employeid : String;
   complainttype : String;
    
}
@cds.persistance.exists
entity workflowhisotry {
    key idd                   : UUID;
        complainno            : String;
        complainttype         : String;
        Employee_ID           : String;
        level                 : String;
        Approved_by           : String;
        Employee_Name         : String;
        Title                 : String;
        Notification_Status   : String;
        Result                : String;
        Begin_DateAND_Time    : String;
        End_DateAND_Time      : String;
        Days_Taken            : String;
        Remarks               : String;
        workflowhistorytocomp : Association to one complaint
                                    on workflowhistorytocomp.complainno = complainno;
}
