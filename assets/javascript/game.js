var pokemonNameArray = new Array("Greninja","M-Steelix","Typhlosion","Nidoking");

function hideStart(){
	$('.starters').css("display","none");
}

function findHp(pokemon){
	// hard-code enemy HP. . .
	if ( pokemon === 'Greninja' ){
		var enemHp = 90;
	}
	else if ( pokemon === 'M-Steelix' ){
		var enemHp = 160;
	}
	else if ( pokemon === 'Typhlosion'){
		var enemHp = 110;
	}
	else if ( pokemon === 'Nidoking'){
		var enemHp = 140;
	}
	return enemHp;
}

function turnBasedCombat(me,myHp,myAttack,enemy,enemyAttack,enemyHp){
	myHp = myHp - enemyAttack
	myAttack = myAttack + 8
	enemyHp = enemyHp - myAttack
	return [myHp,myAttack,enemyHp];
}

$(document).ready(function(){
	// var myChar = {
	// 	charName"",
	// 	charHp: 0,
	// 	charAttack: 8,
	var charName = "";
	var charHp = 0;
	var charAttack = 10;

		$('.choose').on('click',function() {
			hideStart();
			charName = this.name;
			showEnemies(charName);
			enemHp = 0;
			enemName = "";

			$('.char-name').html(charName);
			var thisNameHtml = ' <img src="assets/images/char_'+ this.name +'.png"> ';
			$('.char-img').html(thisNameHtml);
			charHp = $(this).data('hp');
			$('.char-hp').html('HP: ' + charHp);
		});
		// pick all of the names EXCEPT for user's choice,
		// display as available enemies
		function showEnemies(pokemonName){
			for (var i = 0; i < pokemonNameArray.length; i++ ){
				var enemName = pokemonNameArray[i];
				if ( pokemonName != pokemonNameArray[i] ){
					// console.log('pokemonNameArray[i]: ' + pokemonNameArray[i]);
					// console.log('pokemonName: ' + pokemonName);

					enemHp = findHp(pokemonNameArray[i]);

					var enemButton = $('<button>');
					enemButton.addClass('col-sm-3 enemy');
					enemButton.attr('name',enemName);
					enemButton.attr('data-hp',enemHp);
					enemButton.html('<p>'+enemName+'</p>'+' <img src="assets/images/char_'+ enemName +'.png"> ' + '<p>HP: ' + enemHp + '</p>');
					//console.log('enemButton: ' + enemButton);
					$('.enemies').append(enemButton);
				}
			}
			$('.enemy').on('click',function() {
				enemName = $(this).attr('name');
				enemHp = findHp(enemName);
				// remove the chosen enemy from the "available enemies" section
				$('.' + $(this).attr('name')).show();

				$('.defender-name').html(enemName);
				$('.defender-img').html(' <img src="assets/images/char_'+ enemName +'.png"> ')
				$('.data-defender-hp').html(enemHp);

				$('.fight-button').on('click',function() {
					var newStats = turnBasedCombat(charName,charHp,charAttack,enemName,10,enemHp);
					charHp = newStats[0];
					charAttack = newStats[1];
					enemHp = newStats[2];

					if (enemHp <= 0 ){
						alert("You defeated " + enemName + "! Congratulations! Pick a new defender.");
						$('.enemy').remove();
					}
					$('.data-defender-hp').html(enemHp);

					console.log("your charname: " + charName);
					console.log("you fought! Your new hp: " + charHp);
					console.log("enem's new hp: "+ enemHp);

				});
			});
		}
	//}
})