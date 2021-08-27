import {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {selectToken} from '../../../features/auth.slice';
import {setCategories, setNames, clearCategories, selectCategories} from "../../../features/category.slice";

import AsideWrapper from "../../../styles/dashboard/aside/AsideWrapper";
import Category from "../../../styles/dashboard/aside/Category";
import styles from '../../../styles/dashboard/aside/Aside.module.scss';
import {setImage, selectImage} from "../../../features/courseImage.slice";
import {faFile, faImage, faPlane} from "@fortawesome/free-solid-svg-icons";

function Aside(props) {
  const categories = useSelector(selectCategories);
  const token = useSelector(selectToken);
  const location = useLocation();
  const dispatch = useDispatch();
  const courseImage = useSelector(selectImage);

  function fileChangeEvent(event) {
    const action = setImage(URL.createObjectURL(event.target.files[0]));
    dispatch(action);
  }

  function selectCategory(category) {
    return () => {
      // axios.get('http://localhost:3000/course/' + token + '?category=' + category.name)
      //   .then(response => {
      //     const courses = response.data;
      //     const action = setCourses(courses);
      //     dispatch(action);
      //   })
      //   .catch(handleError);

      const action = setCategories(
        categories.map(c => (c.name === category.name) ? ({
          name: category.name,
          checked: !category.checked
        }) : (location.pathname === '/dashboard/new-course') ? ({
          name: c.name,
          checked: false
        }) : c)
      );
      dispatch(action);
    }
  }

  function handleError(error) {
    alert(error);
  }

  useEffect(() => {
    const action = clearCategories();
    dispatch(action);
  }, [location.pathname]);

  useEffect(() => {
    axios.get('http://localhost:3000/course/category/' + token)
      .then(response => {
        const action = setNames(response.data);
        dispatch(action);
      })
      .catch(handleError);
  }, []);

  return (
    <AsideWrapper className={styles.aside} show={location.pathname === '/dashboard'}>
      <div>
        <h4>CATEGORII</h4>
        {categories.map((category, index) =>
          <Category key={index} checked={category.checked} onClick={selectCategory(category)}>
            <span>{'\uf00c'}</span>
            {category.name}
          </Category>
        )}
      </div>

      {(location.pathname === '/dashboard/new-course') ? (
        <>
          <div>
            <h4>UNELTE</h4>
          </div>
          <div>
            <h4>THUMBNAIL</h4>
            <div className={styles.thumbnail}>
              <FontAwesomeIcon icon={faImage}/>
              <input type='file' onChange={fileChangeEvent} accept='image/*'/>
            </div>
          </div>
        </>
        ) : (
          <div>
            <h4>DATA APARIȚIEI</h4>
          </div>
      )}
    </AsideWrapper>
  );
}

export default Aside;