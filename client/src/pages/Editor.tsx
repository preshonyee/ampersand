import React from "react";
import styled from "styled-components";
import EditorCanvas from "../components/EditorCanvas";

const Wrapper = styled.div`
  background-color: #f9fbfd;
`;

const Editor = () => {
  return (
    <Wrapper>
      <EditorCanvas />
    </Wrapper>
  );
};

export default Editor;
