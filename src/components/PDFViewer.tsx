interface IProps {
  fn?: string;
}

function PDFViewer({ fn = "foo.pdf" }: IProps) {
  return (
    <>
      <br />
      <div className="pdf-view">
        <embed
          src={"./" + fn}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default PDFViewer;
