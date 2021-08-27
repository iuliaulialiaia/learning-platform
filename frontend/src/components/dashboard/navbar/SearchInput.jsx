import styles from "../../../styles/navbar/SearchInput.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import {setCourses} from "../../../features/courses.slice";
import {selectToken} from "../../../features/auth.slice";
import {useDispatch, useSelector} from "react-redux";
import SearchWrapper from "../../../styles/navbar/searchInput";

function SearchInput(props) {
  const token = useSelector(selectToken);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const ref = useRef(null);

  function changeInput(syntheticEvent) {
    setInput(syntheticEvent.target.value);
  }

  function handleResponse(response) {
    const courses = response.data;
    const action = setCourses(courses);
    dispatch(action);
  }

  function handleError(error) {
    alert(error);
  }

  function timeoutHandler() {
    axios.get('http://localhost:3000/course/' + token + '?search=' + input)
      .then(handleResponse)
      .catch(handleError);
  }

  useEffect(() => {
    const timer = setTimeout(timeoutHandler, 500);
    return () => clearTimeout(timer);
  }, [input.trim()]);

  useEffect(() => {
    ref.current.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {  // enter code
        event.preventDefault();
        timeoutHandler();
        //window.location.href = '/dashboard';
      }
    });
  }, []);

  return (
    <SearchWrapper className={styles.search}>
      <FontAwesomeIcon icon={faSearch}/>
      <input type='text' placeholder='caută' ref={ref} onChange={changeInput}/>
    </SearchWrapper>
  );
}

export default SearchInput;