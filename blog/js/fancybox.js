$(document).ready(function() {
  $('img').each(function() {
    if ($(this).parent().hasClass('fancybox')) return;
    if ($(this).hasClass('nofancybox')) return;
    var alt = this.alt;
    //if (alt) $(this).after('<span class="caption_zx">' + alt + '</span>');

    $(this).wrap('<a href="' + ($(this).attr('data-src') == null ? this.src : $(this).attr('data-src')) + '" title="' + alt + '" class="fancybox"><div class="box_image_zx"></div></a>');
    if (alt) $(this).after('<p style="text-align:center;font-size:12px;margin:0px">' + alt + '</p>');
  });
  $(this).find('.fancybox').each(function(){
    $(this).attr('rel', 'article');
  });
});
$(document).ready(function() {
  $("a[href$='.jpg'],a[href$='.png'],a[href$='.gif'],a[href$='.webp']").attr('rel', 'gallery').fancybox({
    helpers : {
    title: { type: 'inside'}
    }
  });
});
