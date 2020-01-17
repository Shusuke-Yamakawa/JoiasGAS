var ss = SpreadsheetApp.getActiveSpreadsheet()
// 参加者確認依頼で使用
var nameList = ""
// 支払い確認依頼で使用
var moneyList = ""
// 列を定数化
w = 23
d = 4
p = 16

// 処理のテスト用の関数（エントリー関連）
function testEntry() {
  var msg = 'エントリー依頼\n2020/1/18\nテスト\nフル'
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

// エントリー処理のメイン処理
function setEntry(request, msg, low) {
  var month = msg.match(/\/[0-9]+\//)[0].replace('/', '').replace('/', '')
  var sh = ss.getSheetByName(month + '月管理表')
  // 最終行を取得
  lastRow = sh.getLastRow()
  for (var i=4; i<=lastRow; i = i+40) {
    var day = sh.getRange(i, low).getValue() // スプシの日付を取得
    var d1 = new Date(day) // Dateを作成
    var date = msg.match(/\n[0-9]+\/[0-9]+\/[0-9]+/)[0].replace('\n', '').replace('\n', '') //msgの日付を取得
    var d2 = new Date(date) // Dateを作成
    var dt = Math.abs(d1.getTime() - d2.getTime()) // ミリ秒数値を引き算
    var result = dt / (1000 * 60 * 60 * 24) // １日のミリ秒数で割り算
    if (result == '1') {
      if (request == "エントリー依頼"){
        setNmTime(sh, msg, low, i+7)
      }else if (request == "キャンセル依頼"){
        cancelNmTime(sh, msg, low, i+7)
      }else if (request == "参加者確認依頼"){
        showEntry(sh, low, i+7)
      }else if (request == "支払い確認依頼"){
        showMoney(sh, low, i+7)
      }
    }
  }
}

var channel_access_token = "lvzvnQZ5d4+rAKCA4cDrcdkuMG1F1oD0X7ygfx60e2ZfLcPpGYepfjWdwy+FuAWQM5nDotrQiAIiSldnIfsHLO+So1mW4pW1q1DzdoARRdq/GIvyKHcuAd9mXCuSVB4vcwaLLXy1TQ/kLZsE2BgPvQdB04t89/1O/w1cDnyilFU="
// ボットにメッセージ送信/フォロー/アンフォローした時の処理
function doPost(e) {
  var events = JSON.parse(e.postData.contents).events;
  events.forEach(function(event) {
    if(event.type == "message") {
      if (event.message.type=="text") {
        setSs(event);
      }
    } else if(event.type == "follow") {
      follow(event);
    } else if(event.type == "unfollow") {
      unFollow(event);
    }
 });
}

function setSs(e) {
  var msg = e.message.text
  request = msg.slice(0,7)
  if(request == "エントリー依頼" || request == "キャンセル依頼" || request == "参加者確認依頼"){
    for (var i=d; i<=p; i = i+6) {
      setEntry(request, msg, i)
    }
    reply(request, e)
  } else if(request == "【今週末の練習"){
    for (var i=d; i<=p; i = i+6) {
      showPayer(i)
    }
    reply(request, e)
  }
}

// 入力されたメッセージをおうむ返し
function reply(request, e) {
  var msgText = ""
  if (request=="エントリー依頼") {
    msgText = "エントリーしました！"
  }else if(request=="キャンセル依頼") {
    msgText = "キャンセルしました！"
  }else if(request=="参加者確認依頼") {
    msgText = nameList
  }else if(request=="【今週末の練習") {
    msgText = "コート受付はYou！\n" + payerList + "\nよろしく！！"
  }
  
  var message = {
    "replyToken" : e.replyToken,
    "messages" : [
      {
        "type" : "text",
//        "text" : ((e.message.type=="text") ? e.message.text : "Text以外は返せません・・・")
        "text" : msgText
      }
    ]
  };
  var replyData = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + channel_access_token
    },
    "payload" : JSON.stringify(message)
  };
  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", replyData);
}


/* フォローされた時の処理 */
function follow(e) {
  
}

/* アンフォローされた時の処理 */
function unFollow(e){
  
}