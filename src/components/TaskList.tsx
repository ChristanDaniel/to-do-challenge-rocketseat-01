import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCreateNewTaskByEnter = (key: string) => key === 'Enter' && handleCreateNewTask();

  function handleCreateNewTask() {
    if(!newTaskTitle) return setErrorMsg('Você precisa preencher o campo.')

    const randomId = Math.floor(Math.random() * 65536);
    
    let isAlreadyAddedTask = false;

    tasks.map((task) => {
      if(task.title === newTaskTitle || task.id === randomId) {
        isAlreadyAddedTask = true;
      }
    });

    if(isAlreadyAddedTask) return setErrorMsg('Você já adicionou essa tarefa.')

    const newTask = { id: randomId, title: newTaskTitle, isComplete: false}

    setTasks([...tasks, newTask]);

    setErrorMsg('')
    setNewTaskTitle('');
    isAlreadyAddedTask = false;
    // 1 - Crie uma nova task com um id random, 
    // 2 - não permita criar caso o título seja vazio  
    // 3 - não permita criar caso já exista uma tarefa com mesmo título.
    // 3 - não permita criar uma task com id já existente.
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);
    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filteredTask = tasks.filter(tasks => tasks.id !== id);
    setTasks(filteredTask)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Adicionar novo todo" 
              onChange={(elemento) => setNewTaskTitle(elemento.target.value)}
              value={newTaskTitle}
              onKeyPress={(elemento) => handleCreateNewTaskByEnter(elemento.key)}
            />
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              <FiCheckSquare size={16} color="#fff"/>
            </button>
          </div>
          <span className="span-error">{errorMsg}</span>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}