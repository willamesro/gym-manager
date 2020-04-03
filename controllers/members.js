const fs = require('fs')
const data = require('../data.json')
const {date} = require('../utils')

  //index
exports.index = (req, res) => {
      return res.render('members/index', {members: data.members})
  }

  //show
exports.show = (req, res)=>{
    const { id } = req.params

    const foundMembers = data.members.find(member => {
        return member.id == id
    })

    if(!foundMembers)  return res.send('Member not found')
    
    const member = {
      ...foundMembers,
      birth: date(foundMembers.birth).happy,
    }

    return res.render('members/show', {member})

  }

  // crete get
exports.create = (req, res) =>{
  return res.render('members/create')
}  

  // post
exports.post = (req, res) =>{

    const keys = Object.keys(req.body)
    
    for( key of keys){
      if(req.body[key]=='')
      return res.send('please fill all field')
    }
    
    const lestId = data.members[data.members.length-1]

    let id = lestId ? lestId.id +1 : 1

    birth = Date.parse(req.body.birth)

    data.members.push({ 
      ...req.body, 
      id,
      birth
    })

    fs.writeFile('data.json', JSON.stringify(data,null,2), err=>{
        if(err) return res.send('Write file rror!')

        return res.redirect('/members')
    })

  }
  
  // edit
exports.edit = (req, res)=>{
    const {id} = req.params

    const foundMembers = data.members.find(member => {
      return member.id == id
  })

  if(!foundMembers)  return res.send('Member not found')
  
    const member = {
      ...foundMembers,
      birth: date(foundMembers.birth).iso
    }


    
    return res.render('members/edit', {member})
  }

  //put
exports.put = (req, res) =>{
    const { id } = req.body
    let index = 0
    
    const foundMembers = data.members.find((member, foundIndex) => {
      if(id== member.id){
        index= foundIndex
        return true
      }
  })

  if(!foundMembers)  return res.send('Member not found')
  
    const member = {
      ...foundMembers,
      ...req.body,
      birth: Date.parse(req.body.birth),
      id: Number(req.body.id)
    }

    data.members[index] = member
    fs.writeFile('data.json', JSON.stringify(data, null, 2), err =>{
      if(err) return res.send('write error!')

      return res.redirect(`/members/${id}`)
    })
  }

  // delete
exports.delete = (req, res) => {
    const { id } = req.body

    const filterMembers = data.members.filter( member =>{
      return member.id != id
    })
    data.members = filterMembers
    fs.writeFile('data.json', JSON.stringify(data, null, 2), err=>{
      if(err) return res.send('whirte file error')

      return res.redirect('/members')
    })

  }
