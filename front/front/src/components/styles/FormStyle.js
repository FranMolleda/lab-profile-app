import styled from "styled-components";

export const FormStyle = styled.div`
  border: 1px solid grey;
  width: 20rem;
  display: flex;
  text-align: -webkit-center;
  justify-content: center;
  padding-bottom: 1rem;
  padding-top: 1rem;

  form {
    display: flex;
    flex-direction: column;
    width: 19rem;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-around;

  a.button {
    height: 2rem;
  }
`;
