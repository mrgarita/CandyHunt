/*
 * 指定範囲の整数乱数を生成する関数(min~max)
 *
 * @param {int} min 乱数の最小値
 * @param {int} max 乱数の最大値
 *
 * @return {int} min~maxの範囲の整数乱数
 */ 
const randInt = (min, max) =>{
	return Math.floor(Math.random() * (max+1-min)+min);
};

/* ========================================
   Canvasサイズ調整
   ======================================== */

function resizeCanvas() {

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    /*
     * ゲームの4:3を維持したまま、
     * 画面に入る最大サイズを計算
     */

    scale = Math.min(
        screenWidth / GAME_WIDTH,
        screenHeight / GAME_HEIGHT
    );

    const displayWidth =
        GAME_WIDTH * scale;

    const displayHeight =
        GAME_HEIGHT * scale;


    /*
     * CanvasのCSS上の表示サイズ
     */

    canvas.style.width =
        displayWidth + "px";

    canvas.style.height =
        displayHeight + "px";


    /*
     * Canvasを画面中央へ
     */

    offsetX =
        (screenWidth - displayWidth) / 2;

    offsetY =
        (screenHeight - displayHeight) / 2;


    /*
     * 高DPIディスプレイ対策
     */

    const dpr =
        Math.min(window.devicePixelRatio || 1, 2);

    canvas.width =
        GAME_WIDTH * dpr;

    canvas.height =
        GAME_HEIGHT * dpr;


    /*
     * 描画座標をゲーム座標に合わせる
     */

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    /*
     * ドット絵をぼかさない
     */
	ctx.imageSmoothingEnabled = false;

    /*
     * テキスト描画設定
  	 */
	ctx.textBaseline = "top";
	ctx.font = "32px consols";

}


/* ========================================
   画面サイズ変更
   ======================================== */

window.addEventListener(
    "resize",
    resizeCanvas
);


/* ========================================
   ゲーム座標へ変換
   ======================================== */

function getGamePosition(event) {

    const rect =
        canvas.getBoundingClientRect();

    /*
     * ブラウザ上の座標
     */

    const screenX =
        event.clientX;

    const screenY =
        event.clientY;


    /*
     * Canvas内部の960×540座標へ変換
     */

    const x =
        (screenX - rect.left)
        / rect.width
        * GAME_WIDTH;

    const y =
        (screenY - rect.top)
        / rect.height
        * GAME_HEIGHT;


    return {
        x: x,
        y: y
    };
}

/* ========================================
   2つの四角が重なっていれば、 True を返す
   ======================================== */
function is_hit(x1, y1, size1, x2, y2, size2){
	return (x1 < x2 + size2) && (x2 < x1 + size1) &&
			(y1 < y2 + size2) && (y2 < y1 + size1)
}
