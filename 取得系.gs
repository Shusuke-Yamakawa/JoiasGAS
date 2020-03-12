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
        setRole(sh, i, column, d1);
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
        setRole(sh, i, column, d1);
      }
    }
  }
  Logger.log(payerList)
}

function setRole(sh, i, column, d1) {
  var payer = sh.getRange(i+32, column+1).getValue()
  if (payer != "") {
    payerList += "\n"
    payerList += d1.getDate()-1 + GetDayOfWeek(d1.getDay()) + "\n"
    payerList += "☆コート受付\n" + payer + "\n\n★コート名義\n"
    payerList += sh.getRange(i+32, column+2).getValue() + "\n"
    payerList += "★コート代：" + sh.getRange(i+5, column+4).getValue() + "円" + "\n\n"
    payerList += "☆練習管理\n" + "  " + sh.getRange(i+33, column+1).getValue() + "\n"
    payerList += "☆かごボ\n" + "  " + sh.getRange(i+34, column+1).getValue() + "\n"
    payerList += "☆NEWボ\n" + "  " + sh.getRange(i+35, column+1).getValue() + "\n"
    payerList += "☆会計\n" + "  " + sh.getRange(i+36, column+1).getValue() + "\n"
    payerList += "☆開催判断\n" + "  " + sh.getRange(i+37, column+1).getValue() + "\n\n"
    showMoney(sh, column, i+7)
    payerList += "★参加費\n" + moneyList.replace(/,/g, '円\n').trim() + "\n"
  }
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
  var tempList = [];
  for (var i=row; i<=row+21; i++) {
    if (sh.getRange(i, column).getValue() != "") {
      money = sh.getRange(i, column+4).getValue()
      tempList.push(money)
    }
  }
  var newArray = tempList.filter(function (x, i, self) {
    return self.indexOf(x) === i;
  });
  for(var i=0; i<newArray.length; i=i+1){
    moneyList += newArray[i] + "円\n"
  }
  Logger.log(moneyList)
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