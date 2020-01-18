var now = new Date()
var payerList = ""
var moneyList

function teeest() {
  day = now.getDate()
  month = now.getMonth()
  if (day > 18) {
    Logger.log(month+2)
  }
  Logger.log(day)
  
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

function testFunc() {
  var msg = '【今週末の練習】\ndummy'
  Logger.log(msg.slice(0,7))
  for (var i=d; i<=p; i = i+6) {
    showPayer(i)
  }
}

function showPayer(low) {
  var sh = ss.getSheetByName(now.getMonth() + 1 + '月管理表')
  // 最終行を取得
  lastRow = sh.getLastRow()
  for (var i=4; i<=lastRow; i = i+40) {
    var day = sh.getRange(i, low).getValue() // スプシの日付
    var d1 = new Date(day) // スプレッドシートの日付
    var dt = Math.abs(d1.getTime() - now.getTime()) // ミリ秒数値を引き算
    var result = dt / (1000 * 60 * 60 * 24) // １日のミリ秒数で割り算
    if (result < '4') {
      var payer = sh.getRange(i+32, low+1).getValue()
      if (payer != "") {
          payerList += GetDayOfWeek(d1.getDay()) + payer + "\n"
          payerList += sh.getRange(i+32, low+3).getValue() + "\n"
          payerList += "コート代：" + sh.getRange(i+5, low+4).getValue() + "円" + "\n"
      }
    }
  }
  // 見つからない場合、翌月と考え、翌月のシートを参照する（未テストなので、月末に確認する）
  if (payerList == "") {
    var sh = ss.getSheetByName(now.getMonth() + 2 + '月管理表')
    var day = sh.getRange(4, low).getValue() // スプシの日付
    var d1 = new Date(day) // スプレッドシートの日付
    var payer = sh.getRange(36, low+1).getValue()
    if (payer != "") {
          payerList += GetDayOfWeek(d1.getDay()) + payer + "\n"
          payerList += sh.getRange(36, low+3).getValue() + "\n"
          payerList += "コート代：" + sh.getRange(9, low+4).getValue() + "円" + "\n"
      }
  }
  Logger.log(payerList)
}



// 曜日の取得 date型にgetDayした引数を連携
function GetDayOfWeek(dayOfWeek) {
//  var date = new Date();
//  var dayOfWeek = date.getDay();
  // 時間帯を入れているため、曜日を1日分ずらしている
  var dayOfWeekStr = ["(土)", "(日)", "(月)", "(火)", "(水)", "(木)", "(金)" ][dayOfWeek];
//  Logger.log(dayOfWeekStr);
  return dayOfWeekStr
}

// 参加者を取得する
function showEntry(sh, low, line) {
  for (var i=line; i<=line+21; i++) {
    if (sh.getRange(i, low).getValue() != "") {
      var name = sh.getRange(i, low).getValue()
      var time1 = sh.getRange(i, low+1).getValue()
      var time2 = sh.getRange(i, low+2).getValue()
      var time3 = sh.getRange(i, low+3).getValue()
      nameList += name + " " + time1 + " " + time2 + " " + time3 + "\n"  //名称と時間を取得
    }
  }
  Logger.log(nameList)
}

// 支払い額を設定する
function showMoney(sh, low, line) {
//  var money = sh.getRange('H91:H94').getValues()
  var lowMoney = low+4
  Logger.log(line)
  Logger.log(lowMoney)
  var money = sh.getRange(line, lowMoney, 21, 1).getValues()
//  for (var i=line; i<=line+21; i++) {
//    if (sh.getRange(i, low).getValue() != "") {
//      money = sh.getRange(i, low+4).getValue()
//      moneyList += money + "\n"  //名称と時間を取得
//    }
//  }
  tempList = money.filter(function(e, index){
    return !money.some(function(e2, index2){
      return index > index2 && e[0] == e2[0] && e[1] == e2[1];
    });
  });
  moneyList = tempList + ""
  Logger.log(moneyList.replace(/,/g, '円\n'))
}