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
          payerList += sh.getRange(i+32, low+2).getValue() + "\n"
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

// 月単位の運営費を全取得する
function getManageMoney(line, sh) {
  for (var i=h; i<=p; i = i+6) {
    var manageMoney = sh.getRange(line, i).getValue()
    if (manageMoney != ""){
      var date = sh.getRange(line-31, d).getValue()
      date.setDate(date.getDate() - 1)
      var convdate = Utilities.formatDate(date,"JST","MM/dd")
      manageMoneyList += "■" + convdate + "\n" + manageMoney + "円\n"
      manageMoneyList += getPlayer(sh, i-4, line-24)
      sumManageMoney += parseInt(manageMoney)
    }
  }
  Logger.log(manageMoneyList + sumManageMoney + "円")
}