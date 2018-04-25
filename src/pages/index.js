import React from 'react'
import Link, { navigateTo } from 'gatsby-link'
import styled from 'styled-components';
import colors from '../constants/colors';
import typography from '../constants/typography';
import Clearfix from '../components/Clearfix';
import Button from '../components/Button';

const Jumbotron = styled.header`
  background-color: ${colors.sensorfactBlue};
  background-image: url("https://static.sensorfact.nl/SF-Graph-light.svg");
  background-position: bottom;
  background-repeat: repeat no-repeat;
  width: 100%;
  max-height: 30em;
  text-align: center;
  padding-top: 6em;
  color: ${colors.white};
  font-family: ${typography.headerFont};
  position: relative;
  margin-bottom: 5em;

  h1 {
    font-size: ${typography.headerSize}px;
    max-width: 11em; width: 100%;
    margin: 0 auto 0.4em auto;
    @media screen and (max-width: 800px) {
      font-size: ${typography.headerSize * 0.8}px;
      margin-top: 3.5em;
    }
  }

  small {
    font-family: ${typography.headerFont};
    font-size: ${typography.smallHeaderSize}px;
    font-weight: ${typography.weights.light};
    display: block;
    margin-top: 1em;
    max-width: 20em; width: 100%; margin: 0 auto;
    line-height: 1.2;

    strong {
      font-weight: ${typography.weights.bold};
    }
  }

  @media screen and (max-width: 800px) {
    padding-top: 3em;
    height: calc(100vh - 2.675em);
  }

  @media screen and (min-width: 545px) {
    height: calc(100vh - 2.675em);
  }

  ${Button} {
    width: auto;
    position: absolute;
    top: 1em; right: 1em;

    &:hover {
      color: ${colors.sensorfactBlue};
    }
  }
`;

const Screenshot = styled.img`
  width: 100%; max-width: 400px;
  display: block;
  margin: 0 auto 0 auto;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const Section = styled.section`
  padding: 0 4em;
  font-family: ${typography.paragraphFont};
`;

const Column = styled.div`
  max-width: 50%;
  width: 100%;
  float: left;
  padding: 0 1em;

  @media screen and (max-width: 800px) {
    max-width: 100%;
  }

  ${Button} {
    margin-top: 1em;
    color: ${colors.sensorfactBlue};
    border-color: ${colors.sensorfactBlue};
  }
`;

const Row = styled.div`
`;

const Tile = styled.div`
  vertical-align: top;
  display: inline-block;
  max-width: 30%;
  margin-right: 1em;
  text-align: left;

  @media screen and (max-width: 800px) {
    max-width: 100%;
    text-align: center;
  }
`;

const OSImage = styled.img`
  max-height: 100px;
`;

const onDownload = () => {
  global.window.open('https://github.com/Sensorfactdev/csv-joiner/releases/latest');
}

const IndexPage = () => (
  <div>
    <Jumbotron>
      <Button onClick={onDownload}>
        Download
      </Button>
      <h1>CSV Joiner</h1>
      <small>Because joining CSV should never be a problem</small>
    </Jumbotron>
    <Section>
      <Column>
        <h1>What is CSV Joiner?</h1>

        <p>
        Sometimes you have multiple CSV files and you want to join them. Not an easy task,
        since these files usually consist of a lot of data.
        But there is a solution: CSV Joiner.
        <br />
        CSV Joiner does exactly what the name says. It joins CSV files. And it does that in the easiest way you can think of.
        </p>
        <p>Simply select the files you want to merge, drag them to CSV Joiner and hit 'join files'.
        Next you pick a name and select the folder where you want to save the new file. And that's it: your files are joined!
        </p>
        <p>
          CSV Joiner is completely free to use and open source. So let your file joining days begin!
        </p>
        <Button onClick={onDownload}>
          Download it now
        </Button>
      </Column>
      <Column>
        <Screenshot src="https://static.sensorfact.nl/csv-joiner-screenshot.png" alt="screenshot" />
      </Column>
      <Clearfix />
    </Section>
    <br />
    <Section>
      <h1>Installation</h1>
      <p style={{ maxWidth: '400px' }}>To start the installation you will need to download the installer for you're platform.</p>
      <Row>
        <Tile>
          <OSImage src="https://i.imgur.com/xfWSDxA.png" alt="windows" />
          <h3>Windows</h3>
          <p>
            Right click the downloaded .exe file and select "Run as administrator".
          </p>
        </Tile>
        <Tile>
          <OSImage src="https://i.imgur.com/AmX7SXc.png" alt="mac" />
          <h3>Mac OS X</h3>
          <p>
            To install double click the downloaded DMG and drag CSV Joiner into your Applications directory.
        </p>
        </Tile>
        <Tile>
        <OSImage src="https://i.imgur.com/uWIjtuj.png" alt="linux" />
          <h3>Linux</h3>
          <p>
            For Linux we provide 2 types of packages, .AppImage and .snap packages.
            To use the .AppImage file just double click the downloaded file and the system wil prompt you to install.
        </p>
        </Tile>
      </Row>
    </Section>

    <br />
    <br />
    <br />
  </div>
)

export default IndexPage
