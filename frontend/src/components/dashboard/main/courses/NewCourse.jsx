import {useRef} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {selectCategories} from '../../../../features/category.slice';
import {selectToken} from "../../../../features/auth.slice";
import TextArea from './TextArea';

import mainStyles from '../../../../styles/dashboard/main/Main.module.scss';
import courseStyle from '../../../../styles/dashboard/main/NewCourse.module.scss';
import {selectImage} from "../../../../features/courseImage.slice";

function NewCourse() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const categories = useSelector(selectCategories);
  const token = useSelector(selectToken);
  const courseImage = useSelector(selectImage);

  function clickSaveEvent(event) {
    const selectedCategory = categories.find(category => category.checked);

    const data = {
      title: titleRef.current.value,
      subtitle: subtitleRef.current.value,
      description: descriptionRef.current.value,
      category: selectedCategory.name
    };

    axios.post('http://localhost:3000/course/' + token, data)
      // .then (() => axios.post('http://localhost:3000/course/image/' + token, {file: courseImage}))
      .then(() => window.location.href = '/dashboard')
      .catch(alert);
  }
  
  function clickCancelEvent(event) {
    window.location.href = '/dashboard';
  }

  return (
    <div className={mainStyles.main + ' ' + courseStyle.newCourse}>
      <header>
        <input type='text' placeholder='Titlu' ref={titleRef}/>
        <input type='text' placeholder='Subtitlu' ref={subtitleRef}/>

        <div>
          <TextArea reference={descriptionRef}/>
        </div>
      </header>

      <main>

      </main>

      <footer>
        <button type='button' onClick={clickCancelEvent}>renunță</button>
        <button type='button' onClick={clickSaveEvent}>salvează</button>
      </footer>
    </div>
  );
}

export default NewCourse;