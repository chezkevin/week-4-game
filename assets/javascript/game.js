var pokemonNameArray = new Array("Greninja","M-Steelix","Typhlosion","Nidoking");

function hideStart(){
	$('.starters').css("display","none");
}

function findHp(pokemon){
	// hard-code enemy HP. . .
	if ( pokemon === 'Greninja' ){
		return 90;
	}
	else if ( pokemon === 'M-Steelix' ){
		return 160;
	}
	else if ( pokemon === 'Typhlosion'){
		return 110;
	}
	else if ( pokemon === 'Nidoking'){
		return 140;
	}
}

function turnBasedCombat(me,myHp,myAttack,enemy,enemyAttack,enemyHp){
	myHp = myHp - enemyAttack
	myAttack = myAttack + 8
	enemyHp = enemyHp - myAttack
	return [myHp,myAttack,enemyHp];
}

$(document).ready(function(){
	var charName = "";
	var charHp = 0;
	var charAttack = 10;
	var wins = 0;
	var newStats;
	var enemHp;

		// When the user picks a Pokemon. . .
		$('.choose').on('click',function() {
			hideStart();
			charName = $(this).data('name');
			showEnemies(charName);
			enemHp = 0;
			enemName = "";

			$('.char-name').html(charName);
			var thisNameHtml = ' <img src="assets/images/char_'+ charName +'.png"> ';
			$('.char-img').html(thisNameHtml);
			charHp = $(this).data('hp');
			$('.char-hp').html('HP: ' + charHp);
		});
		
		// pick all of the names EXCEPT for user's choice,
		// display as available enemies
		function showEnemies(pokemonName){
			for (var i = 0; i < pokemonNameArray.length; i++ ){
				enemName = pokemonNameArray[i];
				if ( pokemonName != pokemonNameArray[i] ){

					enemHp = findHp(pokemonNameArray[i]);
					var enemSection = $('<section>', {id: enemName});
					var enemButton = $('<button>');
					enemButton.addClass('col-sm-3 enemy');
					enemButton.attr('name',enemName);
					enemButton.attr('data-hp',enemHp);
					enemButton.html('<p>'+enemName+'</p>'+' <img src="assets/images/char_'+ enemName +'.png"> ' + '<p>HP: ' + enemHp + '</p>');

					$('.enemies').append(enemSection);
					$(enemSection).append(enemButton)
				}
			}
			$('.enemy').on('click',function() {
				enemName = $(this).attr('name');
				enemHp = findHp(enemName);
				console.log(newStats);
				// remove the chosen enemy from the "available enemies" section
				$('.' + $(this).attr('name')).empty();
				$(this).hide();

				$('.defender-name').html(enemName);
				$('.defender-img').html(' <img src="assets/images/char_'+ enemName +'.png"> ')
				$('.data-defender-hp').html('HP: ' + enemHp);

				$('.fight-button').on('click',function(evt) {
					evt.stopImmediatePropagation();
					newStats = turnBasedCombat(charName,charHp,charAttack,enemName,10,enemHp);
					console.log('newStats: ' + newStats);
					//alert('fight!');
					charHp = newStats[0];
					charAttack = newStats[1];
					enemHp = newStats[2];
					if (charHp <= 0){
						alert("Sorry. You lost all of your HP. Refresh the page to try again.");
					}
					else if (enemHp <= 0 && charHp >= 0 ){
						wins = wins + 1;
						alert("You defeated " + enemName + "! Congratulations! Pick a new defender.");
						enemName = '';
						enemHp = 0;
						$('.defender-name').empty();
						$('.defender-img').empty();
						$('.data-defender-hp').empty();
						//console.log("wins: " + wins);
						if (wins === 3){
							alert("Congratulations! You are a Pokemon Master.");
							enemAttack = 0;
						}
					}
					else{
						$('.data-defender-hp').html('HP: ' + enemHp);
						$('.char-hp').html('HP: ' + charHp);
					}
				});
			});
		}
	//}
})