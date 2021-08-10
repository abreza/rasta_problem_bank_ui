import React, { useState, useEffect } from 'react';
import {
  Chip,
  Typography,
  Grid,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@material-ui/core';
import { connect } from 'react-redux';
import Tag from './Tag';

import {
  getAllTags,
  getAllSubtags,
  getAllEvents,
  getAllSources,
} from '../../redux/actions/properties';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  chip: {
    margin: '2px',
  },
  formControl: {
    width: '100%'
  },
  paper: {
    padding: theme.spacing(1),
    width: '100%',
  },
}));

const PropertiesBox = ({
  allTags,
  allSubtags,
  allEvents,
  allSources,
  getAllTags,
  getAllSubtags,
  getAllEvents,
  getAllSources,
  properties,
  setProperties,
}) => {
  const classes = useStyles();

  useEffect(
    () => {
      getAllTags();
      getAllSubtags();
      getAllEvents();
      getAllSources();
    })

  const handleSelect = (e) => {
    setProperties({
      ...properties,
      [e.target.name]: e.target.value,
    })
  }

  const handleClick = (id, listName) => {
    const temporaryTagsList = properties[listName];
    if (temporaryTagsList.includes(id)) {
      for (let i = 0; i < temporaryTagsList.length; i++) {
        if (temporaryTagsList[i] === id) {
          temporaryTagsList.splice(i, 1);
        }
      }
      if (listName === 'tags') {
        const temporarySubtagsList = properties['subtags'];
        for (var subtag of allSubtags) {
          if (subtag.parent === id) {
            for (let i = 0; i < temporarySubtagsList.length; i++) {
              if (temporarySubtagsList[i] === subtag.id) {
                temporarySubtagsList.splice(i, 1);
              }
            }
          }
        }
        setProperties({
          ...properties,
          'subtags': temporarySubtagsList,
        })
      }
    } else {
      temporaryTagsList.push(id)
    }
    setProperties({
      ...properties,
      [listName]: temporaryTagsList,
    })
  }

  return (
    <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
      <Grid item container>
        <Typography gutterBottom variant='h3'>مباحث کلی</Typography>
        <Paper className={classes.paper}>
          {allTags.map((tag) => (
            <Tag name={tag.name} selected={properties.tags.includes(tag.id)}
              clickable={true}
              onClick={() => handleClick(tag.id, 'tags')}
            />
          ))}
        </Paper>
      </Grid>
      <Grid item container>
        <Typography gutterBottom variant='h3'>مباحث جزئی</Typography>
        <Paper className={classes.paper}>
          {allSubtags.filter((subtag) => properties.tags.includes(subtag.parent)).length == 0 &&
            <Typography>مبحثی جزئی وجود ندارد!</Typography>}
          {allSubtags.filter((subtag) => properties.tags.includes(subtag.parent)).map((subtag) => (
            <Tag name={subtag.name} selected={properties.subtags.includes(subtag.id)}
              clickable={true}
              onClick={() => handleClick(subtag.id, 'subtags')}
            />
          ))}
        </Paper>
      </Grid>
      <Grid item container>
        <FormControl size='small' variant="outlined" fullWidth>
          <InputLabel>رویدادها</InputLabel>
          <Select
            multiple
            className={classes.dropDown}
            defaultValue={[]}
            onBlur={handleSelect}
            name='events'
            label='رویدادها'
          >
            {allEvents.map((event) => (
              <MenuItem value={event.id}>{event.name}</MenuItem>
            ))}
          </Select>
        </FormControl >
      </Grid>
      <Grid item container>
        <FormControl size='small' variant="outlined" fullWidth>
          <InputLabel>منبع</InputLabel>
          <Select
            multiple
            className={classes.dropDown}
            defaultValue={[]}
            onBlur={handleSelect}
            name='sources'
            label='منبع'
          >
            {allSources.map((source) => (
              <MenuItem value={source.id}>{source.name}</MenuItem>
            ))}
          </Select>
        </FormControl >
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state, props) => ({
  allTags: state.properties.tags,
  allSubtags: state.properties.subtags,
  allEvents: state.properties.events,
  allSources: state.properties.sources,
})

export default connect(
  mapStateToProps,
  {
    getAllTags,
    getAllSubtags,
    getAllEvents,
    getAllSources,
  }
)(PropertiesBox);