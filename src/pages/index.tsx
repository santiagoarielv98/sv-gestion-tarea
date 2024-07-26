import { HashtagNode, $isHashtagNode } from "@lexical/hashtag"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin"
import { Box, Typography } from "@mui/material"
import {
  $getRoot,
  $getSelection,
  COMMAND_PRIORITY_EDITOR,
  INSERT_TAB_COMMAND,
  type EditorState,
} from "lexical"
import { useEffect } from "react"
// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot()
    const selection = $getSelection()
    const isHashtag = $isHashtagNode(root)
    console.log("onChange", isHashtag)

    // console.log(root, selection)
  })
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus()

    return editor.registerCommand<string>(
      INSERT_TAB_COMMAND,
      payload => {
        console.log("Tab inserted!", payload)
        // const isHashtag = $isHashtagNode(payload)
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
  }, [editor])

  return null
}

function onError(error: unknown) {
  console.error(error)
}

export default function Editor() {
  return (
    <Box sx={{ position: "relative" }}>
      <LexicalComposer
        initialConfig={{
          namespace: "MyEditor",
          onError,
          nodes: [HashtagNode],
        }}
      >
        <PlainTextPlugin
          contentEditable={
            <Typography variant="h1" component={ContentEditable} />
          }
          placeholder={
            <Typography
              variant="h1"
              sx={{
                color: "grey.500",
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
              }}
            >
              Start typing...
            </Typography>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HashtagPlugin />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
      </LexicalComposer>
    </Box>
  )
}
