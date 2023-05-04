import Layout from "./components/layout";
import UploadButtons from "./components/Buttons/Upload";

export default function upload() {
    // As this page uses Server Side Rendering, the `session` will be already
    // populated on render without needing to go through a loading stage.
    return (
        <Layout>
            <UploadButtons/>
        </Layout>
    );

}