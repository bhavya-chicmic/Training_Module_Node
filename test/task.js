const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chicmic-trainingModule', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {

    const modelName = require('../app/models/phaseModel');  // replace with the actual path and model name

    modelName.find({})
        .then(documents => {
            console.log(documents);
        })
        .catch(err => {
            console.error('Error fetching documents:', err);
        });
    
    console.log('MongoDB connected successfully')
})
.catch(err => console.error('MongoDB connection error:', err));

let x= async function(){
    let phases = await dbService.find(PhaseModel,{  }), phaseCount = 0, taskCount = 0;
    console.log("PHASES", phases[0].entity.namespace)
    for(let i = 0;i<phases.length;i++){
        let setCond = { };
        if(phases[i].entity.namespace == 'course'){
            setCond =  { courseId: convertIdToMongooseId(phases[i].entity.oid) }
        }
        if(phases[i].entity.namespace == 'plan'){
            setCond=  { planId: convertIdToMongooseId(phases[i].entity.oid) };
        }
        if(phases[i].entity.namespace == 'test'){ 
            setCond = { testId: convertIdToMongooseId(phases[i].entity.oid) };
        }
        console.log(setCond, phases[i].entity.namespace == 'course',  phases[i].entity.namespace)
        await dbService.updateMany(PhaseModel,{ _id: phases[i]._id }, { $set: setCond } );
        phaseCount++
    }
    console.log("PHASSE COUNT", phaseCount)

    let task = await dbService.find(TaskModel, { isDeleted: false });
    for(let i = 0;i<task.length;i++){
        await dbService.updateMany(TaskModel,{ _id: task[i]._id }, { $set: { phase: convertIdToMongooseId(task[i].phase.oid) } } );
        taskCount++
    }
    console.log("TASKKKK COUNT", taskCount)

}

x()