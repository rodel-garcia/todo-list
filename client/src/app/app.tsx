import { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import TodoList from './components/todo-list/todo-list';
import style from './app.module.scss';
import TodoView from './components/todo-view/todo-view';
import TodoHeader from './components/shared/main-header/main-header';

function App() {
  const [isPopupVisible, setPopupVisibility] = useState(false);

  return (
    <div className={style.app}>
      <BrowserRouter>
        <TodoHeader popupSetter={setPopupVisibility} />
        <main>
          <Switch>
            <Route path='/tasks' exact>
              <TodoList
                isPopupVisible={isPopupVisible}
                popupSetter={setPopupVisibility}
              />
            </Route>
            <Route path='/tasks/:id' exact>
              <TodoView />
            </Route>
            <Route path='/' exact>
              <Redirect to='/tasks' />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
