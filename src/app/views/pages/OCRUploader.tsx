import React, { useState } from "react";
import axios from "axios";

const OCRUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const filename = response.data.filename;

  const pageTexts = response.data.pages.map((p: any) => {
    const text = p.lines.join("\n");
    return `📄 Page ${p.page}\n${text}`;
  });

  
  setResult(`File: ${filename}\n\n${pageTexts.join("\n\n")}`);
};


  return (
  <div>
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button type="submit">Upload</button>
    </form>

    <pre style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>{result}</pre>
  </div>
);

};

export default OCRUploader;
