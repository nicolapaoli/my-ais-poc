import React from "react";
import Button from "react-bootstrap/Button";

function AuthLink() {
    return (
        // <Button href="http://localhost:5000/auth/tink">
        <Button href="https://link.tink.com/1.0/authorize/?client_id=8dc6b685d7ec43858ab6592510ffcb32&redirect_uri=http://localhost:3000/callback&scope=accounts:read,investments:read,transactions:read,user:read,credentials:read,identity:read,statistics:read&market=IT&locale=en_US&test=true">
            Log in now
        </Button>
    )
}

export default AuthLink;