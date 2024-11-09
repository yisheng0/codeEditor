import { CodeEditor } from "./components/CodeEditor"
import { ConfigProvider } from "antd"
import { theme } from 'antd';
function App() {
  const { darkAlgorithm } = theme;
  return (
    <>
      <ConfigProvider theme={{algorithm: darkAlgorithm }}>
        <div style={{ backgroundColor: "#0f0a19", color: "gray", height: '100vh', minHeight: '100vh' }}>
          <CodeEditor />
        </div>
      </ConfigProvider>

    </>
  )
}

export default App
