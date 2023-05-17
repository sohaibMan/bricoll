import Layout from "../components/layout";
import Button from "@mui/joy/Button";
import React from "react";

export default function linkAccountPage() {
    // const {data} = useSession();

    return (
        <Layout>
            <form action="api/users/link_account" method="POST">
                <section>

                    <Button role="link" size="md" type="submit" variant="solid">Link your account</Button>

                </section>
            </form>
        </Layout>
    );
}
