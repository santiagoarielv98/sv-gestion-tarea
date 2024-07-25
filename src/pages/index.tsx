import Typography from "@mui/material/Typography"
import React from "react"

function Page() {
  const divRef = React.useRef<HTMLDivElement>(null)
  const [text, setText] = React.useState("")
  const [elements, setElements] = React.useState<(string | JSX.Element)[]>([])

  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    event.currentTarget.normalize()
    setText(event.currentTarget.innerText)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " ") {
      const lastWord = text.split(" ").pop()
      if (lastWord?.startsWith("#") && !lastWord.includes(" ")) {
        event.preventDefault()
      }
    }
    if (
      event.key === "Backspace" &&
      event.currentTarget.innerText.trim() === ""
    ) {
      event.preventDefault()
    }
  }

  return (
    <div
      ref={divRef}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      contentEditable
      suppressContentEditableWarning={true}
    >
      <Typography
        data-placeholder={text.trim() === "" ? "Type something..." : ""}
        sx={{
          "&::before": {
            content: "attr(data-placeholder)",
            color: "text.secondary",
            float: "left",
            height: 0,
            pointerEvents: "none",
          },
        }}
      >
        <br />
        {text}
        {elements.length === 0 ? <></> : elements}
      </Typography>
    </div>
  )
}

export default Page
