namespace db;

using {
    cuid,
    managed
} from '@sap/cds/common';


entity vendorinfo {
    key panno     : String;
    key vencode   : String;
        poheaders : Composition of many poheader
                        on poheaders.vendor = $self.vencode;
}

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

entity complaint {
    key complainno      : String;
        cpono           : String;
        cvencode        : String;
        cpannum         : String;
        cstatus         : String;
        ccomplain_about : String;
        cdesc           : String;
        comptopo        : Association to one poheader
                              on comptopo.pono = cpono;
        comptofile      : Composition of many files
                              on comptofile.complaintno = complainno;

}

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

entity comments : cuid {
    complainno : String;
    comments   : String;
}
