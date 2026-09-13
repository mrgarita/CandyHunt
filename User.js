"use strict";

const INFO_TEXT = "フェーズ５： お化けに追いかけさせる";

/* ========================================
   ゲーム内部の基準サイズ
   ======================================== */

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 960;

const PLAYER_SIZE = 64;
const PLAYER_SPEED = 4;

const CANDY_SIZE = 64;

const GHOST_SIZE = 64;
const GHOST_SPEED = 2;

const PLAYER_U = 0;        // プレイヤーの絵の切り出し位置
const GHOST_U = 64;        // お化けの絵の切り出し位置
const CANDY_U = 128;       // お菓子の絵の切り出し位置

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

/* ===== 定数 ===== */
const assetImage = new Image();		// 画像のイメージバング
const keys = {};					      // 押しているキーの番号

let score = 0;
