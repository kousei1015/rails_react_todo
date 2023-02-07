import styled from "styled-components";

export const Wrapper = styled.div<{ background: string;}>`
  background: ${(props) => props.background};
  padding: 1rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
