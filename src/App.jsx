import React, { useState } from 'react';

    function App() {
      const [todos, setTodos] = useState([]);
      const [deletedTodos, setDeletedTodos] = useState([]);
      const [input, setInput] = useState('');
      const [activeTab, setActiveTab] = useState('active');
      const [showPopup, setShowPopup] = useState(false);
      const [deleteIndex, setDeleteIndex] = useState(null);
      const [selectAll, setSelectAll] = useState(false);

      const addTodo = () => {
        if (input.trim()) {
          setTodos([...todos, { text: input, time: new Date().toLocaleString(), checked: false }]);
          setInput('');
        }
      };

      const deleteTodo = (index) => {
        setDeleteIndex(index);
        setShowPopup(true);
      };

      const confirmDeleteTodo = () => {
        const newTodos = [...todos];
        const [deletedTodo] = newTodos.splice(deleteIndex, 1);
        setTodos(newTodos);
        setDeletedTodos([...deletedTodos, deletedTodo]);
        setShowPopup(false);
        setDeleteIndex(null);
      };

      const cancelDeleteTodo = () => {
        setShowPopup(false);
        setDeleteIndex(null);
      };

      const clearDeletedTodos = () => {
        setDeletedTodos([]);
      };

      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          addTodo();
        }
      };

      const toggleCheckbox = (index) => {
        const newTodos = [...todos];
        newTodos[index].checked = !newTodos[index].checked;
        setTodos(newTodos);
      };

      const toggleSelectAll = () => {
        const newTodos = todos.map(todo => ({ ...todo, checked: !selectAll }));
        setTodos(newTodos);
        setSelectAll(!selectAll);
      };

      const deleteCheckedTodos = () => {
        setShowPopup(true);
      };

      const confirmDeleteCheckedTodos = () => {
        const newTodos = todos.filter(todo => !todo.checked);
        const deletedCheckedTodos = todos.filter(todo => todo.checked);
        setTodos(newTodos);
        setDeletedTodos([...deletedTodos, ...deletedCheckedTodos]);
        setShowPopup(false);
        setSelectAll(false);
      };

      const cancelDeleteCheckedTodos = () => {
        setShowPopup(false);
      };

      return (
        <div>
          <h1>To-Do App</h1>
          <div className="tabs">
            <button
              className={activeTab === 'active' ? 'active' : ''}
              onClick={() => setActiveTab('active')}
            >
              Active Tasks
            </button>
            <button
              className={activeTab === 'deleted' ? 'active' : ''}
              onClick={() => setActiveTab('deleted')}
            >
              Deleted Tasks
            </button>
          </div>
          {activeTab === 'active' && (
            <div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new task"
              />
              <button onClick={addTodo}>Add Task</button>
              <button className="delete-checked-button" onClick={deleteCheckedTodos}>Delete Checked Tasks</button>
              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>Task Number</th>
                    <th>Task</th>
                    <th>Date Added</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          checked={todo.checked}
                          onChange={() => toggleCheckbox(index)}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{todo.text}</td>
                      <td>{todo.time}</td>
                      <td>
                        <button onClick={() => deleteTodo(index)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'deleted' && (
            <div>
              <button onClick={clearDeletedTodos}>Clear Deleted Tasks</button>
              <table>
                <thead>
                  <tr>
                    <th>Task Number</th>
                    <th>Task</th>
                    <th>Date Added</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedTodos.map((todo, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{todo.text}</td>
                      <td>{todo.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup">
                <p>Are you sure you want to delete the task?</p>
                <button onClick={confirmDeleteTodo}>Yes</button>
                <button onClick={cancelDeleteTodo}>No</button>
              </div>
            </div>
          )}
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup">
                <p>Are you sure you want to delete the checked tasks?</p>
                <button onClick={confirmDeleteCheckedTodos}>Yes</button>
                <button onClick={cancelDeleteCheckedTodos}>No</button>
              </div>
            </div>
          )}
        </div>
      );
    }

    export default App;
