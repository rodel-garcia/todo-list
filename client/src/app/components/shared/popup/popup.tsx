import style from './popup.module.scss';

const Popup: React.FC = ({ children }) => (
  <div className={style['todo-popup']}>
    <div className={style['popup-content']}>{children}</div>
  </div>
);

export default Popup;
