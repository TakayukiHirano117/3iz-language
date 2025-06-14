module.exports = parser;
var {expect,accept,show,error}  = require("./utils.js");

var tokens;

//構文解析開始
function parser(t){
    tokens = t;
    return callprint();
}

//print関数呼び出しの構文解析
function callprint(){
    if(tokens.length==0)return;

    //関数名がprintであること
    expect(tokens,"print");

    //関数呼び出しの丸カッコであること
    expect(tokens,"(");

    //文字列を取得
    var msg = tokens.shift();
    //ダブルクォーテーションを取り除く
    msg = msg.substr(1,msg.length-2);
    //表示=即実行
    console.log(msg);

    //閉じカッコであること
    expect(tokens,")");
}
