const db = require('../../config/db')
const { age, date } = require('../../lib/utils')
module.exports = {
    all(callback) {
        db.query(`SELECT * FROM members`, (err, result) => {
            if (err) throw `Database Error: ${err}`

            callback(result.rows)

        })
    },
    create(data, callback) {
        const query = `INSERT INTO 
        members (name, email, avatar_url, birth, gender, blood , weight, height ) 
        VALUES ($1,$2, $3, $4, $5, $6, $7, $8) RETURNING id`

        const values = [
            data.name,
            data.email,
            data.avatar_url,
            date(data.birth).iso,
            data.gender,
            data.blood,
            data.weight,
            data.height
        ]
       
        db.query(query, values, (err, results) => {
            if (err) throw `Database Error: ${err}`
            
       
            callback(results.rows[0])

        })

    },

    find(id, callback) {
        db.query(`SELECT * FROM members WHERE id=$1`, [id], (err, results) => {
            if (err) throw `Database Error: ${err}`
            
            callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query = `UPDATE members SET 
        name=($1),
        email=($2),
        avatar_url=($3),
        birth=($4),
        gender=($5),
        blood=($6),
        weight=($7),
        height=($8)
        WHERE id=$9
        `
        const values = [
            data.name,
            data.email,
            data.avatar_url,
            date(data.birth).iso,
            data.gender,
            data.blood,
            data.weight,
            data.height,
            data.id
        ]
        db.query(query, values, (err, results) => {
            if (err) throw `Database Error: ${err}`

            callback()

        })
    },

    delete(id, callback) {
        db.query('DELETE FROM members WHERE id=$1', [id], (err, result) => {
            if (err) throw `Database error delete: ${err}`

            callback()
        })
    }

}