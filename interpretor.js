#!/usr/bin/env node
//別ファイルに記述している処理を読み込む
var {read,show}  = require("./utils.js");
var lexer = require("./lexer.js");
var parser = require("./parser.js");

//source.3から読み込む
var source = read("source.3");

//字句解析
var tokens = lexer(source);
show("tokens =",tokens);

//------構文解析しながら実行------//
parser(tokens);
