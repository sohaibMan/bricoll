import Link from "next/link";
import {ReactNode} from "react";

function CustomLink(props: { href: string, children: ReactNode }) {
    // use _href props of CustomNextLink to set the href
    // return <MuiLink  {...props} component={CustomNextLink} _href={href} />;
    return <Link href={props.href}
                 style={{textDecoration: "none", cursor: "pointer", color: "#fff", backgroundColor: "#73bb44", padding: "3%", borderRadius: "14px"}}>{props.children}</Link>
}
export default CustomLink;
//todo style this Lin