//---------------構文解析---------------//
module.exports = parser;
var {expect,accept,show,error}  = require("./utils.js");
var tokens;

//構文解析開始
function parser(t){
    tokens = t;
    var ast = semi();
    if(tokens.length>0){
        show("ast=",ast);
        show("処理後tokens =",tokens);
        error("tokensが余っているので、どこかおかしいので終了");
    }
    return ast;
}

//その他は値としてそのまま返す
function value(){
    if(tokens.length ==0) return;
    //そのまま返す
    return tokens.shift();
}

//関数呼び出し
function funccall(){
    //関数名を取得
    var left = value();

    //関数呼び出しのカッコ
    var op;
    while(op = accept(tokens,"(")){
        //ここはvalueではなく、semiであることに注意
        //カッコの中は心機一転、新しい構文解析を始める
        var right = semi();

        //閉じカッコであることを確認して取得
        op += expect(tokens,")");

        //新しいノードを作成し階層を深める
        left = {left,op,right};
    }
    return left;
}

//セミコロン=複数文
function semi(){
    //左辺を取得
    var left = funccall();

    //演算子が続く間は連続する
    var op;
    while(op = accept(tokens,";")){
        //右辺を取得
        var right = funccall();

        //新しいノードを作成し階層を深める
        left = {left,op,right};
    }
    return left;
}
