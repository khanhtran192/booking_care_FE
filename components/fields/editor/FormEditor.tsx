import { Editor } from "@tinymce/tinymce-react";
import { IEditorPropTypes } from "@tinymce/tinymce-react/lib/cjs/main/ts/components/EditorPropTypes";
import { useRef } from "react";

interface FormEditorProps extends Omit<IEditorPropTypes, "onChange" | "value"> {
	value?: string;
	onChange?: (value?: string) => void;
	height?: number;
	menuBar?: boolean;
}

export const FormEditor = ({
	menuBar = true,
	height = 640,
	onChange,
	value,
}: FormEditorProps) => {
	const editorRef = useRef(null);

	const onChangeEditor = (e1: string) => {
		if (onChange) {
			onChange(e1);
		}
	};

	return (
		<Editor
			apiKey={"ccdrghklqrfypb5xwl2vpvi27vr5tx2v236amftpe58uhqx8"}
			onInit={(evt, editor) => ((editorRef as any).current = editor)}
			value={value}
			onEditorChange={onChangeEditor}
			init={{
				height,
				menuBar,
				plugins: [
					"advlist",
					"code",
					"autolink",
					"lists",
					"link",
					"image",
					"charmap",
					"preview",
					"anchor",
					"searchreplace",
					"visualblocks",
					"fullscreen",
					"insertdatetime",
					"media",
					"table",
					"help",
					"wordcount",
				],
				toolbar:
					"undo redo | casechange blocks | bold italic backcolor | " +
					"alignleft aligncenter alignright alignjustify | " +
					"bullist numlist outdent indent | removeformat | code table help",
				content_style:
					"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
			}}
		/>
	);
};
