"use strict";

const INFO_TEXT = "フェーズ 7 タイトル画面ともう一度あそぶ";

/* ========================================
   ゲーム定数
   ======================================== */

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 960;

const PLAYER_U = 0;        // プレイヤーの絵の切り出し位置
const GHOST_U = 64;        // お化けの絵の切り出し位置
const CANDY_U = 128;       // お菓子の絵の切り出し位置

const PLAYER_SIZE = 64;
const PLAYER_SPEED = 4;

const GHOST_SIZE = 64;
const GHOST_SPEED = 2;

const CANDY_SIZE = 64;

const HIT_SIZE = 32;       // 当たり判定に使う四角の大きさ（絵の中央だけを見る）
const HIT_OFFSET = (PLAYER_SIZE - HIT_SIZE) / 2;   // 絵の左上から判定の四角までの距離

const SCENE_PLAY = 0;      // あそんでいる画面
const SCENE_GAMEOVER = 1;  // ゲームオーバー画面
const SCENE_TITLE = 2;     // タイトル画面

const GAMEOVER_WAIT = 30;  // 捕まってから文字を出すまでの時間
const BLINK_CYCLE = 30;    // 点滅 1 周期の時間(ms)
const BLINK_ON = 20;       // そのうち文字が見えているフレーム数

/* ========================================
   ゲームアセット
   ======================================== */

const ASSET_PATH = "assets/";
const ASSET_IMAGE = "candy_hunt_images.png";

/* ========================================
   カラーパレット
   ======================================== */
const COLOR_BLACK = "#000000";
const COLOR_DARK_BLUE = "#1D2B53";
const COLOR_DARK_PURPLE = "#7E2553";
const COLOR_DARK_GREEN = "#008751";
const COLOR_BROWN = "#AB5236";
const COLOR_DARK_GRAY = "#5F574F";
const COLOR_LIGHT_GRAY = "#C2C3C7";
const COLOR_WHITE = "#FFF1E8";
const COLOR_RED = "#FF004D";
const COLOR_ORANGE = "#FFA300";
const COLOR_YELLOW = "#FFEC27";
const COLOR_GREEN ="#00E436";
const COLOR_BLUE = "#29ADFF";
const COLOR_INDIGO = "#83769C";
const COLOR_PINK = "#FF77A8";
const COLOR_PEACH = "#FFCCAA";


/* ========================================
   Canvas
   ======================================== */

const canvas = document.getElementById("game");

const ctx = canvas.getContext("2d");


/* ========================================
   表示倍率
   ======================================== */

let scale = 1;

let offsetX = 0;
let offsetY = 0;

/* ========================================
   ゲーム内定数・変数
   ======================================== */
const assetImage = new Image();		// 画像のイメージバング
const keys = {};					      // 押しているキーの番号

let score = 0;                      // スコア
let scene = 0;                      // 画面遷移
let frameCount = 0;                 // フレーム数
let gameOverFrame = 0;              // ゲームオーバー時のフレーム数
