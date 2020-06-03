import $ from 'jquery';
import jQuery from 'jquery';

$(document).ready(function () {
  $(document).click(function () {
    $('.selector').close();
  });

  $('.selector-list ul li').click(function (e) {
    let selector = $(this).closest('.selector');
    let multiple = selector.hasClass('multiple');
    selector.reset_selector({ reset_selected: !multiple });

    if (multiple) {
      toggle_selected(selector, $(this));
      e.preventDefault();
      return false;
    } else {
      selector.find('input').val($(this).text());
      add_selected(selector, $(this));
    }
  });

  $('.selector input').click(function (e) {
    let selector = $(this).closest('.selector');
    $('.selector').not(selector).close();
    selector.find('.selector-list').addClass('show');
    e.preventDefault();
    return false;
  });

  $('.selector input').keyup(function () {
    let selector = $(this).closest('.selector');
    let multiple = selector.hasClass('multiple');
    selector.reset_selector({ reset_selected: !multiple });
    selector.filter_selector();
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

  jQuery.fn.update_selected_labels = function () {
    let o = $(this[0]);
    o.find('.selected-labels li').removeClass('show');
    o.find('.selector-list ul li.selected').each(function () {
      o.find(
        '.selected-labels li[data-id="' + $(this).data('id') + '"]'
      ).addClass('show');
    });
    return this;
  };

  function add_selected(selector, elems) {
    elems.addClass('selected');
    selector.update_selected_labels();
  }

  function toggle_selected(selector, elems) {
    elems.toggleClass('selected');
    selector.update_selected_labels();
  }

  function remove_selected(selector, elems) {
    elems.removeClass('selected');
    selector.update_selected_labels();
  }

  jQuery.fn.close = function (options) {
    let o = $(this);
    o.select_equal();

    setTimeout(function () {
      o.find('.selector-list').removeClass('show');
    }, 100);
    return this;
  };

  jQuery.fn.reset_selector = function (options) {
    let o = $(this[0]);
    o.removeClass('not-found');
    o.removeClass('no-list-select');
    if (options.reset_selected) {
      remove_selected(o, o.find('.selector-list ul li'));
    }

    return this;
  };

  jQuery.fn.filter_selector = function () {
    let o = $(this[0]);
    let search = o.find('input').val() || '';
    let elems = o.find('.selector-list li');
    let selected_size = 0;
    search = fixNumbers(search.toUpperCase());
    for (let i = 0; i < elems.length; i++) {
      let elem = $(elems[i]);
      if (fixNumbers(elem.text()).toUpperCase().indexOf(search) > -1) {
        elem.addClass('show');
        selected_size += 1;
      } else {
        elem.removeClass('show');
      }
    }
    if (selected_size === 0) {
      o.addClass('not-found');
    }

    return this;
  };

  jQuery.fn.select_equal = function () {
    let o = $(this[0]);
    let found_in_list = false;
    let search = o.find('input').val() || '';
    if (search === '') {
      return this;
    }
    let elems = o.find('.selector-list li');
    search = fixNumbers(search.toUpperCase());
    for (let i = 0; i < elems.length; i++) {
      let elem = $(elems[i]);
      if (fixNumbers(elem.text()).toUpperCase() === search) {
        found_in_list = true;
        add_selected(o, elem);
        break;
      }
    }
    if (!found_in_list) {
      o.addClass('no-list-select');
    }
    return this;
  };
});
