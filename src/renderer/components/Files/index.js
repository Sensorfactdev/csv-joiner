import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { promisify } from 'util';
import { stat } from 'fs';

const fsStatAsync = promisify(stat);

const MainWrapper = styled.div`
`;

const Wrapper = styled.ul`
  list-style: none;
  padding: 0;
  display: block;
  width: 100%;
  max-width: 400px;
  max-height: 200px;
  overflow-y: scroll;
`;

const FileWrapper = styled.li`
  padding: 0.5em;
  border-bottom: 1px dashed #fff;
  display: flex;
  justify-content: space-between;
`;

const TotalSize = styled(FileWrapper)`
  border: none;
  margin: 0.5em 0;
`;

const FileName = styled.span`
  margin-right: 1em;
`;

const FileSize = styled.span``;

const formatName = (path) => {
  const fileNameBits = path.split('/');
  return fileNameBits[fileNameBits.length - 1];
};

const formatSize = size => (size / 1000000).toFixed(1);

export default class Files extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };

    this.getFileStats = this.getFileStats.bind(this);
  }

  componentDidMount() {
    this.getFileStats();
  }

  getFileStats() {
    const { files } = this.props;
    const promisses = files.map(file => fsStatAsync(file));

    Promise.all(promisses)
      .then((fileStats) => {
        this.setState(() => ({
          files: files.map((path, i) => Object.assign({}, { path }, fileStats[i])),
        }));
      });
  }

  render() {
    const { files } = this.state;
    return (
      <MainWrapper>
        <Wrapper>
          {files.map(({ path, size }) => (
            <FileWrapper key={path}>
              <FileName>{formatName(path)}</FileName>
              <FileSize>{formatSize(size)}MB</FileSize>
            </FileWrapper>
          ))}
        </Wrapper>
        <TotalSize key="joined.csv">
          <FileName>Total file size</FileName>
          <FileSize>{formatSize(files.reduce((acc, { size }) => acc + size, 0))}MB</FileSize>
        </TotalSize>
      </MainWrapper>
    );
  }
}

Files.propTypes = {
  files: PropTypes.arrayOf(PropTypes.string).isRequired,
};
