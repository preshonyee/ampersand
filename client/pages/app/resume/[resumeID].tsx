import { useRouter } from "next/router";
import EditorCanvas from "../../../components/EditorCanvas";
import Layout from "../../../components/Layout";

const Editor = () => {
  const router = useRouter();
  const { resumeID } = router.query;
  return (
    <Layout background="#f2f2f2">
      <EditorCanvas resumeID={resumeID} />
    </Layout>
  );
};

export default Editor;
