/* global tinymce MathJax */

import $ from 'jquery';

(function () {
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var open = function (editor, init_data = '') {
    let latex_data = init_data;
    let x = '';
    let body_text =
      '<div style="text-align: right; direction: rtl">فرمول LaTeX موردنظر را در این کادر وارد کنید. (<a target="_blank" href="http://mathysc.com/sites/default/files/pdf/LaTeX_MathJax_Persian_Tutorial.pdf">راهنما</a>)</div>';
    editor.windowManager.open({
      title: 'ویراستار فرمول ریاضی',
      body: {
        type: 'panel',
        items: [
          {
            type: 'htmlpanel',
            name: 'main',
            label: 'معادله را اینجا بنویس',
            html:
              '<div class="latex-panel" style="padding: 10px;">' +
              body_text +
              '<textarea rows="2" cols="50" placeholder="\\sum" style="direction: ltr; text-align: left;border: solid 3px #00c5ff; margin: 5px; padding: 10px; width: calc(100% - 10px); max-width: calc(100% - 10px); min-width: calc(100% - 10px);">' +
              latex_data +
              '</textarea><p style="text-align: right; direction: rtl">پیش‌نمایش:</p><div style="padding:20px; height: 50px"><p style="font-size: 14px!important; text-align: center;" class="preview"></p></div></div>',
          },
        ],
      },
      buttons: [
        {
          type: 'cancel',
          name: 'cancel',
          text: 'لغو',
        },
        {
          type: 'submit',
          name: 'save',
          text: 'ثبت',
          primary: true,
        },
      ],
      initialData: {},
      onSubmit: function (api) {
        let e =
          '<span class="math" data-latex="' +
          latex_data +
          '">' +
          x.innerHTML +
          '</span>';
        editor.execCommand('mceInsertContent', false, e);

        // editor.execCommand('mceSelectNode', !1, editor.selection.getNode());
        // editor.execCommand('mceInsertContent', !1, e);
        api.close();
      },
    });
    function get_svg(latex) {
      let res = MathJax.tex2svg(latex, {
        em: 16,
        ex: 8,
        containerWidth: 579,
        display: true,
        scale: 1,
        lineWidth: 1000000,
      });
      res.dataset.mce = 'math';
      res.name = 'math';
      res.innerHTML += '&nbsp;';
      return res;
    }
    function update_svg(latex) {
      if (latex) {
        latex_data = latex;
        x = get_svg(latex);
        $('.preview').html(x.innerHTML);
      }
    }
    $(function () {
      $('.latex-panel textarea').ready(function () {
        update_svg(latex_data);
      });
      $('.latex-panel textarea').keyup(function () {
        update_svg($(this).val());
      });
    });
  };

  var register = function (editor) {
    editor.addCommand('latexEditor', function () {
      open(editor);
    });
  };

  var register$1 = function (editor) {
    editor.ui.registry.addButton('latex', {
      icon: 'latex',
      tooltip: 'latex editor',
      onAction: function () {
        return open(editor);
      },
    });
    editor.ui.registry.addMenuItem('latex', {
      icon: 'latex',
      text: 'latex editor',
      onAction: function () {
        return open(editor);
      },
    });
    editor.on('DblClick', function (e, t) {
      let math_span = $(e.target).parents('span.math');
      if (math_span.length > 0) {
        open(editor, $(math_span[0]).data('latex'));
      }
    });
  };

  function Plugin() {
    global.add('latex', function (editor) {
      register(editor);
      register$1(editor);
      return {};
    });
  }

  Plugin();
})();
