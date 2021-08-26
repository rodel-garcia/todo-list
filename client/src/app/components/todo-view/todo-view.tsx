import { useQuery } from '@apollo/client';
import { useRouteMatch } from 'react-router-dom';
import { GetTaskResponse, MatchParam } from '../../app.definitions';
import { GET_TASK } from '../../graphql/todo-graphql-queries';

import style from './todo-view.module.scss';

const TodoView: React.FC = () => {
  const match: MatchParam | null = useRouteMatch('/tasks/:id');
  const { data, loading, error } = useQuery<GetTaskResponse>(GET_TASK, {
    variables: { id: match?.params.id },
  });

  if (loading) {
    return <em>loading ...</em>;
  }

  if (error) {
    return <em>{error.message}</em>;
  }

  if (data?.getTask) {
    const { name, description, priority, completed, dateCreated } =
      data.getTask;
    return (
      <div className={style['todo-view']}>
        <h2>{name}</h2>
        {description && (
          <div>
            <h4>Description:</h4>
            <span>{description}</span>
          </div>
        )}
        <div>
          <h4>Priority:</h4>
          <span>{priority}</span>
        </div>
        <div>
          <h4>Is completed:</h4>
          <span className='red'>{completed ? 'YES' : 'NO'}</span>
        </div>
        <div>
          <h4>Date created:</h4>
          <span>{new Date(dateCreated as string).toLocaleDateString()}</span>
        </div>
      </div>
    );
  }

  return <></>;
};

export default TodoView;
