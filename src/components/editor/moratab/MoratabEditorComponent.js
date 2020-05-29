import React, { Component } from 'react';

import './css/editor.css';
import './css/bootstrap.min.css';

export default class MoratabEditorComponent extends Component {
  render() {
    return (
      <div className="moratab">
        <textarea hidden>
          # مرتب متن *مرتب* یا [مارک‌دان]، نوشته‌ای است که شیوه نمایش آن با
          علامت‌های ساده‌ای مشخص شده است. یعنی شکل نمایش متن را لابه‌لای واژه‌ها
          می‌نویسید. مثلا *خاص* بودن یک عبارت و یا **تاکید** روی نکته‌ها با کمک
        </textarea>
        <div className="editor"></div>
      </div>
    );
  }
}
