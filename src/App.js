import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import AppWrapper from './pages/app';
import Player from './components/player';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <AppWrapper></AppWrapper>
      <Footer></Footer>
      <Player></Player>
    </BrowserRouter>
  );
}

export default App;
