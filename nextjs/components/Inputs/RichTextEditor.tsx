import dynamic from "next/dynamic";

 // shared between forms
export const RichTextEditor = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
})