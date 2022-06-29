import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: space-around;

  width: 16rem;
  height: 16rem;

  padding: 16px;
`;

export const Label = styled.label`
  display: inline-flex;

  flex-direction: column;

  min-height: 6rem;
`;

export const ErrorMessage = styled.small`
  color: tomato;
`;

export const Input = styled.input`
  padding: 6px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-evenly;

  width: 100%;
`;

export const Button = styled.button`
  padding: 1rem 1.6rem;

  border: none;
  border-radius: 4px;

  background-color: yellow;

  cursor: pointer;

  transition: background-color 0.2s;

  :hover {
    background-color: yellowgreen;
  }
`;
