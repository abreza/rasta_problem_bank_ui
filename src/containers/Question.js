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
import Tag from '../components/question/Tag';
import Editor from '../components/editor/tiny_editor/react_tiny/TinyEditorComponent';
import { submitQuestion } from '../redux/actions/account'
import Selector from '../components/selector/Selector';
import '../styles/Question.css';
import { connect } from 'react-redux';


const sources = [
  { name: 'المپیاد ملی روسیه ۲۰۱۹' },
  { name: 'المپیاد ملی روسیه ۲۰۱۰' },
  { name: 'المپیاد ملی رومانی ۲۰۱۹' },
]

const events = [
  { name: 'عباس‌آباد' },
  { name: 'بوشهر' },
  { name: 'سراوان' },
  { name: 'کابار' },
]

const tags = [
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
]

let nextQuestionID = 1000

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSources: sources, //TODO: should change with this.props.allCources
      allEvents: events, //TODO: should change with this.props.allEvents
      question: {
        shortInfo: {
          id: ++nextQuestionID,
          name: '',
          tags: tags, //TODO: should change with this.props.allTags
          difficultyLevel: 5,
          reviewStatus: 'W',
        },
        difficulty: {
          difficultyLevel: 5,
          appropriateGrades: [9, 12],
        },
        author: this.props.account.name,
        events: [],
        source: '',
        subtags: [],
        questionText: '',//TODO: TINY!
        questionAnswer: '',//TODO: TINY!
      },
    };

    this.state.settings = {
      start: [9, 11],
      min: 7,
      max: 12,
      step: 1,
      onChange: (appropriateGrades) => {
        this.setState({
          question: {
            ...this.state.question,
            difficulty: {
              ...this.state.question.difficulty,
              appropriateGrades: appropriateGrades,
            }
          }
        });
      },
    };

    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleSubtagChange = this.handleSubtagChange.bind(this);
    this.handleQuestionNameChange = this.handleQuestionNameChange.bind(this);
    this.handleDifficultyLevelChange = this.handleDifficultyLevelChange.bind(this);
  }

  handleSubmit = () => {
    this.props.submitQuestion();
    //TODO: what to do after submiting?
  }

  handleQuestionNameChange = (e) => {
    this.setState({
      question: {
        ...this.state.question,
        shortInfo: {
          ...this.state.question.shortInfo,
          name: e.target.value,
        }
      }
    });
  }

  handleDifficultyLevelChange = (e) => {
    this.setState({
      question: {
        ...this.state.question,
        shortInfo: {
          ...this.state.question.shortInfo,
          difficultyLevel: e.target.value,
        },
        difficulty: {
          ...this.state.question.difficulty,
          difficultyLevel: e.target.value,
        }
      }
    });
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
      if (this.findByName(this.state.question.subtags, subtag.name) === -1) {
        this.state.question.subtags.push({
          name: subtag.name,
          selected: false,
        });
      }
    });
  }

  deleteNotSelectedSubtags(subtags) {
    subtags.forEach((subtag) => {
      let flag = false;
      this.state.question.shortInfo.tags.forEach((tag) => {
        if (tag.selected && this.findByName(tag.subtags, subtag.name) > -1) {
          flag = true;
        }
      });
      if (!flag) {
        let index = this.findByName(this.state.question.subtags, subtag.name);
        delete this.state.question.subtags[index];
      }
    });
  }

  updateSubtags(index, selected) {
    if (selected) {
      this.pushNewSubtags(this.state.question.shortInfo.tags[index].subtags);
    } else {
      this.deleteNotSelectedSubtags(this.state.question.shortInfo.tags[index].subtags);
    }
  }

  handleTagChange(index, selected) {
    this.state.question.shortInfo.tags[index].selected = selected;
    this.updateSubtags(index, selected);
    this.setState({
      question: {
        ...this.state.question,
        shortInfo: {
          ...this.state.question.shortInfo,
          tags: this.state.question.shortInfo.tags,
        },
        subtags: this.state.question.subtags,
      }
    });
  }

  handleSubtagChange(index, selected) {
    this.state.question.subtags[index].selected = selected;
    this.setState({
      question: {
        ...this.state.question,
        subtags: this.state.question.subtags,
      }
    });
  }

  render() {
    return (
      <Container style={{ paddingTop: '10px', paddingBottom: '10px' }}>
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
              <Button icon labelPosition="left" positive onClick={this.handleSubmit}>
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
                <Input
                  placeholder="نام مسئله"
                  className="rtl"
                  onChange={e => this.updateInput(e.target.value)}
                  value={this.state.input}
                />
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
                  پایه‌ی مناسب:
                  <span> {this.state.appropriateGrades[0] + 'ام تا'} </span>
                  <span> {this.state.appropriateGrades[1] + 'ام'} </span>
                  <Slider
                    labeled
                    multiple
                    color="red"
                    settings={this.state.settings}
                  />
                </label>
                <Selector
                  items={this.state.allSources}
                  placeholder="منبع"
                  add_new
                //TODO: need onChange
                />
                <Selector
                  items={this.state.allEvents}
                  placeholder="رویداد"
                  multiple
                //TODO: need onChange
                />
                <Segment textAlign="center">
                  <Label attached="top">مباحث کلی سوال</Label>
                  <div>
                    {this.state.question.shortInfo.tags.map((tag, index) => (
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
                onClick={this.handleSubmit}
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

const mapStateToProps = (state) => {
  const properties = { state };
  const { account } = state.thisAccount;
  const { sources, events, tags } = properties;
  return ({
    account,
    sources,
    events,
    tags,
  })
}

export default connect(mapStateToProps, { submitQuestion })(Question)