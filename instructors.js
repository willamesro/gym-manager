const fs = require('fs')
const data = require('./data.json')
const {age, date} = require('./utils')

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
      created_at: (new Intl.DateTimeFormat('fr-BE').format(foundInstructors.created_at))
    }

    return res.render('instructors/show', {instructor})

  }

// create
  exports.create = (req, res) =>{

    const keys = Object.keys(req.body)
    
    for( key of keys){
      if(req.body[key]=='')
      return res.send('please fill all field')
    }
    
    let {avatar_url, name, birth, gender, services} = req.body

    const id = Number(data.instructors.length +1)
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
      birth: date(foundInstructors.birth)
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
      birth: Date.parse(req.body.birth)
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
