import InputBar from "./assets/components/input-bar"
import { InputContext } from "./assets/components/input-context"
import StatusColumns from "./assets/components/status-columns"


function App() {
 
  return (
    <InputContext>
      <div className="flex flex-col items-center w-full bg-blue-50">
        <InputBar />
        <StatusColumns />
      </div>
    </InputContext>
  )
}

export default App
