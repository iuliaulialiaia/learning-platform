import {useEffect} from 'react';

import styles from '../../../../styles/dashboard/main/TextArea.module.scss';

function TextArea(props) {
  function observe(element, event, handler) {
    element.addEventListener(event, handler, false);
  }

  useEffect(() => {
    function resize() {
      props.reference.current.style.height =  'auto';
      props.reference.current.style.height = props.reference.current.scrollHeight + 'px';
    }

    function delayedResize() {
      window.setTimeout(resize,0);
    }
    
    observe(props.reference.current, 'change',  resize);
    observe(props.reference.current, 'cut',     delayedResize);
    observe(props.reference.current, 'paste',   delayedResize);
    observe(props.reference.current, 'drop',    delayedResize);
    observe(props.reference.current, 'keydown', delayedResize);
  }, []);

  return <textarea className={styles.textArea} rows='1' ref={props.reference} placeholder='Descriere'/>;
}

export default TextArea;