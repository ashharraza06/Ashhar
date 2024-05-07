using {db} from '../db/schema';

service MyService {
    entity vendor    as projection on db.vendorinfo;
    entity poheader  as projection on db.poheader;
    entity complains as projection on db.complaint;
    entity files     as projection on db.files;
    entity comment   as projection on db.comments;
    entity approvers as projection on db.approvers;
    entity levels as projection on db.levels;
    entity workflowhistory as projection on db.workflowhisotry;
    entity workitems as projection on db.workitems;
    function submitcomplaints(data : String,status:String) returns String;
    function triggerProcess(data : String, status : String) returns String;
}
