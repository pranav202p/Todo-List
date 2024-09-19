import React, { useState, useEffect } from 'react';

export function Home() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    // Retrieve tasks from localStorage on component mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        console.log("Saved tasks in localStorage:", savedTasks); // Debugging log
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Save tasks to localStorage whenever the tasks state changes, if there is more than one task
    useEffect(() => {
        if (tasks.length > 1) {
            console.log("Saving tasks to localStorage:", tasks); // Debugging log
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    function handleChange(e) {
        setNewTask(e.target.value);
    }

    function add() {
        if (newTask.length > 0) {
            setTasks((t) => [...t, newTask]);
            setNewTask('');
        }
    }

    function deleteItem(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveDown(index) {
        if (tasks.length - 1 > index) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div>
            <div className='flex flex-auto space-x-16 mt-10 pl-28'>
                <h1 className='text-6xl font-bold'>
                    <span className='border-2 border-blue-950 p-4'>To-Do List</span>
                </h1>
                <div className='flex pl-24 space-x-20'>
                    <input
                        className='border-2 p-20 text-3xl rounded-lg w-3/4 border-slate-600'
                        type='text'
                        placeholder='Enter here...'
                        value={newTask}
                        onChange={handleChange}
                    />
                    <button
                        onClick={add}
                        className='bg-blue-950 hover:bg-blue-700 h-1/2 text-white px-10 rounded-lg py-2 mt-9'
                    >
                        Add
                    </button>
                </div>
            </div>

            <div className='mt-20 pl-20 mx-auto'>
                <ol>
                    {tasks.map((task, index) => (
                        <li className='space-y-5 w-1/2 border-2 border-slate-400' key={index}>
                            <div className='flex justify-between p-2 items-center'>
                                <span className='text-3xl pr-24'>{task}</span>

                                <div className='pl-28'>
                                    <button
                                        onClick={() => deleteItem(index)}
                                        className='p-2 text-xl bg-red-600 hover:bg-red-900 hover:text-white rounded-lg'
                                    >
                                        Delete
                                    </button>
                                    <button onClick={() => moveUp(index)} className='text-3xl'>
                                        ⬆️
                                    </button>
                                    <button onClick={() => moveDown(index)} className='text-3xl'>
                                        ⬇️
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default Home;
