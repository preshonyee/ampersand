import EditorCanvas from "../components/EditorCanvas";
import Layout from "../components/Layout";

const Editor = (props: any) => {
  return (
    <Layout background="#f2f2f2">
      <EditorCanvas resumeID={props.match.params.resumeID} />
    </Layout>
  );
};

export default Editor;
