// 名前と時間帯を設定する処理
function setNmTime(sh, msg, low, line) {
  for (var i=line; i<=line+21; i++) {
    if (sh.getRange(i, low).getValue() == "") {
      var name = msg.match(/\n\D+\n/)[0].replace('\n', '').replace('\n', '')
      sh.getRange(i, low).setValue(name)   //名称を設定
      var time = msg.slice(-2)
      if (time !== "後半") {
        sh.getRange(i, low+1).setValue(1)
      }
      if (time !== "前半") {
        sh.getRange(i, low+2).setValue(1)
      }
      return
    }
  }
}

// キャンセル処理
function cancelNmTime(sh, msg, low, line) {
  for (var i=line; i<=line+21; i++) {
    var name = msg.match(/\n\D+\n/)[0].replace('\n', '').replace('\n', '')
    if (sh.getRange(i, low).getValue() == name) {
      var time = msg.slice(-2)
      if (time == "前半") {
        sh.getRange(i, low+1).setValue("")
      }
      if (time == "後半") {
        sh.getRange(i, low+2).setValue("")
        sh.getRange(i, low+3).setValue("")
      }
      if (time == "フル") {
        sh.getRange(i, low).setValue("")   //名称をクリア
        sh.getRange(i, low+1).setValue("")
        sh.getRange(i, low+2).setValue("")
        sh.getRange(i, low+3).setValue("")
      }
      return
    }
  }
}