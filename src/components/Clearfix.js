import styled from 'styled-components';

export default styled.div`
  &:before,
  &:after {
    content: " ";
    display: table;
  }

  &:after {
    clear: both;
  }

  *zoom: 1;
`;
