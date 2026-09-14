/* ========================================
   マウス／タッチ
   ======================================== */

canvas.addEventListener(
    "pointerdown",
    function(event) {

        const pos =
            getGamePosition(event);

        /*
         * プレイヤーをクリック／タッチしたか
         */

        const dx =
            pos.x - player.x;

        const dy =
            pos.y - player.y;

        const distance =
            Math.sqrt(dx * dx + dy * dy);

        if (distance <= player.radius) {

            player.dragging = true;

            canvas.setPointerCapture(
                event.pointerId
            );
        }
    }
);


canvas.addEventListener(
    "pointermove",
    function(event) {

        if (!player.dragging) {
            return;
        }

        const pos =
            getGamePosition(event);

        player.x = pos.x;
        player.y = pos.y;
    }
);


canvas.addEventListener(
    "pointerup",
    function(event) {

        player.dragging = false;
    }
);


canvas.addEventListener(
    "pointercancel",
    function(event) {

        player.dragging = false;
    }
);

/* ========================================
   キーボード
   ======================================== */
window.addEventListener(
	"keydown",
	function(event){
		keys[event.code] = true;
        console.log(event.code);
		// 矢印キーのページスクロール抑制
		if(
			event.code === "ArrowLeft" ||
			event.code === "ArrorRight" ||
			event.code === "ArrowUp" ||
			event.code === "ArrowDown"
		){
			event.preventDefault();
		}
	}
);

window.addEventListener(
	"keyup",
	function(event){
		keys[event.code] = false;
	}
);