import React from "react"

import ListItemText from "@mui/material/ListItemText"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import Typography from "@mui/material/Typography"

const suggestions = ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]

function Page() {
  const divRef = React.useRef<HTMLDivElement>(null)
  const [text, setText] = React.useState<string>("")
  const [element, setElement] = React.useState<HTMLElement | null>(null)
  const [tag, setTag] = React.useState<string>("")

  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    console.log(event.currentTarget.textContent)
    console.log(event.currentTarget.innerHTML)

    const value = event.currentTarget.textContent!
    const lastWord = value.split(/(\s+)/).pop()!

    if (lastWord.startsWith("#")) {
      setTag(lastWord)
      setElement(divRef.current!)
    } else {
      setTag("")
      setElement(null)
    }

    setText(value)

    /* mover cursor al final */
    const range = document.createRange()
    const selection = window.getSelection()
    if (selection) {
      range.selectNodeContents(divRef.current!)
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key === "Backspace" &&
      event.currentTarget.innerText.trim() === ""
    ) {
      event.preventDefault()
    }
  }

  const handleAddTag = (event: React.MouseEvent<HTMLLIElement>) => {
    const value = event.currentTarget.innerText
    const index = text.lastIndexOf(tag)

    setText(
      text.slice(0, index) +
        `<span style="color: blue">${value}</span>` +
        " ",
    )
    setElement(null)

    divRef.current!.focus()
  }

  return (
    <div>
      <div
        ref={divRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        contentEditable
        suppressContentEditableWarning={true}
      >
        <Typography
          data-placeholder={text.length === 0 ? "Type something..." : ""}
          sx={{
            ...(text.trim() === "" && {
              "&::before": {
                content: "attr(data-placeholder)",
                color: "text.secondary",
                float: "left",
                height: 0,
                pointerEvents: "none",
              },
            }),
          }}
          dangerouslySetInnerHTML={{ __html: text.length > 0 ? text : "<br/>" }}
        />
      </div>
      <Popper
        open={Boolean(element)}
        anchorEl={divRef.current}
        placement="bottom-start"
      >
        <Paper sx={{ width: 320 }}>
          <MenuList dense>
            {suggestions
              .filter(suggestion => suggestion.startsWith(tag))
              .map((suggestion, index) => (
                <MenuItem key={index} onClick={handleAddTag}>
                  <ListItemText inset>{suggestion}</ListItemText>
                </MenuItem>
              ))}
          </MenuList>
        </Paper>
      </Popper>
    </div>
  )
}

export default Page
