/**
 * NA WEDDING — Google Apps Script backend.
 * Run setupNAWedding() once, then deploy as Web App.
 */
const SHEET_RSVP="RSVP",SHEET_WISH="Ucapan";
function setupNAWedding(){
 const p=PropertiesService.getScriptProperties();let id=p.getProperty("NA_DB_ID");
 const ss=id?SpreadsheetApp.openById(id):SpreadsheetApp.create("NA Wedding - Nazar & Aam");
 p.setProperty("NA_DB_ID",ss.getId());
 createSheet_(ss,SHEET_RSVP,["Timestamp","Nama","Kehadiran","Jumlah Tamu"]);
 createSheet_(ss,SHEET_WISH,["Timestamp","Nama","Ucapan"]);
 Logger.log("Spreadsheet database: "+ss.getUrl());return ss.getUrl();
}
function createSheet_(ss,n,h){let s=ss.getSheetByName(n)||ss.insertSheet(n);if(!s.getLastRow()){s.appendRow(h);s.setFrozenRows(1);s.getRange(1,1,1,h.length).setBackground("#596a49").setFontColor("#ffffff").setFontWeight("bold");s.autoResizeColumns(1,h.length);}}
function db_(){let id=PropertiesService.getScriptProperties().getProperty("NA_DB_ID");if(!id)throw new Error("Jalankan setupNAWedding() terlebih dahulu.");return SpreadsheetApp.openById(id);}
function json_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
function doGet(e){if(e.parameter.action==="getWishes")return json_({success:true,wishes:listWishes_()});return json_({success:true,message:"NA Wedding API aktif"});}
function doPost(e){try{let d=JSON.parse(e.postData.contents||"{}");if(d.action==="saveRsvp"){let n=clean_(d.name,100),a=clean_(d.attendance,30);if(!n||!["Hadir","Tidak Hadir"].includes(a))throw Error("Nama dan kehadiran wajib diisi.");db_().getSheetByName(SHEET_RSVP).appendRow([new Date(),n,a,Math.max(1,Math.min(10,Number(d.guests)||1))]);return json_({success:true});}if(d.action==="saveWish"){let n=clean_(d.name,100),m=clean_(d.message,500);if(!n||!m)throw Error("Nama dan ucapan wajib diisi.");db_().getSheetByName(SHEET_WISH).appendRow([new Date(),n,m]);return json_({success:true});}return json_({success:false,message:"Aksi tidak dikenal"});}catch(err){return json_({success:false,message:err.message});}}
function listWishes_(){let s=db_().getSheetByName(SHEET_WISH),n=s.getLastRow();if(n<2)return [];return s.getRange(2,1,n-1,3).getValues().slice(-50).reverse().map(r=>({name:String(r[1]),message:String(r[2])}));}
function clean_(v,n){return String(v||"").trim().replace(/[<>]/g,"").slice(0,n);}
