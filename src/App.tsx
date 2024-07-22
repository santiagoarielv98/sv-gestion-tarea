import { useAppDispatch, useAppSelector } from "./app/hooks"
import { selectColorMode, toggleColorMode } from "./features/themes/themeSlice"

const App = () => {
  const dispatch = useAppDispatch()
  const colorMode = useAppSelector(selectColorMode)

  return (
    <div>
      <button
        aria-label="Toggle dark mode"
        onClick={() => dispatch(toggleColorMode())}
        style={{
          backgroundColor: colorMode === "dark" ? "#282c34" : "#fff",
          color: colorMode === "dark" ? "#fff" : "#282c34",
        }}
      >
        {colorMode === "dark" ? "🌞" : "🌜"}
      </button>
    </div>
  )
}

export default App
