import { spiritsList } from './data/spiritsList.ts';
import './App.css';
import { SpiritsTable } from './components';

function App() {
  return (
    <>
      <SpiritsTable spiritsList={spiritsList} />
    </>
  );
}

export default App;
