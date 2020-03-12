// TODO msgを引数にするのは廃止。渡す時点で個々の変数に分解して渡す（ループで何度も処理を通すのを避ける）

// エントリー処理のメイン処理
function setEntry(request, msg, column) {
  var month = msg.match(/\/[0-9]+\//)[0].replace('/', '').replace('/', '')
  var sh = ss.getSheetByName(month + '月管理表')
  // 最終行を取得
  lastRow = sh.getLastRow()
  for (var i=4; i<=lastRow; i = i+40) {
    var day = sh.getRange(i, column).getValue() // スプシの日付を取得
    var d1 = new Date(day) // Dateを作成
    var date = msg.match(/\n[0-9]+\/[0-9]+\/[0-9]+/)[0].replace('\n', '').replace('\n', '') //msgの日付を取得
    var d2 = new Date(date) // Dateを作成
    var dt = Math.abs(d1.getTime() - d2.getTime()) // ミリ秒数値を引き算
    var result = dt / (1000 * 60 * 60 * 24) // １日のミリ秒数で割り算
    if (result == '1') {
      if (request == "エントリー依頼"){
        setNmTime(sh, msg, column, i+7)
      }else if (request == "キャンセル依頼"){
        cancelNmTime(sh, msg, column, i+7)
      }else if (request == "参加者確認依頼"){
        showEntry(sh, column, i+7)
      }else if (request == "支払い確認依頼"){
        showMoney(sh, column, i+7)
      }else if (request == "中止後処理依頼"){
        removeManageMoney(sh, column, i)
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
      unfollow(event);
    }
 });
}

function setSs(e) {
  var msg = e.message.text
  var request = msg.slice(0,7)
  if(request == "エントリー依頼" || request == "キャンセル依頼" || request == "参加者確認依頼" || request == "支払い確認依頼" || request == "中止後処理依頼"){
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
  
  var month = msg.match(/\n[0-9]+/)[0].replace('\n', '')
  var sh = ss.getSheetByName(month + '月管理表')
  var lastRow = sh.getLastRow()
  if(request == "全参加者を取得"){
    for (var i=5; i<=lastRow; i = i+40) {
      getPlayerAll(i, sh)
    }
    reply(request, e)
  } else if(request == "月別運営費取得"){
    for (var i=35; i<=lastRow; i = i+40) {
      getManageMoney(i, sh)
    }
    reply(request, e)
  }
}

// 入力されたメッセージをおうむ返し
function reply(request, e) {
  var msgText = ""
  if (request=="エントリー依頼") {
    if (capacityOver) {
      msgText = "定員オーバーしているか練習日ではありません。\nスプレッドシートor設定した日付を確認ください。"
    }else{
      msgText = "エントリーしました！"
    }
  }else if(request=="キャンセル依頼") {
    if (cancelMiss) {
      msgText = "キャンセル対象が見つかりません。\n日付か名前が間違っていないか確認ください。"
    }else{
      msgText = "キャンセルしました！"
    }
  }else if(request=="参加者確認依頼") {
    msgText = nameList.trim()
  }else if(request=="支払い確認依頼") {
    msgText = moneyList.replace(/,/g, '円\n').trim()
  }else if(request=="【今週末の練習") {
    msgText = "役割は以下の通りだ！\n" + payerList + "\nコメアツ！！"
  }else if(request=="全参加者を取得") {
    msgText = nameListAll.trim()
  }else if(request=="月別運営費取得") {
    msgText = manageMoneyList + "月合計：" + sumManageMoney + "円"
  }else if(request=="中止後処理依頼") {
    msgText = "中止処理を行いました"
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
function unfollow(e){
  
}