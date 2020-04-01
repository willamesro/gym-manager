const fs = require('fs')
const data = require('./data.json')
// create
  exports.create = (req, res) =>{

    const keys = Object.keys(req.body)
    
    for( key of keys){
      if(req.body[key]=="")
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
  //show
  exports.show = (req, res)=>{
    const { id } = req.params

    const foundInstructors = data.instructors.find(instructor => {
        return instructor.id == id
    })

    if(!foundInstructors)  return res.send('Instructor not found')
    
    const instructor = {
      ...foundInstructors,
      age: (parseInt((((((Date.now()-foundInstructors.birth ) / 1000) / 60) / 60) /24)/365.25) ),
      services: foundInstructors.services.split(','),
      created_at: foundInstructors.created_at
    }
  
    return res.render('instructors/show', {instructor})

  }

  // update

  //delete
