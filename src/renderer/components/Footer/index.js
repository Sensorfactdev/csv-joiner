import React from 'react';
import { shell } from 'electron';
import styled from 'styled-components';

const Wrapper = styled.footer`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 1em;
`;

const SensorfactLogo = styled.img`
  max-width: 200px;
`;

const CreatedBy = styled.p`
  margin: 0.2em 0;
`;

const SFLink = styled.div`
  cursor: pointer;
`;

export default function Footer() {
  return (
    <Wrapper>
      <CreatedBy>Created with&nbsp;❤️ &nbsp;by:</CreatedBy>
      <SFLink
        onClick={() => shell.openExternal('https://sensorfact.nl')}
        // href="https://sensorfact.nl"
      >
        <SensorfactLogo src="https://static.sensorfact.nl/Sensorfact_Logo_White.png" />
      </SFLink>
    </Wrapper>
  );
}
