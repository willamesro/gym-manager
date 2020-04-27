const db = require('../../config/db')
const { age, date } = require('../../lib/utils')
module.exports = {
    all(callback) {
        const query = `select instructors.*, count(members) as total_members  from instructors left join members 
        on members.instructor_id = instructors.id group by instructors.id LIMIT 5 OFFSET 0`

        db.query(query, (err, result) => {
            if (err) throw `Database Error: ${err}`

            callback(result.rows)

        })
    },
    create(data, callback) {
        const query = `INSERT INTO 
        instructors (name, avatar_url, birth, gender, created_at, services) 
        VALUES ($1,$2, $3, $4, $5, $6) RETURNING id`

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.gender,
            date(Date.now()).iso,
            data.services
        ]
        db.query(query, values, (err, results) => {
            if (err) throw `Database Error: ${err}`

            callback(results.rows[0])

        })

    },

    find(id, callback) {
        db.query(`SELECT * FROM instructors WHERE id=$1`, [id], (err, results) => {
            if (err) throw `Database Error: ${err}`

            callback(results.rows[0])
        })
    },

    findBy(filter, callback) {
        const query = `SELECT instructors.*, count(members) AS total_members
        FROM instructors LEFT JOIN members ON
        (members.instructor_id = instructors.id)
        WHERE instructors.name ILIKE '%${filter}%' OR instructors.services ILIKE '%${filter}%'
        group by instructors.id`

        db.query(query, (err, results) => {
            if (err) throw `Database Error: ${err}`


            callback(results.rows)
        })
    },

    update(data, callback) {
        const query = `UPDATE instructors SET 
        avatar_url=($1),
        name=($2),
        birth=($3),
        gender=($4),
        services=($5)
        WHERE id=$6
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id

        ]
        db.query(query, values, (err, results) => {
            if (err) throw `Database Error: ${err}`

            callback()

        })
    },

    delete(id, callback) {
        db.query('DELETE FROM instructors WHERE id=$1', [id], (err, result) => {
            if (err) throw `Database error delete: ${err}`

            callback()
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = '',
            queryFilter = '',
            totalQuery = `(SELECT count(*) FROM  instructors) AS total`

        if (filter) {

            queryFilter = `${query} 
            WHERE instructors.name ILIKE '${filter}'
            OR instructors.SERVICES ILIKE '${filter}'
            `
            totalQuery = `SELECT count(*) FROM instructors ${queryFilter} AS total`
        }

        query = `SELECT instructors.*, ${totalQuery}, count(members) as total_students FROM instructors LEFT JOIN 
        members ON (instructors.id=members.instructor_id) ${queryFilter} GROUP BY instructors.id LIMIT $1 OFFSET $2`

        db.query(query, [limit, offset], (err, results) => {
            if (err) throw `Databse erro paginate! ${err}`

            callback(results.rows)
        })
    }

}