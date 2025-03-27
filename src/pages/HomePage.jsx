import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import { useState, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useReducer } from "react";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
import { initialState, homeReducer } from "../reducers/homeReducer";
import useHomePage from "../hooks/homePageHook";
import Filters from "../components/Filters";

const HomePage = () => {

  //variables
  // const [titles, setTitles] = useState([]);
  // const [title, setTitle] = useState("");
  // const [search, setSearch] = useState("");
  // const [profiles, setProfiles] = useState([]);
  // const [page, setPage] = useState(1);
  // const [count, setCount] = useState(1);
  const {state, dispatch} = useHomePage();
  const { titles, title, search, profiles, page, count } = state;
 
  // //variable to store the mode state
  // const [mode, setMode] = useState("light");
  // //function to update the mode state
  // const handleModeChange = () => {
  //   setMode(mode === "light" ? "dark" : "light");
  // };

  // //get titles
  // useEffect(() => {
  //   fetch("https://web.ics.purdue.edu/~nrusk/profile-app/get-titles.php")
  //     .then((res) => res.json())
  //     .then((data) => {
  //         // setTitles(data.titles);
  //         dispatch({ type: "SET_TITLES", payload: data.titles });
  //     })
  // }, [])

  //update title on change of the dropdown
  const handleTitleChange = useCallback((event) => {
    // setTitle(event.target.value);
    // setPage(1);
    dispatch({ type: "SET_TITLE", payload: event.target.value });
  }, []);

  //update the search on change of input
  const handleSearchChange = useCallback((event) => {
    // setSearch(event.target.value);
    // setPage(1);
    dispatch({ type: "SET_SEARCH", payload: event.target.value });
  }, []);

  // //fetch data from server
  // useEffect(() => {
  //   fetch(`https://web.ics.purdue.edu/~nrusk/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // setProfiles(data.profiles);
  //         // setCount(data.count);
  //         // setPage(data.page);
  //         dispatch({ type: "FETCH_DATA", payload: data });
  //       })
  // }, [title, search, page]);

  //clear title and search
  const handleClear = useCallback(() => {
    // setTitle("");
    // setSearch("");
    // setPage(1);
    dispatch({ type: "CLEAR_FILTER" });
  }, []);

  const titlesValue = useMemo(() => titles, [titles]);

  const buttonStyle = {
    border: "1px solid #ccc",
  };

  return (
    <Wrapper>
      <h1>Profile App</h1>
      <Filters
        titles={titlesValue}
        title={title}
        search={search}
        handleTitleChange={handleTitleChange}
        handleSearchChange={handleSearchChange}
        handleClear={handleClear}
      />
      <div className={styles["profile-cards"]}>
        {profiles.map((profile) => (
          <Link to={`profile/${profile.id}`} key={profile.id}>
          <Card {...profile} />
          </Link>
        ))}
      </div>
      {count === 0 && <p>No profiles found!</p>}
      {count > 10 && (
        <div className={styles["pagination"]}>
          <button onClick={() => dispatch({type: "SET_PAGE", payload: page - 1})} disabled={page === 1}>
            <span className="sr-only">Previous</span>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span>{page}/{Math.ceil(count/10)}</span>
          <button onClick={() => dispatch({type: "SET_PAGE", payload: page + 1})} disabled={page >= Math.ceil(count/10)}>
            <span className="sr-only">Next</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
      </div>
      )}
    </Wrapper>
  );
};

export default HomePage;

// //filter the profiles based on the title
  // const filterProfiles = profiles.filter(
  //   (profile) => 
  //     (title === "" || profile.title === title) &&
  //     profile.name.toLowerCase().includes(search.toLowerCase())
  // );