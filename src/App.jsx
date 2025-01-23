import "./App.css";
import './styles/global.css';
import About from "./components/About";
import Navbar from "./components/Navbar";
import Card1 from "./components/Card1";
import Card2 from "./components/Card2";

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="section">
          <div className="container">
          <h1>Profile App</h1>
          </div>
        </div>
        <div className="section">
          <div className="container">
          <About />
          </div>
        </div>
          <div className="container2">
          <Card1 />
          <Card2 />
        </div>
      </main>
    </>
  );
};

export default App;