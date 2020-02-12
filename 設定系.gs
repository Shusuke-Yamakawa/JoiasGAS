// 名前と時間帯を設定する処理
function setNmTime(sh, msg, column, row) {
  var name = msg.match(/\n\D+\n/)[0].replace('\n', '').replace('\n', '')
  var time = msg.slice(-2)
  var capacity1 = sh.getRange(row-1, column+1).getValue()
  var kaisaiFlg1 = sh.getRange(row-2, column+1).getValue()
  var sumPlayer1 = sh.getRange(row+22, column+1).getValue()
  var capacity2 = sh.getRange(row-1, column+2).getValue()
  var kaisaiFlg2 = sh.getRange(row-2, column+2).getValue()
  var sumPlayer2 = sh.getRange(row+22, column+2).getValue()      
  for (var i=row; i<=row+21; i++) {
    if (sh.getRange(i, column).getValue() == "") {
      sh.getRange(i, column).setValue(name)   //名称を設定
      if (time !== "後半") {        
        // 定員が設定されていない、または超えている場合は、定員フラグをtrueにする
        if ((kaisaiFlg1 && capacity1 == "")  || parseInt(sumPlayer1) >= parseInt(capacity1)) {
          capacityOver = true
        } else {
          sh.getRange(i, column+1).setValue(1)
        }
      }
      if (time !== "前半") {
        // 定員が設定されていない、または超えている場合は、定員フラグをtrueにする
        if ((kaisaiFlg2 && capacity2 == "")  || parseInt(sumPlayer2) >= parseInt(capacity2)) {
          capacityOver = true
        } else {
          sh.getRange(i, column+2).setValue(1)
        }
      }
      return
    }
  }
}

// キャンセル処理
function cancelNmTime(sh, msg, column, row) {
  for (var i=row; i<=row+21; i++) {
    var name = msg.match(/\n\D+\n/)[0].replace('\n', '').replace('\n', '')
    if (sh.getRange(i, column).getValue() == name) {
      var time = msg.slice(-2)
      if (time == "前半") {
        sh.getRange(i, column+1).setValue("")
      }
      if (time == "後半") {
        sh.getRange(i, column+2).setValue("")
        sh.getRange(i, column+3).setValue("")
      } else {
        sh.getRange(i, column).setValue("")   //名称をクリア
        sh.getRange(i, column+1).setValue("")
        sh.getRange(i, column+2).setValue("")
        sh.getRange(i, column+3).setValue("")
      }
      cancelMiss = false
      return
    }
  }
}

// 運営費を除去する H列、6行目を受け取る
function removeManageMoney(sh, column, row) {
  sh.getRange(row+2, column+4).setValue("中止")
  sh.getRange(row+4, column+1, 1, 3).clearContent()
  sh.getRange(row+7, column+1, 22, 3).clearContent()
}