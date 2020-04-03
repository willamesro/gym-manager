const fs = require('fs')
const data = require('../data.json')
const {age, date} = require('../utils')

  //index
exports.index = (req, res) => {
      return res.render('instructors/index', {instructors: data.instructors})
  }

  //show
exports.show = (req, res)=>{
    const { id } = req.params

    const foundInstructors = data.instructors.find(instructor => {
        return instructor.id == id
    })

    if(!foundInstructors)  return res.send('Instructor not found')
    
    const instructor = {
      ...foundInstructors,
      age: age(foundInstructors.birth),
      services: foundInstructors.services.split(','),
      created_at: date(foundInstructors.created_at).init
    }

    return res.render('instructors/show', {instructor})

  }

  // create
exports.create = (req, res) =>{
    return res.render('instructors/create')
  }

  // post
exports.post = (req, res) =>{

    const keys = Object.keys(req.body)
    
    for( key of keys){
      if(req.body[key]=='')
      return res.send('please fill all field')
    }
    
    let {avatar_url, name, birth, gender, services} = req.body

    const lastId = data.members[data.members.length-1]
    
    let id = lastId ? lastId.id +1 : 1
    const created_at = Date.now()
    birth = Date.parse(birth)

    data.instructors.push({  
      id,
      avatar_url,
      name,
      birth,
      gender,
      services,
      created_at
    })

    fs.writeFile('data.json', JSON.stringify(data,null,2), err=>{
        if(err) return res.send('Write file rror!')

        return res.redirect('/instructors')
    })

  }
  
  // edit
exports.edit = (req, res)=>{
    const {id} = req.params

    const foundInstructors = data.instructors.find(instructor => {
      return instructor.id == id
  })

  if(!foundInstructors)  return res.send('Instructor not found')
   
    const instructor = {
      ...foundInstructors,
      birth: date(foundInstructors.birth).iso
    }
    
    return res.render('instructors/edit', {instructor})
  }

  //put
exports.put = (req, res) =>{
    const { id } = req.body
    let index = 0
    
    const foundInstructors = data.instructors.find((instructor, foundIndex) => {
      if(id== instructor.id){
        index= foundIndex
        return true
      }
  })

  if(!foundInstructors)  return res.send('Instructor not found')
  
    const instructor = {
      ...foundInstructors,
      ...req.body,
      birth: Date.parse(req.body.birth),
      id: Number(req.body.id)
    }

    data.instructors[index] = instructor
    fs.writeFile('data.json', JSON.stringify(data, null, 2), err =>{
      if(err) return res.send('write error!')

      return res.redirect(`/instructors/${id}`)
    })
  }

  // delete
exports.delete = (req, res) => {
    const { id } = req.body

    const filterInstrucors = data.instructors.filter( instructor =>{
      return instructor.id != id
    })
    data.instructors = filterInstrucors
    fs.writeFile('data.json', JSON.stringify(data, null, 2), err=>{
      if(err) return res.send('whirte file error')

      return res.redirect('/instructors')
    })

  }
