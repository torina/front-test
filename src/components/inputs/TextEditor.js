import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ value, setValue, placeholder }) => {
  const modules = {
    toolbar: [
      [{ header: 1 }, { header: 2 }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
      [{ align: "center" }, { align: "" }, { align: "right" }],
      [{ script: "super" }, { script: "sub" }],
      ["code-block"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "script",
    "code-block",
  ];
  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e)}
    />
  );
};

export default TextEditor;
