import React, { Component } from 'react';
import { remote } from 'electron';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../Button';

const Wrapper = styled.div`
  border: 2px dashed ${({ active }) => active ? '#000' : '#fff'};
  background-color: ${({ active }) => active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  position: relative;
`;

const BrowseButton = styled(Button)`
  padding: 0.5em 1em;
  z-index: 10;
  width: auto;
`;

export default class DropArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragged: false,
    };

    this.onDrag = this.onDrag.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onBrowse = this.onBrowse.bind(this);
  }

  componentDidMount() {
  }

  onDrop(e) {
    e.persist();
    e.preventDefault();
    e.stopPropagation();

    const { onFileDrop } = this.props;

    const files = [...e.dataTransfer.files]
      .map(({ path }) => path);

    const hasOnlyCSV = files.reduce((acc, path) => !path.includes('.csv') ? false : acc, true);
    if (!hasOnlyCSV) {
      remote.dialog.showMessageBox({
        type: 'error',
        buttons: ['OK'],
        title: 'Non CSV files selected',
        message: 'It looks like you\'ve selected files that don\'t have .csv extension, please only select CSV files',
      });
    } else {
      onFileDrop(files);
    }


    this.setState(() => ({ dragged: false }));
  }

  onDrag(e) {
    e.persist();
    e.preventDefault();

    this.setState(() => ({ dragged: true }));
  }

  onEnd(e) {
    e.persist();
    e.preventDefault();
    this.setState(() => ({ dragged: false }));
  }

  onBrowse() {
    const { onFileDrop } = this.props;
    const files = remote.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] });
    onFileDrop(files);
  }

  render() {
    const { dragged } = this.state;

    return (
      <Wrapper
        active={dragged}
        id="dropzone"
        className="dropzone"
        onDragOver={this.onDrag}
        onDragLeave={this.onEnd}
        onDragEnd={this.onEnd}
        onDrop={this.onDrop}
      >
        <BrowseButton
          onClick={this.onBrowse}
        >
          Browse files
        </BrowseButton>
      </Wrapper>
    );
  }
}

DropArea.propTypes = {
  onFileDrop: PropTypes.func.isRequired,
};
