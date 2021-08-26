import { useRouteMatch, useHistory } from 'react-router-dom';
import { MatchParam, PopupSetter } from '../../../app.definitions';

import style from './main-header.module.scss';

const MainHeader: React.FC<{
  popupSetter: PopupSetter;
}> = ({ popupSetter }) => {
  const match: MatchParam | null = useRouteMatch('/tasks/:id');
  return (
    <header className={style['main-header']}>
      {!match && (
        <button
          className='ui blue right floated button'
          onClick={() => popupSetter(true)}
        >
          <i className='plus icon'></i>
          Add new
        </button>
      )}
      {match ? <DetailHeader id={match.params.id} /> : <ListHeader />}
      <div className='ui divider'></div>
    </header>
  );
};

export default MainHeader;

const ListHeader: React.FC = () => <h1>My Tasks</h1>;
const DetailHeader: React.FC<{ id: string }> = ({ id }) => {
  const history = useHistory();
  return (
    <div className={style['detail-header']}>
      <button
        className='basic ui big icon button'
        onClick={() => history.push('/tasks')}
      >
        <i className='arrow left icon'></i>
      </button>
      <h1>Task ID: {id}</h1>
    </div>
  );
};
