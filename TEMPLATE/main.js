//todo добавить кэширование селекторов ИЛИ перейти на какую-нибудь адекватную JS-обёртку
$(document).ready(function () {

	function filterGamesAndPorts() {
		var selectedTagsForFilter = $('div#tag_filter')
			.find(":checked")
			.map(function () {

				return $(this).val().toLowerCase();
			});

		if (selectedTagsForFilter.length > 0 && $("#button_show_tags").is(':visible')) {
			showTagsFilter();
		}

		var filter = $("#filter").val().toLowerCase();

		$('div.game_card').each(function () {
			var game = $(this);
			var gameVisible = false;

			var title = game.find('div.card-header a').text().toLowerCase();

			//ищем по имени игры
			if (title.indexOf(filter) >= 0) {
				gameVisible = true;
			}

			//ищем по тегам
			if (gameVisible) {
				var portsShowed = 0;

				game.find('div.port_block').each(function () {
					var port = $(this);
					var portTags = port.find("div.tags_block").text().toLowerCase();
					if (selectedTagsForFilter.length > 0) {
						port.hide();
						var tagsFinded = 0;
						for (var tag of selectedTagsForFilter) {
							if (portTags.indexOf(tag) >= 0) {
								tagsFinded++;
							}
						}
						if (tagsFinded === selectedTagsForFilter.length) {
							port.show();
							portsShowed++;
						}
					}
					else {
						portsShowed++;
						port.show();
					}
				});
				if (portsShowed === 0)
					gameVisible = false;
			}

			//
			if (gameVisible)
				game.show();
			else
				game.hide();

		});
	}

	$('div#tag_filter').find(":checkbox").change(function () {
		filterGamesAndPorts();
	});

	$('#filter').keyup(function () {
		filterGamesAndPorts();
	});

	function showTagsFilter() {
		//$('#tag_filter').collapse('show');
		$('#tag_filter').show();
		$("#button_show_tags").hide();
		$("#button_hide_tags").show();
	}

	$("#button_show_tags").click(function () {
		showTagsFilter();
	});

	$("#button_hide_tags").click(function () {
		//$('#tag_filter').collapse('hide');
		$('#tag_filter').hide();
		$(this).hide();
		$("#button_show_tags").show();
		$("#filter").val("");
		$('div#tag_filter input:checkbox').each(function () {
			$(this).prop("checked", false);
		});
		filterGamesAndPorts();

	});

	filterGamesAndPorts();
});