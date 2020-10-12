
const converter = ({ difficulty, name, problem, solution, selectedTags, selectedSubtags, selectedEvents, selectedSource }) => {

  const tags = [], sub_tags = [], events = [];
  for (var id in selectedTags) {
    if (selectedTags[id]) {
      tags.push(id);
    }
  }
  for (var id in selectedSubtags) {
    if (selectedSubtags[id]) {
      sub_tags.push(id)
    }
  }
  for (var id in selectedEvents) {
    if (selectedEvents[id]) {
      events.push(id);
    }
  }

  console.log(name)

  return (
    {
      hardness: {
        id: null,
        level: difficulty.level,
        appropriate_grades_min: difficulty.appropriateGrades[0],
        appropriate_grades_max: difficulty.appropriateGrades[1],
      },
      answers: [
      ],
      name: "پترسن اول",
      verification_status: "c",
      verification_comment: "",
      text: problem,
      publish_date: "2020-05-09T22:40:08.975298+04:30",
      change_date: null,
      source: selectedSource,
      question_maker: 3,
      tags,
      sub_tags,
      events,
    }
  )

  // return ({
  //   answers: [],
  //   hardness: {
  //     id: null,
  //     level: difficulty.level,
  //     appropriate_grades_min: difficulty.appropriateGrades[0],
  //     appropriate_grades_max: difficulty.appropriateGrades[1],
  //   },
  //   name,
  //   verification_status: "w",
  //   verification_comment: "",
  //   text: solution,
  //   publish_date: "2020-05-09T22:40:08.975298+04:30",
  //   change_date: null,
  //   source: selectedSource,
  //   question_maker: 3,
  //   tags,
  //   sub_tags,
  //   events,
  // })
}


export default converter;


