function onOpen() {
  SpreadsheetApp
   .getUi()
   .createMenu("CustomMenu")
   .addItem("sidebar", "showAdminSidebar")
   .addToUi();  

   showAdminSidebar()
}

function showAdminSidebar() {
  var widget = HtmlService.createHtmlOutputFromFile("main.html");
  widget.setTitle("권한설정");
  SpreadsheetApp.getUi().showSidebar(widget);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function currntId() {
  var ss = SpreadsheetApp.getActive();
  var sheetName = ss.getActiveSheet().getName();
  var sheet = ss.getActiveSheet();
  var activeRow = sheet.getActiveCell().getRow();

  if (sheetName === "설문지 응답 시트1" && activeRow > 1) {
    var lc = sheet.getLastColumn()
    var moveArr = {}
    var values = sheet.getRange(activeRow,1,1,lc).getValues();
    
    moveArr.timestamp = Utilities.formatDate(new Date(values[0][0]),"GMT+9","yyyy-MM-dd HH:mm:ss")
    moveArr.id = values[0][1]
    moveArr.hospital = values[0][2]
    moveArr.name = values[0][3]
    moveArr.birth = Utilities.formatDate(new Date(values[0][0]),"GMT+9","yyyy-MM-dd")
    moveArr.phone = values[0][5]
    moveArr.auth = values[0][6]
    moveArr.reason = values[0][7]
    moveArr.department = values[0][8]
    moveArr.row = activeRow
    
    return moveArr
  } else {
    return {}
  }
}

function result(result, row) {
  var ss = SpreadsheetApp.getActive();
  var sheetName = ss.getActiveSheet().getName();
  var sheet = ss.getActiveSheet();

  if (sheetName === "설문지 응답 시트1") {
    if (result.length === 0) {
      sheet.getRange(row,1,1,sheet.getLastColumn()).setBackground("#fcf0f0")
      sheet.getRange(row,10).setValue("실패")
    } else {
      sheet.getRange(row,1,1,sheet.getLastColumn()).setBackground("#f0fcf0")
      sheet.getRange(row,10).setValue("완료")
    }
  }
}