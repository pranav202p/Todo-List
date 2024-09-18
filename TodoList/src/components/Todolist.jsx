import React ,{useState}from 'react'

export default function Todolist() {
    const[tasks,settasks]=useState(["Get uP in the morirng","Brush Teeth","Study for exam"]);
    const [newTask, setNewTask] = useState('');

    function handlechange(e){
        setNewTask(e.target.value)
    }
    function add(){
        if(newTask.length>0){
        settasks(t=>[...t,newTask])
        setNewTask(" ");
    }


    }
    function deleteitem(index){
       const updatedTask=tasks.filter((_,i)=>i!=index)
          settasks(updatedTask)
    }

    function moveup(index){
        if(index>0){
            const updatedTask=[...tasks];
           
            [updatedTask[index],updatedTask[index-1]]=[updatedTask[index-1],updatedTask[index]]
            settasks(updatedTask)

        }

      
    }

    function movedown(index){
        if(tasks.length-1>index){
            const updatedTask=[...tasks];
           
            [updatedTask[index],updatedTask[index+1]]=[updatedTask[index+1],updatedTask[index]]
            settasks(updatedTask)

        }
    }
  return (
    <div>
        <div className='flex  flex-auto space-x-16 mt-10 pl-28'>
      <h1 className='text-6xl font-bold'><span className=' border-2 border-blue-950 p-4'>To-Do List</span></h1>
      <div className='flex pl-24 space-x-20'>
      <input
      className=' border-2 p-20 text-3xl rounded-lg w-3/4 border-slate-600' 
      type="text"
      placeholder='Enter here...'
      value={newTask}
      onChange={handlechange}
      />
      <button onClick={add} className='bg-blue-950 hover:bg-blue-700 h-1/2 selection: text-white px-10 rounded-lg py-2 mt-9'>
        Add
      </button>
      </div>
      </div>

      <div className='mt-20 pl-20  mx-auto'>
        <ol>
         {tasks.map((task,index)=>
         
            <li className='space-y-5 w-1/2 border-2 border-slate-400' key={index}>
                 <div className='flex  justify-between p-2 items-center'>
                <span className='text-3xl pr-24 '>{task}</span>
                
               <div className='pl-28'>
                <button onClick={()=>deleteitem(index)} className='p-2 text-xl  bg-red-600 hover:bg-red-900 hover:text-white rounded-lg'>Delete</button>
                <button onClick={()=>moveup(index)} className='text-3xl'>⬆️</button>
                <button onClick={()=>movedown(index)} className='text-3xl '>⬇️</button>
                </div>
                </div>
                
            </li>
         )} 
         </ol>
      </div>
    </div>
  )
}
