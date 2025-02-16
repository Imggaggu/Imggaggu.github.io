$(function() {
  var $btn = $("nav.greedy-nav .greedy-nav__toggle");
  var $vlinks = $("nav.greedy-nav .visible-links");
  var $hlinks = $("nav.greedy-nav .hidden-links");
  var $nav = $("nav.greedy-nav");
  var $logo = $('nav.greedy-nav .site-logo');
  var $logoImg = $('nav.greedy-nav .site-logo img');
  var $title = $("nav.greedy-nav .site-title");
  var $search = $('nav.greedy-nav button.search__toggle');

  function check() {
    var winWidth = $(window).width();

    if (winWidth <= 497) {
      // 🔹 497px 이하일 때 모든 항목 한꺼번에 숨김
      $vlinks.children().appendTo($hlinks);
      $btn.removeClass('hidden').addClass('close');
    } else {
      // 🔹 497px 이상일 때 모든 항목 한꺼번에 다시 보이게
      $hlinks.children().appendTo($vlinks);
      $btn.addClass('hidden').removeClass('close');

      // 🔹 공간이 부족하면 3개씩 한 번에 숨김
      var availableSpace = $nav.innerWidth()
        - ($logo.length ? $logo.outerWidth(true) : 0)
        - $title.outerWidth(true)
        - ($search.length ? $search.outerWidth(true) : 0)
        - $btn.outerWidth(true);

      var items = $vlinks.children();
      var totalWidth = 0;
      var hideCount = 0;

      items.each(function() {
        totalWidth += $(this).outerWidth(true);
        if (totalWidth > availableSpace) {
          hideCount += 1;
        }
      });

      // 3개 단위로 조정
      if (hideCount > 0) {
        var removeCount = Math.ceil(hideCount / 3) * 3;
        for (var i = 0; i < removeCount; i++) {
          $vlinks.children().last().prependTo($hlinks);
        }
      }

      // 공간이 충분하면 3개씩 다시 나타남
      while ($hlinks.children().length > 0 && $nav.innerWidth() > totalWidth + $hlinks.children().first().outerWidth(true) * 3) {
        for (var j = 0; j < 3; j++) {
          if ($hlinks.children().length > 0) {
            $hlinks.children().first().appendTo($vlinks);
          }
        }
      }

      // 버튼 상태 업데이트
      if ($hlinks.children().length === 0) {
        $btn.addClass('hidden');
      } else {
        $btn.removeClass('hidden');
      }
    }
  }

  $(window).resize(check);
  check();

  $btn.on('click', function() {
    $hlinks.toggleClass('hidden');
    $(this).toggleClass('close');
    clearTimeout(timer);
  });

  $hlinks.on("click", function() {
    $hlinks.addClass("hidden");
    $btn.removeClass("close");
  }).on('mouseleave', function() {
    setTimeout(function() {
      $hlinks.addClass('hidden');
      $('.greedy-nav__toggle').removeClass('close');
    }, 1000);
  }).on('mouseenter', function() {
    clearTimeout(timer);
  });

  if ($logoImg.length) {
    if (!($logoImg[0].complete || $logoImg[0].naturalWidth !== 0)) {
      $logoImg.one("load error", check);
    } else check();
  } else check();
});





























