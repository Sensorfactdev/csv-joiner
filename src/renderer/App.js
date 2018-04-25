import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { remote } from 'electron';
import DropArea from './components/DropArea';
import Files from './components/Files';
import Button from './components/Button';
import Finished from './components/Finished';
import Footer from './components/Footer';

import joinFiles from './utils/joinFiles';

/* eslint-disable */
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Rubik');

  *, *:before *:after { box-sizing: border-box; }

  html, body {
    font-family: 'Rubik', sans-serif;
    margin: 0; padding: 0;
    background-color: #04aaff;
    color: #fff;
    height: 100%;
  }

  h1 {
    margin: 0 0 0.5em 0;
  }

  body {
    display: flex;
    justify-content: center;

    background-image: url('https://static.sensorfact.nl/SF-Graph-light.svg');
    background-repeat: no-repeat;
    background-position: bottom;
    /* align-items: center; */
  }

  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #fff; border-radius: 4px }
  ::-webkit-scrollbar-thumb:hover { background: #fdfdfd; }
`;
/* eslint-enable */

const MainWrapper = styled.div`
  text-align: center;
  padding: 1em;
`;

const Logo = styled.img`
  max-width: 200px;
  margin: 1em 0 0.5em 0;
`;

const FilesWrapper = styled.div`
`;

const RestartButton = styled.button`
  border: none; outline: none;
  text-decoration: underline;
  background: none;
  color: #fff;
  float: left;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  margin-top: 1em;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: null,
      done: false,
    };

    this.onFileDrop = this.onFileDrop.bind(this);
    this.onJoinFiles = this.onJoinFiles.bind(this);
  }

  onFileDrop(files) {
    this.setState(() => ({
      files,
    }));
  }

  onJoinFiles() {
    const dest = remote.dialog.showSaveDialog({
      title: 'Select path to store joined file',
      message: 'Select path to store joined file',
      defaultPath: 'joined',
      filters: [{ name: 'CSV (*.csv)', extensions: ['csv'] }],
      buttonLabel: 'Save',
      properties: ['openFile', 'promptToCreate'],
    });

    if (!dest) {
      return remote.dialog.showMessageBox({
        type: 'error',
        buttons: ['OK'],
        title: 'No destination selected',
        message: 'Please select a file to store the joined CSV\'s',
      });
    }

    return joinFiles(this.state.files, dest)
      .then(() => {
        this.setState(() => ({ files: null, done: true }));
      });
  }

  render() {
    const { files, done } = this.state;
    return (
      <MainWrapper>
        <Logo src="https://static.sensorfact.nl/CSV_Joiner_logo_white.png" />
        {!files && !done &&
          <DropArea
            onFileDrop={this.onFileDrop}
          />}
        {files && !done &&
          <FilesWrapper>
            <Files
              files={files}
            />
            <Button
              onClick={this.onJoinFiles}
            >
              Join files
            </Button>
            <RestartButton
              onClick={() => window.location.reload()}
            >
              Restart
            </RestartButton>
          </FilesWrapper>
        }
        {done && <Finished /> }
        <Footer />
      </MainWrapper>
    );
  }
}

export default App;
