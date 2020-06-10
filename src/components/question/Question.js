import React, { Component } from 'react';
import {
  Grid,
  Header,
  Input,
  Segment,
  Label,
  Container,
  Divider,
  Button,
  Icon,
} from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';
import Tag from './Tag';
import Editor from '../editor/tiny_editor/react_tiny/TinyEditorComponent';

import Selector from '../selector/Selector';

import '../../styles/Question.css';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [
        { name: 'المپیاد ملی روسیه ۲۰۱۹' },
        { name: 'المپیاد ملی روسیه ۲۰۱۰' },
        { name: 'المپیاد ملی رومانی ۲۰۱۹' },
      ],

      events: [
        { name: 'عباس‌آباد' },
        { name: 'بوشهر' },
        { name: 'سراوان' },
        { name: 'کابار' },
      ],
      tags: [
        {
          name: 'ترکیبیات',
          subtags: [
            {
              name: 'هندسه ترکیبیاتی',
            },
            {
              name: 'لانه کبوتری',
            },
            {
              name: 'استقرا',
            },
          ],
        },
        {
          name: 'هندسه',
          subtags: [
            {
              name: 'مسطحه',
            },
            {
              name: 'هندسه ترکیبیاتی',
            },
          ],
        },
      ],
      subtags: [],
    };
    this.state.multipleValues = [2, 12];
    this.state.settings = {
      start: [2, 12],
      min: 0,
      max: 25,
      step: 1,
      onChange: (multipleValues) => {
        this.setState({ multipleValues });
      },
    };
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleSubtagChange = this.handleSubtagChange.bind(this);
  }

  findByName(subtags, name) {
    let res = -1;
    subtags.forEach((subtag, index) => {
      if (subtag.name === name) {
        res = index;
        return;
      }
    });
    return res;
  }

  pushNewSubtags(subtags) {
    subtags.forEach((subtag) => {
      if (this.findByName(this.state.subtags, subtag.name) === -1) {
        this.state.subtags.push({
          name: subtag.name,
          selected: false,
        });
      }
    });
  }
  deleteNotSelectedSubtags(subtags) {
    subtags.forEach((subtag) => {
      let flag = false;
      this.state.tags.forEach((tag) => {
        if (tag.selected && this.findByName(tag.subtags, subtag.name) > -1) {
          flag = true;
        }
      });
      if (!flag) {
        let index = this.findByName(this.state.subtags, subtag.name);
        delete this.state.subtags[index];
      }
    });
  }

  updateSubtags(index, selected) {
    if (selected) {
      this.pushNewSubtags(this.state.tags[index].subtags);
    } else {
      this.deleteNotSelectedSubtags(this.state.tags[index].subtags);
    }
  }

  handleTagChange(index, selected) {
    this.state.tags[index].selected = selected;
    this.updateSubtags(index, selected);
    this.setState({
      tags: this.state.tags,
      subtags: this.state.subtags,
    });
  }

  handleSubtagChange(index, selected) {
    this.state.subtags[index].selected = selected;
    this.setState({ subtags: this.state.subtags });
  }

  render() {
    return (
      <Container>
        <Grid centered stackable>
          <Grid.Row centered relaxed>
            <Grid.Column width={5}></Grid.Column>
            <Grid.Column width={5}>
              <Header as="h1" textAlign="center">
                مسئله جدید
              </Header>
            </Grid.Column>
            <Grid.Column
              width={5}
              only="computer"
              style={{ textAlign: 'right' }}
            >
              <Button icon labelPosition="left" positive>
                <Icon name="save" />
                ذخیره
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2} style={{ direction: 'rtl' }}>
            <Grid.Column width={11}>
              <Segment>
                <Header content={'صورت مسئله'} as="h3" textAlign="center" />
                <Editor
                  id="QuestionTextArea"
                  onEditorChange={(content) => console.log(content)}
                />
                <Header content={'پاسخ'} as="h3" textAlign="center" />
                <Editor
                  id="AnswerTextArea"
                  onEditorChange={(content) => console.log(content)}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column
              width={5}
              style={{ direction: 'rtl', textAlign: 'right' }}
            >
              <Segment style={{ direction: 'rtl' }}>
                <Header content={'شناسنامه'} as="h2" textAlign="center" />
                <Divider section></Divider>
                <Input placeholder="نام مسئله" className="rtl" />
                <Input
                  placeholder="سختی"
                  type="number"
                  max="10"
                  min="0"
                  className="rtl hardness"
                />
                <br />
                <br />
                <label>
                  رده سنی
                  <span> {this.state.multipleValues[0]} </span>
                  تا
                  <span> {this.state.multipleValues[1]} </span>
                  سال
                  <Slider
                    labeled
                    multiple
                    color="red"
                    settings={this.state.settings}
                  />
                </label>
                <Selector
                  items={this.state.sources}
                  placeholder="منبع"
                  add_new
                />
                <Selector
                  items={this.state.events}
                  placeholder="رویداد"
                  multiple
                />
                <Segment textAlign="center">
                  <Label attached="top">مباحث کلی سوال</Label>
                  <div>
                    {this.state.tags.map((tag, index) => (
                      <Tag
                        name={tag.name}
                        selectable
                        key={index}
                        index={index}
                        selected={tag.selected}
                        onChange={this.handleTagChange}
                      ></Tag>
                    ))}
                  </div>
                </Segment>
                <Segment textAlign="center">
                  <Label attached="top">مباحث ریزتر</Label>
                  <div>
                    {this.state.subtags.map((subtag, index) => (
                      <Tag
                        name={subtag.name}
                        selected={subtag.selected}
                        onChange={this.handleSubtagChange}
                        key={index}
                        index={index}
                        selectable
                      ></Tag>
                    ))}
                  </div>
                </Segment>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column
              width={16}
              only="mobile tablet"
              style={{ textAlign: 'center' }}
            >
              <Button
                icon
                labelPosition="left"
                positive
                className="mobile-save-btn"
              >
                <Icon name="save" />
                ذخیره
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
