import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from '../Button';

const FinishWrapper = styled.div`
  text-align: center;
`;

const dashAnimation = keyframes`
  0% { stroke-dashoffset: 745.74853515625; }
  100% { stroke-dashoffset: 0; }
`;

const Heading = styled.h1``;

const CheckmarkWrapper = styled.div`
  width: 80%;
  margin: 1em auto;
`;

const Checkmark = styled.svg`
  stroke-width: 4px;
`;

const CheckmarkPath = styled.path`
  stroke: #fff;
  stroke-dashoffset: 745.74853515625;
  stroke-dasharray: 745.74853515625;
  animation: ${dashAnimation} 1000ms cubic-bezier(0.4, 0, 1, 1) forwards;
`;

export default function Finished() {
  return (
    <FinishWrapper>
      <CheckmarkWrapper>
        <Checkmark
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 98.5 98.5"
          enableBackground="new 0 0 98.5 98.5"
          xmlSpace="preserve"
        >
          <CheckmarkPath
            fill="none"
            stroke-miterlimit="10"
            d="M81.7,17.8C73.5,9.3,62,4,49.2,4
            C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"
          />
        </Checkmark>
      </CheckmarkWrapper>
      <Heading>All done!</Heading>
      <Button
        onClick={() => window.location.reload()}
      >
        Join another one
      </Button>
    </FinishWrapper>
  );
}
