import Link from "next/link";
import {ReactNode} from "react";

function CustomLink(props: { href: string, children: ReactNode }) {
    return <Link href={props.href}
                 style={{textDecoration: "none", cursor: "pointer", color: "#212529",}}>{props.children}</Link>
}
export default CustomLink;
//todo style this Link