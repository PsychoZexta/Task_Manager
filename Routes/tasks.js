const express=require('express');
const app=express();
const { showTasks, addTasks, showSpecificTask, updateTask, deleteTask } = require('../Controllers/tasks');
const router=express.Router();

router.route('/').get(showTasks).post(addTasks);
router.route('/:id').get(showSpecificTask).patch(updateTask).delete(deleteTask)



// app.get('/',showTasks);
//app.post('/',addTasks);
// app.get('/api/v1/tasks/:id');
// app.patch('/api/v1/tasks/:id');
// app.delete('/api/v1/tasks/:id');

module.exports=router;