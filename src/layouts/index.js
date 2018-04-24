import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled, { injectGlobal } from 'styled-components';
import colors from '../constants/colors';
import typography from '../constants/typography';

injectGlobal`
  *, *:before, *:after { box-sizing: border-box; }

  html, body {
    margin: 0; padding: 0;
    font-family: ${typography.paragraphFont};
  }
`

const Footer = styled.footer`
  background-color: ${colors.grey};
  color: ${colors.white};
  padding: 1em;
  text-align: center;
  position: relative;
`;

const MadeWithLove = styled.a`
  text-decoration: none;
  position: absolute;
  right: 1em;
  color: ${colors.white} !important;

  @media screen and (max-width: 800px) {
    position: static;
  }
`;

const SensorfactLogo = styled.img`
  display: inline-block;
  max-width: 200px;
`;

const Links = styled.ul`
  display: inline-block;
  list-style: none;
  padding: 0;
  margin: 1.2em 0;

  @media screen and (max-width: 800px) {

  }

  li {
    display: inline-block;
    margin-right: 0.5em;

    &:after {
      content: "|";
      margin-left: 0.5em;
    }

    &:last-child:after { content: ""; }
  }

  a {
    color: ${colors.white} !important;
    text-decoration: none;
    font-weight: 100;
  }
`;

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      link={[
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Rubik:300,400' },
      ]}
      meta={[
        { name: 'description', content: 'Because joining CSV files should never be a problem.' },
        { name: 'keywords', content: 'merge, join, csv, sensorfact' },
      ]}
    />
    <div>
      {children()}
    </div>
    <Footer>
      <MadeWithLove href="https://sensorfact.nl">
        Made with&nbsp;❤️&nbsp;by: <br/>
        <SensorfactLogo src="https://static.sensorfact.nl/Sensorfact_Logo_White.png" alt="sensorfact" />
      </MadeWithLove>
      <Links>
        <li>
          <a href="https://sensorfact.nl">About Sensorfact</a>
        </li>
        <li>
          <a href="https://github.com/Sensorfactdev/csv-joiner">Source on Github</a>
        </li>
        <li>
          <Link to="/download">Download</Link>
        </li>
      </Links>
    </Footer>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
