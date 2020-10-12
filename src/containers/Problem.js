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
import Tag from '../components/problem/Tag';
import converter from '../components/problem/convertor';
import Editor from '../components/editor/tiny_editor/react_tiny/TinyEditorComponent';
import { connect } from 'react-redux';
import {
  submitProblem,
  fetchProblem,
} from '../redux/actions/problem';
import {
  getTags,
  getSubtags,
  getEvents,
  getSources,
} from '../redux/actions/properties'
import '../styles/Problem.css';

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
      difficulty: {
        level: 5,
        appropriateGrades: [8, 12],
      },
      selectedEvents: [],
      selectedSource: '',
      problem: '',
      solution: '',
      doesSubmitProblem: false,
      doesEditingProblemLoaded: false,
      settings: {
        start: [8, 12],
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

  handleDifficultyLevelChange = (event) => {
    this.setState({
      difficulty: {
        ...this.state.difficulty,
        level: event.target.value,
      }
    })
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
          newSelectedSubtags[subtag.parent + ' ' + subtag.id] = false;
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

  handleSubmit = () => { //todo
    this.setProblem();
    this.setSolution();
    setTimeout(() =>
      this.props.submitProblem(converter(this.state))
      , 500)
    // this.setState({ doesSubmitProblem: true });
  };

  setProblem() { // todo check empty
    this.setState({
      problem: this.problemEl.getContent()
    });
  }

  setSolution() { // todo check empty
    this.setState({
      solution: this.solutionEl.getContent()
    });
  }

  loadEditingProblem(problem) {
    console.log(problem)
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
      difficulty: {
        level: problem.hardness.level,
        appropriateGrades: [problem.hardness.appropriate_grades_min, problem.hardness.appropriate_grades_max]
      },
      name: problem.name,
      selectedTags: newSelectedTags,
      selectedSubtags: newSelectedSubtags,
      selectedEvents: problem.events,
      selectedSource: problem.source,
    })
  }

  render() {
    const { problemId, isProblemNew } = this.state;

    if (!isProblemNew && !this.props.problems) {
      return (
        <>
        </>
      )
    }

    const editingProblem = this.props.problems ? this.props.problems[problemId] : null;
    if (editingProblem && !this.state.doesEditingProblemLoaded) {
      this.setState({
        doesEditingProblemLoaded: true,
      })
      this.loadEditingProblem(editingProblem);
    }

    // const { doesSubmitProblem, } = this.state;
    // if (doesSubmitProblem) {
    //   return <Redirect push to={'/problemset/page/' + this.state.activePage} />; //todo:
    // }

    console.log(converter(this.state))

    return (
      <Container style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <Grid centered stackable>
          <Grid.Row centered relaxed>
            <Grid.Column width={5} only="computer" />
            <Grid.Column width={5}>
              <Header as="h1" textAlign="center">
                {isProblemNew ? '«مسئله‌ی جدید»' : '«ویرایش مسئله»'}
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
                  ref={(problemEl) => (this.problemEl = problemEl)}
                  id="ProblemTextArea"
                  initContent={editingProblem ? editingProblem.text : null} //todo
                />
                <Header content={'پاسخ'} as="h3" textAlign="center" />
                <Editor
                  ref={(solutionEl) => (this.solutionEl = solutionEl)}
                  id="SolutionTextArea"
                  initContent={editingProblem ? editingProblem.answers[0] : null} //todo
                />
              </Segment>
            </Grid.Column>
            <Grid.Column
              width={5}
              style={{ direction: 'rtl', textAlign: 'right' }}
            >
              <Segment style={{ direction: 'rtl' }}>
                <Header content={'شناسنامه'} as="h2" textAlign="center" />
                <Divider section />
                <Input
                  placeholder="نام مسئله"
                  className="rtl"
                  fluid
                  onChange={(e) =>
                    this.setState({ name: e.target.value })
                  }
                  value={this.state.name}
                />
                <Input
                  placeholder="سختی"
                  type="number"
                  max="100"
                  min="0"
                  className="rtl hardness"
                  onChange={this.handleDifficultyLevelChange}
                  value={this.state.difficulty.level}
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

const mapStateToProps = (state) => {
  const { problems } = state.problem;
  const { events, sources, tags, subtags } = state.properties;
  return {
    events,
    sources,
    tags,
    subtags,
    problems,
  }
};

export default connect(
  mapStateToProps,
  {
    submitProblem,
    fetchProblem,
    getTags,
    getSubtags,
    getEvents,
    getSources,
  })(Problem);
