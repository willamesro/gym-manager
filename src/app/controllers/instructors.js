const { age2, date } = require('../../lib/utils')
const Instructor = require('../models/Instructor')

module.exports = {
    index(req, res) {

        let { filter, page, limit } = req.query
        page= page || 1
        limit = limit || 3
        let offset = limit * (page -1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(instructors){
                const pagination = {
                    filter,
                    page,
                    
                }
                return res.render('instructors/index', { instructors, filter })

            }
        }
        Instructor.paginate(params)
       

    },

    create(req, res) {
        return res.render('instructors/create')
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('please fill all field')
        }

        Instructor.create(req.body, instructor => {

            return res.redirect(`instructors/${instructor.id}`)
        })


    },

    show(req, res) {

        Instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send('Instructor not Found!')

            instructor.age = age2(instructor.birth)
            instructor.services = instructor.services.split(',')
            instructor.created_at = date(instructor.created_at).format

            return res.render('instructors/show', { instructor })

        })

    },

    edit(req, res) {

        Instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send('Instructor not Found!')

            instructor.birth = date(instructor.birth).iso

            return res.render('instructors/edit', { instructor })

        })

    },

    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('please fill all field')
        }

        Instructor.update(req.body, () => {

            return res.redirect(`/instructors/${req.body.id}`)
        })

    },

    delete(req, res) {
        Instructor.delete(req.body.id, () => {
            return res.redirect('/instructors')
        })
    }
}