const { age2, date } = require('../../lib/utils')
const Member = require('../models/Member')

module.exports = {
    index(req, res) {
        Member.all(members => {
            return res.render('members/index', { members })
        })
    },

    create(req, res) {
        return res.render('members/create')
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('please fill all field')
        }

        Member.create(req.body, member => {

            return res.redirect(`members/${member.id}`)
        })


    },

    show(req, res) {
        Member.find(req.params.id, function(member) {
            if (!member) return res.send('Member not Found!')

            member.birth = date(member.birth).happy

            return res.render('members/show', { member })

        })

    },

    edit(req, res) {

        Member.find(req.params.id, function(member) {
            if (!member) return res.send('Member not Found!')

            member.birth = date(member.birth).iso

            return res.render('members/edit', { member })

        })

    },

    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('please fill all field')
        }

        Member.update(req.body, () => {

            return res.redirect(`/members/${req.body.id}`)
        })

    },

    delete(req, res) {
        Member.delete(req.body.id, () => {
            return res.redirect('/members')
        })
    }
}