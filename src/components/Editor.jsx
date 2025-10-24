import React, { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

const Editor = ({ value, language = "javascript", onChange }) => {
  const editorRef = useRef();

  useEffect(() => {
    const editor = monaco.editor.create(editorRef.current, {
      value: value || "",
      language,
      theme: "vs-dark",
      automaticLayout: true
    });

    editor.onDidChangeModelContent(() => {
      onChange && onChange(editor.getValue());
    });

    return () => editor.dispose();
  }, []);

  return <div ref={editorRef} style={{ height: "400px", width: "100%" }}></div>;
};

export default Editor;
