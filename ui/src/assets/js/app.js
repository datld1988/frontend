

$('.all-main-thongtin-canhan .header a.btn-blue.edit').click(function(){
  var text = $(this).find('span').text();
  var text1 = text == "CHỈNH SỬA" ? "CẬP NHẬT" : "CHỈNH SỬA";
  $(this).find('span').text(text1);
  $(this).parents('.all-main-thongtin-canhan').toggleClass('all-edit');
  $(this).toggleClass('xanh');
  $(this).parents('.all-main-thongtin-canhan').find('input, select').prop('disabled', function(i, v) { return !v; });

  return false;


});

$('.bao-all-nhapten .head .ten + input').focus(function(){
  $(this).parents('.bao-all-nhapten').addClass('show');
}).blur(function(){
  $(this).parents('.bao-all-nhapten').removeClass('show');

});

$(function(){
    setInterval(function(){
        $('.main-slider-reg .controls').click();
    },5000);
    $('.main-slider-reg .controls').click(function(){
        var item = $(this).siblings('.wrap-item').find('.item');
        item.each(function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }

        });


    });


});


$(function(){

    $.fn.responsiveTabs = function() {
      this.addClass('responsive-tabs');
      this.append($('<span class="glyphicon glyphicon-triangle-bottom"></span>'));
      this.append($('<span class="glyphicon glyphicon-triangle-top"></span>'));
      this.on('click', 'li.active > a, span.glyphicon', function() {
        if($(window).width() <= 768){
          this.toggleClass('open');
        }
      }.bind(this));

      this.on('click', 'li:not(.active) > a', function() {
        this.removeClass('open');
      }.bind(this));
    };

    $('.nav.nav-tabs').responsiveTabs();


});




/*
Reference: http://jsfiddle.net/BB3JK/47/
*/

$('select.custom-select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.html("<img src='images/icon-tag.png' />");
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        if($(this).index() == 0){
        	$styledSelect.html("<img src='images/icon-tag.png' />").removeClass('active');
        } else{
        	$styledSelect.html("<img src='images/icon-tag_active.png' />").removeClass('active');
        }
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

if($('.selectpicker').length){
  $('.selectpicker').selectpicker();
}
$(function() {
    if($('.select-ric').length){
      $('.select-ric select').selectric({
          multiple: {
            separator: '/',       // Type: String.             Description: Items separator.
            keepMenuOpen: true,    // Type: Boolean.            Description: Close after an item is selected.
            maxLabelEntries: 3 // Type: Boolean or Integer. Description: Max selected items do show.
          }

      });
    }

});

$(function(){
  var input = '<div class="input"><input type="text" placeholder="Khác..." /></div>';
  $('.select-ric.se .selectric-items li.last').each(function(){
    $(this).append(input);
    $(this).click(function(){
      $(this).find('input').focus();
      return false;

    });

  });

});

//Reference: 
//https://www.onextrapixel.com/2012/12/10/how-to-create-a-custom-file-input-with-jquery-css3-and-php/
;(function($) {

          // Browser supports HTML5 multiple file?
          var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
              isIE = /msie/i.test( navigator.userAgent );

          $.fn.customFile = function() {

            return this.each(function() {

              var $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
                  $wrap = $('<div class="file-upload-wrapper">'),
                  $input = $('<input type="text" class="file-upload-input" />'),
                  // Button that will be used in non-IE browsers
                  $button = $('<button type="button" class="file-upload-button"><img src="images/icon-upload.png"><span>Thêm file</span></button>'),
                  // Hack for IE
                  $label = $('<label class="file-upload-button" for="'+ $file[0].id +'">Select a File</label>');

              // Hide by shifting to the left so we
              // can still trigger events
              $file.css({
                position: 'absolute',
                left: '-9999px'
              });

              $wrap.insertAfter( $file )
                .append( $file, $input, ( isIE ? $label : $button ) );

              // Prevent focus
              $file.attr('tabIndex', -1);
              $button.attr('tabIndex', -1);

              $button.click(function () {
                $file.focus().click(); // Open dialog
              });

              $file.change(function() {

                var files = [], fileArr, filename;

                // If multiple is supported then extract
                // all filenames from the file array
                if ( multipleSupport ) {
                  fileArr = $file[0].files;
                  for ( var i = 0, len = fileArr.length; i < len; i++ ) {
                    files.push( fileArr[i].name );
                  }
                  filename = files.join(', ');

                // If not supported then just take the value
                // and remove the path to just show the filename
                } else {
                  filename = $file.val().split('\\').pop();
                }

                $input.val( filename ) // Set the value
                  .attr('title', filename) // Show filename in title tootlip
                  .focus(); // Regain focus

              });

              $input.on({
                blur: function() { $file.trigger('blur'); },
                keydown: function( e ) {
                  if ( e.which === 13 ) { // Enter
                    if ( !isIE ) { $file.trigger('click'); }
                  } else if ( e.which === 8 || e.which === 46 ) { // Backspace & Del
                    // On some browsers the value is read-only
                    // with this trick we remove the old input and add
                    // a clean clone with all the original events attached
                    $file.replaceWith( $file = $file.clone( true ) );
                    $file.trigger('change');
                    $input.val('');
                  } else if ( e.which === 9 ){ // TAB
                    return;
                  } else { // All other keys
                    return false;
                  }
                }
              });

            });

          };

          // Old browser fallback
          if ( !multipleSupport ) {
            $( document ).on('change', 'input.customfile', function() {

              var $this = $(this),
                  // Create a unique ID so we
                  // can attach the label to the input
                  uniqId = 'customfile_'+ (new Date()).getTime(),
                  $wrap = $this.parent(),

                  // Filter empty input
                  $inputs = $wrap.siblings().find('.file-upload-input')
                    .filter(function(){ return !this.value }),

                  $file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');

              // 1ms timeout so it runs after all other events
              // that modify the value have triggered
              setTimeout(function() {
                // Add a new input
                if ( $this.val() ) {
                  // Check for empty fields to prevent
                  // creating new inputs when changing files
                  if ( !$inputs.length ) {
                    $wrap.after( $file );
                    $file.customFile();
                  }
                // Remove and reorganize inputs
                } else {
                  $inputs.parent().remove();
                  // Move the input so it's always last on the list
                  $wrap.appendTo( $wrap.parent() );
                  $wrap.find('input').focus();
                }
              }, 1);

            });
          }

}(jQuery));

if($('input[type=file]').length){
    $('input[type=file]').customFile();
}
$(function(){

    $('.main-list-chude .item').click(function(){
        $(this).toggleClass('active');

    });

});

