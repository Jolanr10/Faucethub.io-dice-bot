$('div.col-xs-5.col-sm-6.col-md-6 > div.game-page-item').append('<button class="btn btn-primary" id="betiddec" name="betnamedec" onclick="buttondec()">/2</button>');
$('div.col-xs-5.col-sm-6.col-md-6 > div.game-page-item').append('<button class="btn btn-primary" id="betidin" name="betnamein" onclick="buttonin()">X2</button>');
$('div.col-xs-5.col-sm-6.col-md-6').append('<div class="game-page-title">Multiply</div>').append('<input type="number" min="1" value="" class="form-control" placeholder="50% for set 1.5 - for 100% set 2" id="dice-multy">');
var auto = $('#dice-roll').after('<button class="btn btn-primary" id="dice-auto"></button>');
var autostop = $('#dice-roll').after('<button class="btn btn-primary" id="dice-auto-stop"></button>');
$('#dice-auto').text('Auto Start');
$('#dice-auto-stop').css({'display':'none'}).text('Stop');


var toprofit = '<div class="col-sm-12 col-xs-6" id="dice-total-win"></div>';
$('#content > div > div > div.col-md-9.col-md-push-3 > div:nth-child(1) > div > div.panel-body > div > div.col-sm-4.col-md-4.text-center > div > div:nth-child(3)').after(toprofit);

function buttonin() {
	var dicebet = $('#dice-bet').val();
	var betx = parseInt(dicebet) * 2;
	console.log(betx);
	$('#dice-bet').val(betx);
	}
function buttondec() {
	var dicebet = $('#dice-bet').val();
	var betx = dicebet / 2;
	console.log(betx);
	$('#dice-bet').val(betx);
	}
var wintime = 1;
var losetime = 1;
var toplose = 0;
var dice_total_profit = 0;
var mywar;
//Auto start
$('#dice-auto').click(function(){
	$('#dice-hi').click();
	var dice_payout = $('#dice-multiplier').val();
	var multiple = $('#dice-multy').val();
	$(this).css({'display':'none'});
	$('#dice-auto-stop').css({'display':'inline-block'});
	$('#dice-roll').click();
	console.log('Set multiple:'+multiple+' - payout: '+dice_payout);
	mywar = setInterval(function(){ checkstatus() }, 1000);
});
//Auto stop
$('#dice-auto-stop').click(function(){
	$(this).css({'display':'none'});
	$('#dice-auto').css({'display':'inline-block'});
	dur();
});
function dur(){
    clearInterval(mywar);
    console.log('Bet stopping');
}
var topwin = 0;
	function checkstatus() {
		var dice_payout = $('#dice-multiplier').val();
		var basebet	= $('#dice-bet').val('1');
		var multiple = $('#dice-multy').val();
		var curbets	= localStorage.getItem('last_bet_dice');
		var dice_win = parseInt($('#dice-result-win').text());
		var result = $('#dice-result').attr('class');
		if (result == "animate-on-change") {
				return;
		}
		else{
			if (result == "animate-on-change win") {
				losetime = 1;
				wintime++;
				topwin++;
				wintime = 1;
				console.log('++top win:'+topwin);
				if (topwin == '2') {
					topwin = 0;
					if ($('#dice-hilo-btns label:first-child').hasClass('active')) {
						$('#dice-hilo-btns label:last-child').click();
					}
					else{
						$('#dice-hilo-btns label:first-child').click();
					}
				}
				var nextbet = $('#dice-bet').val('1');
				console.log('++win count:'+wintime);
				$('#dice-roll').click();
			}
			if (result == "animate-on-change lose") {
				multiple;
				wintime = 1;
				toplose++;
				var top_loses = dice_payout * 2;
				if (toplose == top_loses) {
					toplose = 0;
					if ($('#dice-hilo-btns:first-child').hasClass('active')) {
						$('#dice-hilo-btns:last-child').click();
					}
					else{
						$('#dice-hilo-btns:first-child').click();
					}
				}
				var curbets	= localStorage.getItem('last_bet_dice');
				var betx = curbets * multiple;
				$('#dice-bet').val(betx);
				console.log('--lose count:'+losetime);
				$('#dice-roll').click();
				losetime++;

			}
		}
		
}