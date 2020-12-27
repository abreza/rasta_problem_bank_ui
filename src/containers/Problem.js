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
  Form,
} from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { Slider } from 'react-semantic-ui-range';
import Tag from '../components/problem/Tag';
import converter from '../components/problem/convertor';
import Editor from '../components/editor/tiny_editor/react_tiny/TinyEditorComponent';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  createProblem,
  fetchProblem,
  editProblem,
} from '../redux/actions/problem';
import {
  getTags,
  getSubtags,
  getEvents,
  getSources,
} from '../redux/actions/properties';
import { notify } from '../redux/actions/notification';
import { toPersianNumber } from '../utils/translateNumber';
import '../styles/Problem.css';
import problem from '../redux/reducers/problem';

class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problemId: parseInt(window.location.pathname.split('/')[2]),
      isProblemNew: !window.location.pathname.split('/')[2],
      name: '',
      selectedTags: [],
      selectedSubtags: [],
      verificationStatus: 'W',
      difficultyLevel: '',
      appropriateGrades: [6, 10],
      selectedEvents: [],
      selectedSource: '',
      problem: '',
      settings: {
        start: [6, 10],
        min: 1,
        max: 12,
        step: 1,
        onChange: (appropriateGrades) => {
          this.setState({ appropriateGrades: appropriateGrades });
        },
      },
      doesEditingProblemLoaded: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setProblem = this.setProblem.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleSubtagChange = this.handleSubtagChange.bind(this);
    this.isProblemDataOk = this.isProblemDataOk.bind(this);
    this.loadEditingProblem = this.loadEditingProblem.bind(this);
  }

  componentDidMount() {
    const { getTags, getSubtags, getSources, getEvents, fetchProblem } = this.props;
    const { problemId } = this.state;
    getTags();
    getSubtags();
    getEvents();
    getSources();
    if (!this.state.isProblemNew) {
      fetchProblem(problemId);
    }
  }

  handleTagChange(id, selected) {
    this.setState({
      selectedTags: {
        ...this.state.selectedTags,
        [id]: selected,
      }
    })
    const newSelectedSubtags = this.state.selectedSubtags;
    if (!selected) {
      for (let i = 0; i < this.props.subtags.length; i++) {
        let subtag = this.props.subtags[i];
        if (subtag.parent == id) {
          newSelectedSubtags[subtag.id] = false;
        }
      }
      this.setState({
        selectedSubtags: newSelectedSubtags,
      })
    }
  }

  handleSubtagChange(id, selected) {
    this.setState({
      selectedSubtags: {
        ...this.state.selectedSubtags,
        [id]: selected,
      },
    });
  }

  async handleSubmit(isProblemNew) {
    console.log(converter(this.state))
    const ok = this.isProblemDataOk();
    if (ok) {
      await this.setProblem();
      if (isProblemNew) {
        await this.props.createProblem(converter(this.state))
      } else {
        await this.props.editProblem(converter(this.state), this.state.problemId)
      }
    }
  };

  isProblemDataOk = () => {
    const promptHeader = 'موارد زیر باید باشن و تو هنوز پرشون نکردی:';
    let promptText = '', promptColor = 'red';

    if (!this.problemEl.getContent()) {
      promptText += 'صورت مسئله';
    }
    if (!this.state.name) {
      if (promptText) promptText += ' + '
      promptText += 'نام مسئله';
    }
    if (!this.state.difficultyLevel) {
      if (promptText) promptText += ' + '
      promptText += 'درجه‌ی سختی'
    }
    if (promptText) {
      this.props.notify('این موارد رو حتماٌ باید پر کنی: ' + promptText, 'error');
      return false
    }
    return true
  }

  setProblem() {
    this.setState({
      problem: this.problemEl.getContent()
    });
  }

  loadEditingProblem(problem) {
    let newSelectedTags = {};
    let newSelectedSubtags = {};
    for (let i = 0; i < problem.tags.length; i++) {
      const tagId = problem.tags[i];
      newSelectedTags[tagId] = true
    }
    for (let i = 0; i < problem.sub_tags.length; i++) { //todo
      const subtagId = problem.sub_tags[i]; //todo
      newSelectedSubtags[subtagId] = true
    }
    this.setState({
      difficultyLevel: problem.hardness.level,
      appropriateGrades: [problem.hardness.appropriate_grades_min, problem.hardness.appropriate_grades_max],
      name: problem.name,
      selectedTags: newSelectedTags,
      selectedSubtags: newSelectedSubtags,
      selectedEvents: problem.events,
      selectedSource: problem.source,
    })
  }

  ////////////////////////////////////////////

  render() {
    const { problemId, isProblemNew } = this.state;
    const { isFetching } = this.props;
    let editingProblem;
    if (this.props.problems && this.props.problems.find(problem => problem.id == problemId)) {
      editingProblem = this.props.problems.find(problem => problem.id == problemId);
    }
    if (editingProblem && !this.state.doesEditingProblemLoaded) {
      this.setState({
        doesEditingProblemLoaded: true,
      })
      this.loadEditingProblem(editingProblem);
    }

    console.log(editingProblem)

    return (
      <Container style={{ direction: 'rtl' }}>
        <Grid centered stackable container doubling>
          <Grid.Row verticalAlign='middle' columns={1} style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Grid.Column width={5} only="computer" style={{ textAlign: 'center' }}>
              <Button
                icon
                labelPosition="right"
                positive
                onClick={() => this.handleSubmit(isProblemNew)}
                loading={isFetching}
              >
                <Icon name="save" />
                {isProblemNew ? 'ذخیره' : 'اعمال تغیرات'}
              </Button>
            </Grid.Column>
            <Grid.Column width={6} >
              {editingProblem &&
                <Header as="h1" textAlign="center">
                  {`«ویرایش ${editingProblem.name}»`}
                </Header>
              }
              {isProblemNew &&
                <Header as="h1" textAlign="center">
                  {'«افزودن مسئله»'}
                </Header>
              }
            </Grid.Column>
            <Grid.Column width={5} only="computer" style={{ textAlign: 'center' }}>
              <Button
                onClick={this.props.history.goBack}
                icon
                labelPosition='left'
                color='blue'
              >
                <Icon name='reply' />
                {'بازگشت'}
              </Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2} style={{ direction: 'rtl' }}>
            <Grid.Column textAlign='center' width={11} >
              <Segment>
                <Header content={'صورت مسئله'} as="h3" textAlign="center" />
                <Editor
                  ref={(problemEl) => (this.problemEl = problemEl)}
                  id="ProblemTextArea"
                  initContent={editingProblem ? editingProblem.text : ''} //todo
                />
              </Segment>
            </Grid.Column>

            <Grid.Column
              width={5}
              textAlign='right'
              style={{ direction: 'rtl' }}
            >
              <Segment style={{ direction: 'rtl' }}>
                <Header content={'شناسنامه'} as="h3" textAlign="center" />
                <Divider section />
                <Form>
                  <Form.Field>
                    <Input
                      placeholder="نام مسئله"
                      className="rtl"
                      fluid
                      onChange={(event) => this.setState({ name: event.target.value })}
                      value={this.state.name}
                    />
                    <Input
                      style={{ width: '50%' }}
                      placeholder="سختی"
                      type="number"
                      max="100"
                      min="0"
                      className="rtl hardness"
                      onChange={
                        (event) =>
                          this.setState({ difficultyLevel: Math.min(Math.max(event.target.value, 0), 100) })
                      }
                      value={this.state.difficultyLevel}
                    />
                  </Form.Field>
                </Form>
                <br />
                <label>
                  {'پایه‌ی مناسب: '}
                  <span>
                    {toPersianNumber(this.state.appropriateGrades[0]) + 'ام تا '}
                    {toPersianNumber(this.state.appropriateGrades[1]) + 'ام'}
                  </span>
                  <Slider
                    labeled
                    multiple
                    color="red"
                    settings={
                      editingProblem ?
                        ({
                          ...this.state.settings,
                          start: [editingProblem.hardness.appropriate_grades_min, editingProblem.hardness.appropriate_grades_max],
                        })
                        : this.state.settings
                    }
                  />
                </label>
                <Dropdown
                  placeholder="منبع"
                  fluid
                  selection
                  search
                  clearable
                  defaultValue={editingProblem ? editingProblem.source : null}
                  noResultsMessage={'چیزی پیدا نشد'}
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
                  defaultValue={editingProblem ? editingProblem.events : null}
                  noResultsMessage={'چیزی پیدا نشد'}
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
                    {this.props.tags.map((tag) => (
                      <Tag
                        size={'large'}
                        name={tag.name}
                        selectable
                        key={tag.id}
                        id={tag.id}
                        selected={this.state.selectedTags[tag.id]}
                        onChange={this.handleTagChange}
                      />
                    ))}
                  </div>
                </Segment>
                <Segment textAlign="center">
                  <Label attached="top">مباحث ریزتر</Label>
                  <div>
                    {this.props.subtags.map((subtag) => {
                      if (this.state.selectedTags[subtag.parent]) {
                        return (
                          <Tag
                            size={'large'}
                            name={subtag.name}
                            selectable
                            key={subtag.id}
                            id={subtag.id}
                            selected={this.state.selectedSubtags[subtag.id]}
                            onChange={this.handleSubtagChange}
                          />
                        )
                      }
                    })}
                  </div>
                </Segment>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row textAlign='center'>
            <Grid.Column
              width={16}
              only="mobile tablet"
              textAlign='center'
            >
              <Button
                icon
                labelPosition="right"
                positive
                className="mobile-save-btn"
                onClick={() => this.handleSubmit(isProblemNew)}
                loading={isFetching}
              >
                <Icon name="save" />
                {isProblemNew ? 'ذخیره' : 'اعمال تغیرات'}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container >
    );
  }
}

const mapStateToProps = (state) => {
  const { problems, isFetching } = state.problem;
  const { events, sources, tags, subtags } = state.properties;
  return {
    events: events
      ? events
      : [],
    sources: sources
      ? sources
      : [],
    tags: tags
      ? tags
      : [],
    subtags: subtags
      ? subtags
      : [],
    problems: problems
      ? problems
      : [],
    isFetching,
  }
};

export default withRouter(connect(
  mapStateToProps,
  {
    notify,
    editProblem,
    fetchProblem,
    getTags,
    getSubtags,
    getEvents,
    getSources,
    createProblem,
  }
)(Problem));
