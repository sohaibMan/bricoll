import {RichTextEditor} from '@mantine/tiptap';
import {Editor} from '@tiptap/react';


export function ReadOnlyRichTextEditor({editor}: {
    editor: Editor
}) {


    editor.setEditable(false);



    return (
        <RichTextEditor editor={editor} style={{border:"none"}} >
            <RichTextEditor.Content/>
        </RichTextEditor>
    );
}

