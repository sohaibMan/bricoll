import Button from "@mui/joy/Button";
import React from "react";

export default function LinkAccountButton() {
    return (
        <form action="api/users/link_account" method="POST">
            <Button role="link" size="md" type="submit" variant="solid">Link your account</Button>
        </form>
    );
}