ss = SpreadsheetApp.getActiveSpreadsheet()
// 参加者確認依頼で使用
var nameList = ""
// 支払い確認依頼で使用
now = new Date()
var payerList = ""
var moneyList
var nameListAll = ""
var manageMoneyList = ""
var sumManageMoney = 0
// 列を定数化
d = 4
h = 8
p = 16
w = 23


// ただの設定用の関数
function teeest() {
  var test = "10"
  var test2 = "20"
  var test3 = parseInt(test) + parseInt(test2)
  Logger.log(test3)
  
}  


// 処理のテスト用の関数（エントリー関連）
function testEntry() {
  var msg = 'エントリー依頼\n2020/2/8\nテスト\nフル'
  Logger.log(msg.slice(0,7))
  
  var request = msg.slice(0,7)
  var month = msg.match(/\/[0-9]+\//)[0].replace('/', '').replace('/', '')
  Logger.log(month)
  var sh = ss.getSheetByName(month + '月管理表')
  var date = msg.match(/\n[0-9]+\/[0-9]+\/[0-9]+/)[0].replace('\n', '').replace('\n', '')
//  sh.getRange(45,w).setValue(date)
  var name = msg.match(/\n\D+\n/)[0].replace('\n', '').replace('\n', '')
//  sh.getRange(46,w).setValue(name)
  var time = msg.slice(-2)
//  sh.getRange(47,w).setValue(time)
  
  for (var i=d; i<=p; i = i+6) {
    setEntry(request, msg, i)
  }
}  

// 処理のテスト用の関数（名前取得または会計取得）
function testGetNmorMoney() {
//  var msg = '参加者確認依頼\n2020/1/18'
  var msg = '支払い確認依頼\n2020/1/11'
  Logger.log(msg.slice(0,7))
  
  var request = msg.slice(0,7)
  var month = msg.match(/\/[0-9]+\//)[0].replace('/', '').replace('/', '')
  Logger.log(month)
  var sh = ss.getSheetByName(month + '月管理表')
  var date = msg.match(/\n[0-9]+\/[0-9]+\/[0-9]+/)[0].replace('\n', '').replace('\n', '')
  Logger.log(date)
  
  for (var i=d; i<=p; i = i+6) {
    setEntry(request, msg, i)
  }
}  

// コート受付表示のテスト実行
function testShowPayer() {
  var msg = '【今週末の練習】\ndummy'
  Logger.log(msg.slice(0,7))
  for (var i=d; i<=p; i = i+6) {
    showPayer(i)
  }
}

// 月ごとの参加者を全て取得
function testPlayerAll() {
  var msg = '全参加者を取得\n2月'
  Logger.log(msg.slice(0,7))
  var month = msg.match(/\n[0-9]+/)[0].replace('\n', '')
  var sh = ss.getSheetByName(month + '月管理表')
  lastRow = sh.getLastRow()
  // その週の行をループ⇒次の週の行をループとする（他は列をループ⇒行ループに移るやり方）
  for (var i=5; i<=lastRow; i = i+40) {
    getPlayerAll(i, sh)
  }
}

// 指定した月の金額を取得
function testManageMoney() {
  const msg = '月別運営費取得\n1月'
  Logger.log(msg.slice(0,7))
  var month = msg.match(/\n[0-9]+/)[0].replace('\n', '')
  var sh = ss.getSheetByName(month + '月管理表')
  lastRow = sh.getLastRow()
  // その週の行をループ⇒次の週の行をループとする（他は列をループ⇒行ループに移るやり方）
  for (var i=35; i<=lastRow; i = i+40) {
    getManageMoney(i, sh)
  }
  // その週の行をループ⇒次の週の行をループとする（他は列をループ⇒行ループに移るやり方）
//  for (var i=5; i<=lastRow; i = i+40) {
//    getPlayerAll(i, sh)
//  }
}