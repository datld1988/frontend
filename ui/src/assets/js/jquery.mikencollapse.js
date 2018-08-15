
(function($){
	$.fn.mikenCollapse = function(options){
		this.defaults = {
			child: ".item",
			head: ".head",
			content: ".content",
			activeClass: "active",
			speed: 300,
			multi: false
		};
		var settings = $.extend(true,{}, this.defaults, options);
		return this.each(function(){
			var $this = $(this);
			var $child = $this.find(settings.child);
			var $head = settings.head;
			var $content = settings.content;
			$child.find($content).css('display','none');
			$child.filter("."+settings.activeClass).find($content).css('display','block');
			$child.find($head).click(function(){
				$(this).closest($child).stop().toggleClass(settings.activeClass);
				$(this).closest($child).find($content).stop().slideToggle(settings.speed);

				if(!settings.multi){
					$(this).closest($child).siblings().stop().removeClass('active');
					$(this).closest($child).siblings().find($content).stop().slideUp(settings.speed);
				}
			});

		});

	}

})(jQuery);