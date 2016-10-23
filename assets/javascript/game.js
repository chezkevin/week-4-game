function hideStart(){
	$('.starters').css("display","none");
}

$(document).ready(function(){
	$('.choose').on('click',function() {
		hideStart();
		$('.char-name').html(this.name);
		var thisNameHtml = ' <img src="assets/images/char_'+ this.name +'.png"> ';
		$('.char-img').html(thisNameHtml);
		var charHp = 0;
		charHp=this.hp;
		console.log("this.name: " + this.name + " this.hp: " + this.hp);
		$('.char-hp').html('HP: ' + charHp);
	});
	
})