import React from 'react';
import { Chip, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  chip: {
    margin: '2px',
  },
}));

const Tag = ({ name, isSelected = 'false', onClick, ...rest }) => {
  const classes = useStyles();
  return (
    <Chip
      className={classes.chip}
      label={<Typography variant='h5'>{name}</Typography>}
      variant={isSelected ? 'default' : 'outlined'}
      color={isSelected ? 'primary' : ''}
      clickable={onClick}
      onClick={onClick}
      {...rest}
    />
  );
}

export default Tag;