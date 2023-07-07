import { StoreProvider } from './Context/store';
import Test from './pages/test';
import Student from './pages/student';
import './sass/index.scss'

function App() {
  

  return (
    <div className="App">
      <StoreProvider>
      <Student />
      </StoreProvider>
    </div>
  );
}

export default App;