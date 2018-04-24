import styled from 'styled-components';

export default styled.button`
  display: inline-block;
  outline: none;
  width: 100%;
  border: 1px solid #ffffff;
  font-size: 18px;
  border-radius: 4px;
  color: #fff;
  background-color: transparent;
  padding: 1em 2em;
  cursor: pointer;
  transition: all .2s ease-out;

  &:hover {
    background-color: #fff;
    color: #04aaff;
  }

  &:disabled, &:hover:disabled {
    cursor: not-allowed;
    background-color: transparent;
    border-color: #ffffff;
    color: #fff;
    opacity: 0.4;
  }
`;
