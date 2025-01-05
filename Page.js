function doGet() {
  return HtmlService.createTemplateFromFile("index").evaluate()
  .setTitle("Login RL51")
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function loginUser(email, password) {
  var sheet = SpreadsheetApp.openById('1tM8qlL48MyzwWdXxWqL8EnOejV9z8L4zdIRsIapxeTnRsE-KFugLmvZY').getSheetByName('Login');
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === email && data[i][1] === password) {
      if (data[i][2] === 'yes') {
        return true;
      } else {
        return false; 
      }
    }
  }
  return false;
}
