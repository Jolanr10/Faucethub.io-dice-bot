$(function(){
	$('div.row.dice-auto-content-holder.dice-content-holder > div :input').each(function(){
		$(this).removeAttr('disabled');
	});
	$('#dice-manual-auto-btns > label:nth-child(2) > span.label.label-danger').remove();
	$('#dice-manual-auto-btns > label:nth-child(2)').trigger('click');
});
