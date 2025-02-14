import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ProfileForm from "./components/ProfileForm";
import { useEffect } from "react";

const App = () => {
  // const profiles = [
  //   {
  //     img: image1,
  //     name:'John Doe',
  //     title:'Software Engineer',
  //     email:'a@a.com'
  //   },
  //   {
  //     img: image2,
  //     name:'Lily Smith',
  //     title:'UX Designer',
  //     email:'b@b.com'
  //   },
  //   {
  //     img: image1,
  //     name:'Bob Johnson',
  //     title:'Web Developer',
  //     email:'c@c.com'
  //   },
  //   {
  //     img: image2,
  //     name:'Ava Smith',
  //     title:'Web Developer',
  //     email:'d@d.com'
  //   },
  //   {
  //     img: image1,
  //     name:'Tom Smith',
  //     title:'Software Engineer',
  //     email:'e@e.com'
  //   },
  //   {
  //     img: image2,
  //     name:'Eva Smith',
  //     title:'Graphic Designer',
  //     email:'f@f.com'
  //   },
  // ];

  //variable to store the mode state
  const [mode, setMode] = useState("light");
  //function to update the mode state
  const handleModeChange = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  //get titles
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    fetch("https://web.ics.purdue.edu/~nrusk/profile-app/get-titles.php")
      .then((res) => res.json())
      .then((data) => {
          setTitles(data.titles);
      })
  }, [])

  const [title, setTitle] = useState("");
  //update title on change of the dropdown
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setPage(1);
  };

  const [search, setSearch] = useState("");
  //update the search on change of input
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~nrusk/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10`)
        .then((res) => res.json())
        .then((data) => {
          setProfiles(data.profiles);
          setCount(data.count);
          setPage(data.page);
        })
  }, [title, search, page]);

  //clear title and search
  const handleClear = () => {
    setTitle("");
    setSearch("");
    setPage(1);
  };

  const buttonStyle = {
    border: "1px solid #ccc",
  };

  return (
    <>
      <header>
        <Navbar mode={mode} updateMode={handleModeChange}/>
      </header>
      <main className={mode === "light" ? "light" : "dark"}>
        <Wrapper>
          <h1>Profile App</h1>
        </Wrapper>
        <Wrapper>
          <About />
        </Wrapper>
        <Wrapper>
          <ProfileForm />
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
            <button onClick={handleClear} style={buttonStyle}>
              <span className="sr-only">Reset</span>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="profile-cards">
            {profiles.map((profile) => (
              <Card
                key={profile.id}
                {...profile}
              />
            ))}
          </div>

          {
            count === 0 && <p>No profiles found!</p>
          }
          {count > 10 &&
          <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              <span className="sr-only">Previous</span>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span>{page}/{Math.ceil(count/10)}</span>
            <button onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(count/10)}>
              <span className="sr-only">Next</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          }

        </Wrapper>
      </main>
    </>
  );
};

export default App;

  // //filter the profiles based on the title
  // const filterProfiles = profiles.filter(
  //   (profile) => 
  //     (title === "" || profile.title === title) &&
  //     profile.name.toLowerCase().includes(search.toLowerCase())
  // );