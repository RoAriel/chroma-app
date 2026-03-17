import ThemeProvider from "./hooks/ThemeProvider";
import Chromalab from "./Chromalab";

export default function App() {
  return (
    <ThemeProvider>
      <Chromalab />
    </ThemeProvider>
  );
}
