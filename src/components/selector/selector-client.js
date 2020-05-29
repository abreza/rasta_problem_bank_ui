import $ from 'jquery';

$(document).ready(function () {
  $(document).click(function () {
    $('.selector .selector-list').removeClass('show');
  });
  $('.selector input').click(function (e) {
    $(this).parent().parent().find('.selector-list').addClass('show');
    e.preventDefault();
    return false;
  });
  $('.selector input').keyup(function () {
    filter($(this).val(), $(this).parent().parent().find('.selector-list li'));
  });

  let persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  let arabicNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g,
  ];
  function fixNumbers(str) {
    if (typeof str === 'string') {
      for (var i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
      }
    }
    return str;
  }

  function filter(search, elems) {
    search = fixNumbers(search.toUpperCase());
    for (let i = 0; i < elems.length; i++) {
      let elem = $(elems[i]);
      if (fixNumbers(elem.text()).toUpperCase().indexOf(search) > -1) {
        elem.addClass('show');
      } else {
        elem.removeClass('show');
      }
    }
  }
});
