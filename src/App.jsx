import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import { useState } from "react";

const App = () => {
  const profiles = [
    {
      img: image1,
      name:'John Doe',
      title:'Software Engineer',
      email:'a@a.com'
    },
    {
      img: image2,
      name:'Eva Smith',
      title:'UX Designer',
      email:'b@b.com'
    },
  ];

const [clicked, setClicked] = useState(false);
const handleClick = () => {
  setClicked(!clicked);
};

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Wrapper>
          <h1>Profile App</h1>
          <button onClick={handleClick}>
            {clicked ? "Click me" : "Clicked"}
          </button>
        </Wrapper>
        <Wrapper>
          <About />
        </Wrapper>
        <Wrapper>
          <div className="profile-cards">
            {profiles.map((profile) => (
              <Card key={profile.email} {...profile} />
              ))}
        </div>
        </Wrapper>
      </main>
    </>
  );
};

export default App;