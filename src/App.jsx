import './App.css';
import Home from './pages/home';

import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  return (
    <div className="App">
      <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
        <Home />
      </SkeletonTheme>
    </div>
  );
}

export default App;
