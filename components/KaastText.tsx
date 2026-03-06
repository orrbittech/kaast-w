/** Renders text with KAAST wrapped in the caveat font. */
export function KaastText({ children }: { children: string }) {
  return (
    <>
      {children.split(/(KAAST)/g).map((part, i) =>
        part === "KAAST" ? (
          <span key={i} className="font-caveat">
            KAAST
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}
