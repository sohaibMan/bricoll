import Link from "next/link";

function CustomLink(props: { href: string, children: JSX.Element | string }) {
    // use _href props of CustomNextLink to set the href
    // return <MuiLink  {...props} component={CustomNextLink} _href={href} />;
    return <Link href={props.href}
                 style={{textDecoration: "none", cursor: "pointer", color: "#212529",}}>{props.children}</Link>
}
export default CustomLink;
//todo style this Link