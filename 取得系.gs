function showPayer(column) {
  var sh = ss.getSheetByName(now.getMonth() + 1 + '月管理表')
  // 最終行を取得
  lastRow = sh.getLastRow()
  for (var i=4; i<=lastRow; i=i+40) {
    var d1 = new Date(sh.getRange(i, column).getValue()) // スプレッドシートの日付
    var nowDate = new Date()
    for (var j=0; j<5; j++){
      var findDate = new Date(nowDate.getYear(), nowDate.getMonth(), nowDate.getDate() + j)
      var dt = Math.abs(d1.getTime() - findDate.getTime()) // ミリ秒数値を引き算
      var result = dt / (1000 * 60 * 60 * 24) // １日のミリ秒数で割り算
      if (result == '0') {
        var payer = sh.getRange(i+32, column+1).getValue()
        if (payer != "") {
          payerList += "\n"+ GetDayOfWeek(d1.getDay()) + "\n" + payer + "\n\n"
          payerList += sh.getRange(i+32, column+2).getValue() + "\n"
          payerList += "コート代：" + sh.getRange(i+5, column+4).getValue() + "円" + "\n"
        }
      }
    }
  }
  // 27日以降は翌月のシートも参照する
  if (nowDate.getDate() > 26) {
    var sh = ss.getSheetByName(now.getMonth() + 2 + '月管理表')
    for (var column=d; column<=p; column = column+6) {
      for (var i=4; i<=lastRow; i = i+40) {
        var day = sh.getRange(i, column).getValue() // スプシの日付
        var d1 = new Date(day) // スプレッドシートの日付
        var payer = sh.getRange(i+32, column+1).getValue()
        if (payer != "") {
          payerList += "\n"+ GetDayOfWeek(d1.getDay()) + payer + "\n"
          payerList += sh.getRange(i+32, column+2).getValue() + "\n"
          payerList += "コート代：" + sh.getRange(i+5, column+4).getValue() + "円" + "\n"
        }
      }
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
function showMoney(sh, column, row) {
//  var money = sh.getRange('H91:H94').getValues()
  var columnMoney = column+4
  Logger.log(row)
  Logger.log(columnMoney)
  var money = sh.getRange(row, columnMoney, 21, 1).getValues()
//  for (var i=row; i<=row+21; i++) {
//    if (sh.getRange(i, column).getValue() != "") {
//      money = sh.getRange(i, column+4).getValue()
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
function getManageMoney(row, sh) {
  for (var i=h; i<=p; i = i+6) {
    var manageMoney = sh.getRange(row, i).getValue()
    if (manageMoney != ""){
      var date = sh.getRange(row-31, d).getValue()
      date.setDate(date.getDate() - 1)
      var convdate = Utilities.formatDate(date,"JST","MM/dd")
      manageMoneyList += "■" + convdate + "\n" + manageMoney + "円\n"
      manageMoneyList += getPlayer(sh, i-4, row-24)
      sumManageMoney += parseInt(manageMoney)
    }
  }
  Logger.log(manageMoneyList + sumManageMoney + "円")
}