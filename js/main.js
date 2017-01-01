window.onload = function() {
	var btn = document.getElementById("btn");
	var imgs = document.querySelectorAll("img");
	var isMoving = false;
	btn.onclick = function() {
		if (isMoving) {
			return ;
		}
		isMoving = true;
		
		var endNum = 0;
		for (var i = 0; i < imgs.length; i++) {
			(function(i){
				setTimeout(function() {
					montion.call(imgs[i], '10ms', function(){
						this.style.transform = 'scale(0)';
					}, function() {
						montion.call(imgs[i], '1s', function() {
							this.style.transform = 'scale(1)';
							this.style.opacity = 0;
						}, function() {
							endNum++;
							if (endNum === imgs.length) {
								endNum = 0;
								toBig();
							}
						});
					});
				}, Math.random() * 1000);
			})(i);
		}
		
		function montion(time, doFn, callBack) {
			this.style.transition = time;
			doFn.call(this);
			
			var isCalled = false;
			this.addEventListener('transitionend', function() {
				if (!isCalled) {
					callBack && callBack();
					isCalled = true;
				}
			}, false);
		}
		
		function toBig() {
			for (var i = 0; i < imgs.length; i++) {
				imgs[i].style.transition = '';
				imgs[i].style.transform = `rotateY(0deg) translateZ(${-Math.random() * 1000}px)`;
				(function(i) {
					setTimeout(function() {
						montion.call(imgs[i], '2s', function() {
							this.style.opacity = 1;
							this.style.transform = `rotateY(-360deg) translateZ(0px)`;
						}, function () {
							endNum++;
							if (endNum === imgs.length) {
								isMoving = false;
							}
						});
					}, Math.random()* 1000);
				})(i);
			}
		}
	};
	setInterval(btn.onclick, 5000);
}