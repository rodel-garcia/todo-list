import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useRef,
  useState,
} from 'react';
import {
  NewTaskParam,
  AddNewTask,
  PopupSetter,
  Priority,
} from '../../../app.definitions';

import style from './add-new-form.module.scss';

const AddNewForm: React.FC<{
  showPopup: PopupSetter;
  addNewTask: AddNewTask;
}> = ({ showPopup, addNewTask }) => {
  const [name, setName] = useState('');
  const [description, setDesciption] = useState('');
  const [priority, setPriority] = useState(Priority.LOW);
  const [hasError, setHasError] = useState(false);
  const nameFieldRef =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasError && name !== '') {
      addNewTask({ name, description, priority } as NewTaskParam);
    } else {
      validateName(name);
      nameFieldRef.current.focus();
    }
  };

  const validateName = (fieldName: string) => {
    if (!fieldName.trim()) {
      setHasError(true);
    } else {
      setHasError(false);
      setName(fieldName);
    }
  };

  return (
    <div className={style['todo-form']}>
      <h2>Add Task</h2>
      <div className='ui divider'></div>
      <form onSubmit={onFormSubmit} className='ui form'>
        <div className={`field ${hasError && 'error'}`}>
          <label htmlFor='taskName'>Name</label>
          <input
            type='text'
            id='taskName'
            name='taskName'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              validateName(e.target.value)
            }
            ref={nameFieldRef}
            autoFocus
            autoComplete='off'
          />
        </div>
        <div
          style={{ display: hasError ? 'block' : 'none' }}
          className='ui error message'
        >
          Name is required
        </div>
        <div className='field'>
          <label htmlFor='taskDescription'>Description</label>
          <textarea
            id='taskDescription'
            name='taskDescription'
            onChange={(e) => setDesciption(e.target.value)}
            value={description}
            rows={5}
            autoComplete='of'
          ></textarea>
        </div>
        <div className='field'>
          <label htmlFor='taskPriority'>Priority</label>
          <select
            name='taskPriority'
            id='taskPriority'
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value={Priority.LOW}>{Priority.LOW}</option>
            <option value={Priority.MEDIUM}>{Priority.MEDIUM}</option>
            <option value={Priority.HIGH}>{Priority.HIGH}</option>
          </select>
        </div>
        <div className={style['form-action']}>
          <button className='ui button' onClick={() => showPopup(false)}>
            Cancel
          </button>
          <button type='submit' className='ui teal button'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewForm;
