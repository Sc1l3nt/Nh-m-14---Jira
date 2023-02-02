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
        <div className="">
            <Editor />
            <Editor
                initialValue={description}
                init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
            />
        </div>
    );
};

export default TextDetail;
