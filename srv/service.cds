using { db } from '../db/schema';

service MyService
 {

    entity vendor as projection on  db.vendorinfo; 
    entity poheader as projection on db.poheader;
    entity complains as projection on  db.complaint;  
    entity files as projection on db.files; 
}