function onFormSubmit(event) {
  // var newaa = Object.keys(event.namedValues).map(a => `${a} : ${event.namedValues[a]}`)
  // Object.keys(event).forEach(a => console.log(a))
  // newaa.push(`\n00-전체, 01-아무것도 못함, 02-현황판, 03-등록관리, 04-수가표 관리, 05-수가표 BOM 입력, 06-등록 BOM 조회, 07-원장관리, 08-구매팀관리`)
  // newaa.push(`update member_tb set auth = '(권한 숫자) where id = '(아이디기재)'`)
  // MailApp.sendEmail("litinglabs03@gmail.com, forapaeng1021@gmail.com","보조CRM 권한신청",newaa.join("\n"))
}

function ceta_db_column_edit(event){
  // 해당 스프레드 시트 불러오기
  var ceta_spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // 스프레드 시트에서 필요한 시트와 범위 불러오기
  var ceta_sheet = event.source.getActiveSheet();
  var ceta_range = event.source.getActiveRange();

  // 스프레드 시트에서 작성된 셀 및 행렬 불러오기
  var active_cell = ceta_sheet.getActiveCell();
  var active_row = active_cell.getRow();
  var active_column = active_cell.getColumn();

  // 메시지 작성에 필요한 구성요소 불러오기
  // 날짜
  var date_content = Utilities.formatDate(ceta_sheet.getRange(active_row, 1).getValue(), "GMT+9", "yyyy-MM-dd HH:mm:ss");
  // 아이디
  var id_content = ceta_sheet.getRange(active_row, 2).getValue();
  // 이름
  var name_content = ceta_sheet.getRange(active_row, 4).getValue();
  // 연락처
  var phone_number_content = ceta_sheet.getRange(active_row, 6).getValue();
  // 소속 부서
  var division_content = ceta_sheet.getRange(active_row, 9).getValue();
  // 요청 권한
  var auth_content = ceta_sheet.getRange(active_row, 7).getValue();
  // 요청 사유
  var reason_content = ceta_sheet.getRange(active_row, 8).getValue();

  // 슬랙에서 설정한 Incoming WebHook URL 설정
  var slack_url = "slack hook"; 

  // get the logged in user (we can only get email I thinks)
  // var current_user = Session.getActiveUser().getEmail();
  
  // 메시지 내용 작성
  var payload = { "text" : "[" + date_content + "] \n" + 
    name_content + "님이 새로 권한 신청을 하셨습니다. \n" + 
    "아이디 : " + id_content + "\n" + 
    "소속 부서 : " + division_content + "\n" + 
    "요청 권한 : " + auth_content + "\n" + 
    "요청 사유 : " + reason_content + "\n" +
    "연락처 : " + phone_number_content + "\n" + 
    "링크 : \n ```spread sheet cell" + active_row + "```"
  };

  //the URL payload
  var options = {
      "method" : "post",
      "contentType" : "application/json",
      "payload" : JSON.stringify(payload),
      "muteHttpExceptions" : true
  };

  // 메시지 발송
  var response = UrlFetchApp.fetch(slack_url, options);
  MailApp.sendEmail({
  to: "email address",
  subject: "권한 요청이 왔습니다.",
  htmlBody: "spread sheet cell"+active_row
  });
  return response;
}