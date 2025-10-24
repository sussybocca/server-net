export default function PreviewPane({ html }) {
  return (
    <div className="mt-4 border rounded overflow-hidden">
      <iframe
        srcDoc={html}
        title="Vite Preview"
        className="w-full h-[400px]"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
