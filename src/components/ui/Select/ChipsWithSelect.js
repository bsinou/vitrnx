
import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import keycode from 'keycode';

import { withStyles, Chip, MenuItem, Paper, TextField } from '@material-ui/core';

// TODO: some hard coded key (roleId and label) might still hang around, check and clean

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    opacity: 0.95
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
});

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
    />
  );
}

function renderSuggestion({idKey, suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion[idKey]}
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
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(suggestions, inputValue) {
  let count = 0;

  return suggestions.filter(suggestion => {
    const keep = (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 10;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

class DownshiftMultiple extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      idKey: props.idKey, // not optimal, rather use props.idKey directly
      inputValue: '',
      selectedItems: props.defaultListedItems,
    }
  }

  // Remove last item of the list with back space
  handleKeyDown = event => {
    const { inputValue, selectedItems } = this.state;
    if (selectedItems.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItems: selectedItems.slice(0, selectedItems.length - 1),
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {

    let { selectedItems } = this.state;

    if (selectedItems.indexOf(item) === -1) {
      selectedItems = [...selectedItems, item];
      this.props.onToggle(item)
    }

    this.setState({
      inputValue: '',
      selectedItems: selectedItems,
    });
  };

  handleDelete = item => () => {
    const selectedItems = [...this.state.selectedItems];
    selectedItems.splice(selectedItems.indexOf(item), 1);

    this.setState({ selectedItems: selectedItems });
    this.props.onToggle(item)
  };

  render() {
    const { classes, idKey, idLabel, suggestions, helperText } = this.props;
    const { inputValue, selectedItems } = this.state;

    return (
      <Downshift
        className={classes.root}
        sugestions={suggestions}
        itemToString={item => (item ? item.label : '')}
        inputValue={inputValue}
        onChange={this.handleChange}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
        }) => (
            <div className={classes.container}>
              {// The chip list with the already selected values
                renderInput({
                  fullWidth: true,
                  classes,
                  InputProps: getInputProps({
                    startAdornment: selectedItems.map(item => (
                      <Chip
                        key={item[idKey]}
                        tabIndex={-1}
                        label={item[idLabel]}
                        className={classes.chip}
                        onDelete={this.handleDelete(item)}
                      />
                    )),
                    onChange: this.handleInputChange,
                    onKeyDown: this.handleKeyDown,
                    placeholder: helperText,
                    id: 'integration-downshift-multiple',
                  }),
                })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(suggestions, inputValue).map((suggestion, index) =>
                    renderSuggestion({
                      idKey,
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
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DownshiftMultiple);