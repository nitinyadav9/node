const Joi =require('joi');


const express = require('express');


const app = express();
app.use(express.json())
let courses = [
    {id: 1, name :'course1'},
    {id:2, name:"course2"},
    {id:3, name:"course3"}
]
app.get('/',(req,res)=>{
    console.log(req.url)
    res.send('hello world!!!!');
});
app.get('/api/courses',(req,res)=>{
    res.send(courses)
});
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=> c.id ==parseInt(req.params.id));
    if(!course) res.status(404).send('The course is no found')
    res.send(course)     
})

app.post('/api/courses',(req,res)=>{
    
    const {error, value}= validateCourse(req.body)
    
   
    if(error){
        res.status(400).send('Name is required and should be minimum 3 char')
        return;
    }
    const course = {
        id: courses.length+1,       
        name: req.body.name
    };
    courses.push(course)
    res.send(course)

});

app.put('/api/courses/:id',(req,res)=>{
    //validate if id is there or not.
    const course = courses.find(c=> c.id ==parseInt(req.params.id));
    if(!course) {
        res.status(404).send('The course is no found') 
        return;
    }

    //validate if name is correct.
    
    const {error, value}= validateCourse(req.body);
    
   
    if(error){
        res.status(400).send('Name is required and should be minimum 3 char')
        return;
    }

    course.name = req.body.name;
    res.send(course);

    
})


app.delete('/api/course/:id',(req,res)=>{
    const course = courses.find(c=> c.id ==parseInt(req.params.id));
    if(!course) {
        res.status(404).send('The course is no found') 
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index,1)
    res.send(course)
   

})
function validateCourse(course){
    const schema1 = Joi.object({
        name : Joi.string().min(3).required()
    })
    return schema1.validate(course);

}
app.listen(3000, ()=>console.log('Listening on port 3000'))




