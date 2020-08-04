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
  Dropdown,
} from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { Slider } from 'react-semantic-ui-range';
import Tag from '../components/question/Tag';
import Editor from '../components/editor/tiny_editor/react_tiny/TinyEditorComponent';
import {
  submitQuestion,
  fetchQuestion,
} from '../redux/actions/question';
import '../styles/Question.css';
import { connect } from 'react-redux';
import {
  getTags,
  getSubTags,
  getEvents,
  getSources,
} from '../redux/actions/properties'

const sources = [
  { key: '0', text: 'المپیاد ملی روسیه ۲۰۱۹', value: '0' },
  { key: '1', text: 'المپیاد ملی روسیه ۲۰۱۰', value: '1' },
  { key: '2', text: 'المپیاد ملی رومانی ۲۰۱۹', value: '2' },
];

const events = [
  { key: '0', text: 'عباس‌آباد', value: '0' },
  { key: '1', text: 'بوشهر', value: '1' },
  { key: '2', text: 'سراوان', value: '2' },
  { key: '3', text: 'کابار', value: '3' },
];

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
];


const questionId = window.location.pathname.split('/')[2];
let nextQuestionID = 0;

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ++nextQuestionID,
      name: '',
      tags: [], //TODO: should change with this.props.allTags
      subtags: [],
      verification_status: 'W',
      hardness: {
        level: 5,
        appropriate_grades_min: 9,
        appropriate_grades_max: 12,
      },
      events: [],
      source: '',
      text: '',
      answer: '',
      redirect_after_submit: false,
    };

    this.state.settings = {
      start: [9, 11],
      min: 6,
      max: 12,
      step: 1,
      onChange: (appropriateGrades) => {
        this.setState({
          difficulty: {
            ...this.state.difficulty,
            appropriateGrades: appropriateGrades,
          },
        });
      },
    };

    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleSubtagChange = this.handleSubtagChange.bind(this);
    this.setQuestion = this.setQuestion.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
    this.handleQuestionNameChange = this.handleQuestionNameChange.bind(this);
    this.handleQuestionNameChange = this.handleQuestionNameChange.bind(this);
    this.handleDifficultyLevelChange = this.handleDifficultyLevelChange.bind(this);

    setTimeout(() => {
      this.setQuestion();
      this.setAnswer();
    }, 5000);
  }

  componentDidMount() {
    this.props.getTags();
    this.props.getSubTags();
    this.props.getEvents();
    this.props.getSources();
    if (questionId !== undefined) {
      this.props.fetchQuestion(questionId);
    }
  }

  handleQuestionNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleDifficultyLevelChange = (e) => {
    this.setState({
      hardness: {
        ...this.state.hardness,
        difficultyLevel: e.target.value,
      }
    })
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
        var new_subtags = this.state.subtags;
        new_subtags.push({
          name: subtag.name,
          selected: false,
        });
        this.setState({
          subtags: new_subtags,
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
        let index = this.findByName(this.state.question.subtags, subtag.name);
        delete this.state.question.subtags[index];
      }
    });
  }

  updateSubtags(index, selected) {
    if (selected) {
      this.pushNewSubtags(this.state.question.tags[index].subtags);
    } else {
      this.deleteNotSelectedSubtags(
        this.state.question.tags[index].subtags
      );
    }
  }

  handleTagChange(index, selected) {
    this.state.question.tags[index].selected = selected;
    this.updateSubtags(index, selected);
    this.setState({
      question: {
        ...this.state.question,
        tags: this.state.question.tags,
        subtags: this.state.question.subtags,
      },
    });
  }

  handleSubtagChange(index, selected) {
    this.state.question.subtags[index].selected = selected;
    this.setState({
      question: {
        ...this.state.question,
        subtags: this.state.question.subtags,
      },
    });
  }

  handleSubmit = () => {
    const question = {
      id: this.state.id,

    }
    this.props.submitQuestion(this.state.question);
    this.setState({ redirect_after_submit: true });
  };

  setQuestion() {
    this.setState({
      text: this.questionEl.getContent()
    });
  }

  setAnswer() {
    this.setState({
      anser: this.answerEl.getContent()
    });
  }

  render() {
    if (this.state.redirect_after_submit) {
      return <Redirect push to={'/problemset/page/' + this.state.activePage} />;
    }

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
              <Button
                icon
                labelPosition="left"
                positive
                onClick={this.handleSubmit}
              >
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
                  ref={(questionEl) => (this.questionEl = questionEl)}
                  id="QuestionTextArea"
                  initContent="<p>salam</p><p style='text-align: center'><span class='tiny-math' data-latex='\sum'></span></p>"
                />
                <Header content={'پاسخ'} as="h3" textAlign="center" />
                <Editor
                  ref={(answerEl) => (this.answerEl = answerEl)}
                  id="AnswerTextArea"
                  initContent="<p>khubi?</p>"
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
                  onChange={(e) => this.updateInput(e.target.value)}
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
                  <span> {this.state.difficulty.appropriateGrades[0] + 'ام تا'} </span>
                  <span> {this.state.difficulty.appropriateGrades[1] + 'ام'} </span>
                  <Slider
                    labeled
                    multiple
                    color="red"
                    settings={this.state.settings}
                  />
                </label>
                <Dropdown
                  placeholder="منبع"
                  fluid
                  selection
                  allowAdditions
                  onAddItem={(e, { value }) => {
                    this.setState({
                      allSources: [
                        { text: value, value },
                        ...this.state.allSources,
                      ],
                    });
                  }}
                  search
                  options={this.props.source} //todo:
                  className="rtl-dropdown"
                />
                <Dropdown
                  placeholder="رویداد"
                  fluid
                  multiple
                  selection
                  search
                  onAddItem={(e, { value }) => {
                    this.setState({
                      allSources: [
                        { text: value, value },
                        ...this.state.allSources,
                      ],
                    });
                  }}
                  options={this.props.events} //todo:
                  className="rtl-dropdown"
                />
                <Segment textAlign="center">
                  <Label attached="top">مباحث کلی سوال</Label>
                  <div>
                    {this.props.tags.map((tag, index) => (
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
                    {/* {this.props.subtags.map((subtag, index) => (
                      <Tag
                        name={subtag.name}
                        selected={subtag.selected}
                        onChange={this.handleSubtagChange}
                        key={index}
                        index={index}
                        selectable
                      ></Tag> */}
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
  const questions = state.question.properties;
  const { allEvents, allSources, allTags } = questions;
  return {
    allEvents,
    allSources,
  }
};

export default connect(mapStateToProps, {
  submitQuestion,
  fetchQuestion,
  getTags,
  getSubTags,
  getEvents,
  getSources,
})(Question);