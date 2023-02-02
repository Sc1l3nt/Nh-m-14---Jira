import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import TextArea from "antd/es/input/TextArea";

type Props = {
    description: string;
};

const TextDetail = (props: Props) => {
    const [click, setClick] = useState<Boolean>(false);
    const { description } = props;
    return (
        <div >
            <Editor initialValue={description} />
        </div>
    );
};

export default TextDetail;
