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


class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      selectedTags: [],
      selectedSubtags: [],
      verificationStatus: 'W',
      difficulty: {
        level: 5,
        appropriateGrades: [9, 12],
      },
      selectedEvents: [],
      selectedSource: '',
      problem: '',
      solution: '',
      redirectAfterSubmit: false,
      settings: {
        start: [9, 11],
        min: 1,
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
      }
    };

    this.setSolution = this.setSolution.bind(this);
    this.setProblem = this.setProblem.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleSubtagChange = this.handleSubtagChange.bind(this);
    this.handleDifficultyLevelChange = this.handleDifficultyLevelChange.bind(this);
  }

  componentDidMount() {
    const { getTags, getSubTags, getSources, getEvents } = this.props;
    getTags();
    getSubTags();
    getEvents();
    getSources();
  }

  handleDifficultyLevelChange = (event) => {
    this.setState({
      difficulty: {
        ...this.state.difficulty,
        level: event.target.value,
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
      if (this.findByName(this.state.subtags, subtag.name) === -1) {
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
    // this.props.submitQuestion(this.state.question);
    // this.setState({ redirect_after_submit: true });
  };

  setProblem() {
    this.setState({
      problem: this.problem.getContent()
    });
  }

  setSolution() {
    this.setState({
      solution: this.solution.getContent()
    });
  }

  render() {
    const { redirect_after_submit, } = this.state;
    const { isProblemNew, } = this.props;
    if (redirect_after_submit) {
      return <Redirect push to={'/problemset/page/' + this.state.activePage} />; //todo:
    }
    console.log(this.props.tags)
    return (
      <Container style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <Grid centered stackable>
          <Grid.Row centered relaxed>
            <Grid.Column width={5}></Grid.Column>
            <Grid.Column width={5}>
              <Header as="h1" textAlign="center">
                {isProblemNew ? 'مسئله‌ی جدید' : 'ویرایش مسئله'}
              </Header>
            </Grid.Column>
            <Grid.Column
              width={5}
              only="computer"
              style={{ textAlign: 'right' }}
            >
              <Button
                icon
                labelPosition="right"
                positive
                onClick={this.handleSubmit}
              >
                <Icon name="save" />
                {isProblemNew ? 'ذخیره' : 'اعمال تغیرات'}
              </Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2} style={{ direction: 'rtl' }}>
            <Grid.Column width={11}>
              <Segment>
                <Header content={'صورت مسئله'} as="h3" textAlign="center" />
                <Editor
                  ref={(problem) => (this.problem = problem)}
                  id="QuestionTextArea"
                />
                <Header content={'پاسخ'} as="h3" textAlign="center" />
                <Editor
                  ref={(solution) => (this.solution = solution)}
                  id="AnswerTextArea"
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
                  onChange={(e) => this.setState({ name: e.value })}
                  value={this.state.input}
                />
                <Input
                  placeholder="سختی"
                  type="number"
                  max="10"
                  min="0"
                  className="rtl hardness"
                  onChange={this.handleDifficultyLevelChange}
                />
                <br />
                <br />
                <label>
                  پایه‌ی مناسب:
                  <span>
                    {this.state.difficulty.appropriateGrades[0] + 'ام تا'}
                    {this.state.difficulty.appropriateGrades[1] + 'ام'}
                  </span>
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
                  search
                  onChange={(event, { value }) => {
                    this.setState({
                      selectedSource: value
                    });
                  }}
                  options={
                    this.props.sources.map(
                      source => ({
                        key: source.name,
                        text: source.name,
                        value: source.id,
                      })
                    )
                  }
                  className="rtl-dropdown"
                />
                <Dropdown
                  placeholder="رویدادها"
                  fluid
                  multiple
                  selection
                  search
                  onChange={(event, { value }) => {
                    this.setState({
                      selectedEvents: value,
                    });
                  }}
                  options={
                    this.props.events.map(
                      event => ({
                        key: event.name,
                        text: event.name,
                        value: event.id,
                      })
                    )
                  }
                  className="rtl-dropdown"
                />
                <Segment textAlign="center">
                  <Label attached="top">مباحث کلی سوال</Label>
                  <div>
                    {this.props.tags.map((tag, index) => (
                      <Tag
                        name={tag.name}
                        selectable
                        key={tag.id}
                        index={index}
                        selected={tag.selected}
                        onChange={this.handleTagChange}
                      />
                    ))}
                  </div>
                </Segment>
                <Segment textAlign="center">
                  <Label attached="top">مباحث ریزتر</Label>
                  <div>
                    {this.props.subtags.map((subtag, index) => (
                      <Tag
                        name={subtag.name}
                        selectable
                        key={subtag.id}
                        index={index}
                        selected={subtag.selected}
                        onChange={this.handleSubtagChange}
                      />
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
                labelPosition="right"
                positive
                className="mobile-save-btn"
                onClick={this.handleSubmit}
              >
                <Icon name="save" />
                {isProblemNew ? 'ذخیره' : 'اعمال تغیرات'}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { events, sources, tags, subTags } = state.properties;
  const { isProblemNew } = ownProps;
  console.log(ownProps)
  return {
    events,
    sources,
    tags,
    subTags,
    isProblemNew,
  }
};

export default connect(
  mapStateToProps,
  {
    submitQuestion,
    fetchQuestion,
    getTags,
    getSubTags,
    getEvents,
    getSources,
  })(Problem);
