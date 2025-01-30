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
      name:'Lily Smith',
      title:'UX Designer',
      email:'b@b.com'
    },
    {
      img: image1,
      name:'Bob Johnson',
      title:'Web Developer',
      email:'c@c.com'
    },
    {
      img: image2,
      name:'Ava Smith',
      title:'Web Developer',
      email:'d@d.com'
    },
    {
      img: image1,
      name:'Tom Smith',
      title:'Software Engineer',
      email:'e@e.com'
    },
    {
      img: image2,
      name:'Eva Smith',
      title:'Graphic Designer',
      email:'f@f.com'
    },
  ];

  //get titles
  const titles = [...new Set(profiles.map((profile) => profile.title))];

  const [title, setTitle] = useState("");
  //update title on change of the dropdown
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const [search, setSearch] = useState("");
  //update the search on change of input
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  //clear title and search
  const handleClear = () => {
    setTitle("");
    setSearch("");
  };

  //filter the profiles based on the title
  const filterProfiles = profiles.filter(
    (profile) => 
      (title === "" || profile.title === title) &&
      profile.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Wrapper>
          <h1>Profile App</h1>
        </Wrapper>
        <Wrapper>
          <About />
        </Wrapper>
        <Wrapper>
          <div className="filter-wrapper">
            <div className="filter--select">
              <label htmlFor="title-select">Select a title:</label>
              <select
                id="title-select" 
                onChange={handleTitleChange}
                value={title}
              >
                <option value="">All</option>
                {titles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
                {/* <option value="Software Engineer">Software Engineer</option>
                <option value="Software Developer">Software Developer</option>
                <option value="Ux Designer">Ux Designer</option>
                <option value="Graphic Designer">Graphic Designer</option> */}
              </select>
            </div>
            <div className="filter--search">
              <label htmlFor="search">Search by name:</label>
              <input
                type="text"
                id="search"
                onChange={handleSearchChange}
                value={search}
              />
            </div>
                <button onClick={handleClear}>Clear</button>
          </div>
          <div className="profile-cards">
            {filterProfiles.map((profile) => (
              <Card key={profile.email} {...profile} />
            ))}
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default App;