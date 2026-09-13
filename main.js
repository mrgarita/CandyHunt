/* ========================================
   プレイヤー
   ======================================== */

const player = {

	width: PLAYER_SIZE,
	height: PLAYER_SIZE,

    x: 0,
    y: 0,

};

/* ========================================
   お菓子
   ======================================== */

const candy = {

	width: CANDY_SIZE,
	height: CANDY_SIZE,

    x: 0,
    y: 0,

};

/* ========================================
   お化け
   ======================================== */

const ghost = {

	width: GHOST_SIZE,
	height: GHOST_SIZE,

    x: 0,
    y: 0,

};

/* ========================================
   フレーム毎の更新処理
   ======================================== */

function update() {

	movePlayer();
	moveGhost();
	checkCandy();

}

function movePlayer(){
	// ========== プレイヤーを動かす ==========
	if(keys["ArrowLeft"]){
		player.x -= PLAYER_SPEED;
	}
	if(keys["ArrowRight"]){
		player.x += PLAYER_SPEED;
	}
	if(keys["ArrowUp"]){
		player.y -= PLAYER_SPEED;
	}
	if(keys["ArrowDown"]){
		player.y += PLAYER_SPEED;
	}

	// 画面の外へ出さない
	player.x = Math.max(0, Math.min(player.x, GAME_WIDTH - PLAYER_SIZE));
	player.y = Math.max(0, Math.min(player.y, GAME_HEIGHT - PLAYER_SIZE));
}

function moveGhost(){
	// ========== お化けをプレイヤーに近づける ==========
	if(ghost.x < player.x){
		ghost.x += GHOST_SPEED;
	}
	else if(ghost.x > player.x){
		ghost.x -= GHOST_SPEED;
	}

	if(ghost.y < player.y){
		ghost.y += GHOST_SPEED;
	}
	else if(ghost.y > player.y){
		ghost.y -= GHOST_SPEED;
	}
}

function placeCandy(){
	// ========== お菓子を画面のどこかへ置きなおす ==========
	candy.x = randInt(0, GAME_WIDTH - CANDY_SIZE);
	candy.y = randInt(0, GAME_HEIGHT - CANDY_SIZE);
}

function checkCandy(){
	// ========== お菓子に重なったら、次の場所へ置きなおす ==========
	if(is_hit(player.x, player.y, PLAYER_SIZE, candy.x, candy.y, CANDY_SIZE)){
		score ++;
		placeCandy();
	}
}

/* ========================================
   描画処理
   ======================================== */

function draw() {

	cls(COLOR_DARK_BLUE);
	drawInfo();
	drawCandy();
	drawGhost();
	drawPlayer();
	drawScore();

}

function cls(color){
	// ========== 画面をクリアする(指定色) ==========
	ctx.fillStyle = color;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

function drawPlayer(){
	// ========== プレイヤーを描画する ==========
	if (assetImage.complete && 
		assetImage.naturalWidth > 0){
			ctx.drawImage(
				assetImage,
				PLAYER_U,
				0,
				PLAYER_SIZE,
				PLAYER_SIZE,
				player.x,
				player.y,
				player.width,
				player.height
			);
	}
}

function drawGhost(){
	// ========== お化けを描画する ==========
	if (assetImage.complete && 
		assetImage.naturalWidth > 0){
			ctx.drawImage(
				assetImage,
				GHOST_U,
				0,
				GHOST_SIZE,
				GHOST_SIZE,
				ghost.x,
				ghost.y,
				ghost.width,
				ghost.height
			);
	}
}

function drawCandy(){
	// ========== お菓子を描画する ==========
	if (assetImage.complete && 
		assetImage.naturalWidth > 0){
			ctx.drawImage(
				assetImage,
				CANDY_U,
				0,
				CANDY_SIZE,
				CANDY_SIZE,
				candy.x,
				candy.y,
				candy.width,
				candy.height
			);
	}
}

function drawScore(){
	// ========== スコアを描画する ==========
	ctx.fillStyle = COLOR_WHITE;
	ctx.fillText(
		"SCORE: "
		+ score,
		32,
		32
	)
}

function drawInfo(){
	// ========== 画面にゲーム情報を表示（一時的） ==========
	ctx.fillStyle = COLOR_YELLOW;

	ctx.fillText(
        INFO_TEXT,
        700,
        32
    );
}

function initGame(){
	// ========== ゲームをはじめからにする ==========
	player.x = (GAME_WIDTH - PLAYER_SIZE) / 2;
	player.y = (GAME_HEIGHT - PLAYER_SIZE) / 2;
	ghost.x = 0;
	ghost.y = 0;
	score = 0;
	placeCandy();		// お菓子を置く
}

/* ========================================
   ゲームループ
   ======================================== */

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(
        gameLoop
    );
}


/* ========================================
   初期化（アセット読み込み後 -> ゲーム開始）
   ======================================== */

// 画像読み込み
assetImage.src = "candy_hunt_images.png";

assetImage.onload = function(){
	console.log("画像アセット読み込み完了●");

	initGame();
	resizeCanvas();
	gameLoop();
}

assetImage.onerror = function(){
	console.error("画像アセットの読み込みに失敗しました◆");
}
