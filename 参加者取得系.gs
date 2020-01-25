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

// 月単位の参加者を全取得する
function getPlayerAll(line, sh) {
  for (var i=d; i<=p; i = i+6) {
    var courtNm = sh.getRange(line, i).getValue()
    if (courtNm != ""){
      var date = sh.getRange(line-1, i).getValue()
      date.setDate(date.getDate() - 1)
      var convdate = Utilities.formatDate(date,"JST","MM/dd")
      nameListAll += "■" + convdate + "\n" + courtNm + "\n"
      nameListAll += getPlayer(sh, i, line+6)
    }
  }
  Logger.log(nameListAll)
}

// 参加者を取得する
function getPlayer(sh, low, line) {
  var playerList = ""
  for (var i=line; i<=line+21; i++) {
    if (sh.getRange(i, low).getValue() != "") {
      var name = sh.getRange(i, low).getValue()
      var time1 = sh.getRange(i, low+1).getValue()
      var time2 = sh.getRange(i, low+2).getValue()
      var time3 = sh.getRange(i, low+3).getValue()
      playerList += name + " " + time1 + " " + time2 + " " + time3 + "\n"  //名称と時間を取得
    }
  }
  return playerList + "\n"
}
