import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';

import { withStyles, MenuItem, Paper, TextField } from '@material-ui/core';

function renderInput(inputProps) {
  const { InputProps, classes, label, ref, ...other } = inputProps;

  return (
    <TextField
      label={label}
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    > </TextField>
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem.label || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.groupId}
      item={suggestion}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.object,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(suggestions, inputValue) {
  let count = 0;

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    backgroundColor: "white",
    opacity: 1,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1800,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
});

function SimpleSelect(props) {
  const { classes, defaultSelectedItem, suggestions, onSelect, label, helperText } = props;

  return (
    <Downshift
      className={classes.root}
      onChange={selection => { onSelect(selection) }}
      itemToString={item => (item ? item.label : '')}
      defaultSelectedItem={defaultSelectedItem}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex
      }) => (
          <div className={classes.container}>
            { // The text field
              renderInput({
                classes,
                fullWidth: true,
                label: label,
                InputProps: getInputProps({
                  placeholder: helperText,
                  id: 'simple-downshift-',
                }),
              })}
            { // the dropdown
              isOpen ? (
                <Paper className={classes.paper} style={{ backgroundColor: '#fff', opacity: '0.95' }} square>
                  {getSuggestions(suggestions, inputValue).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem,
                    }),
                  )}
                </Paper>
              ) : null}
          </div>
        )}
    </Downshift>
  );
}

export default withStyles(styles)(SimpleSelect);