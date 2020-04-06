module.exports = {
    age: timestamp => {
        return parseInt(
            (
                (
                    (
                        (
                            (Date.now() - timestamp) / 1000
                        ) / 60
                    ) / 60
                ) / 24
            ) / 365.25
        )
    },

    age2: timestamp => {
        const today = new Date()
        const birtDate = new Date(timestamp)

        let age = today.getFullYear() - birtDate.getFullYear()
        const month = today.getMonth() - birtDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() <= birtDate.getDate())
            age = age - 1

        return age
    },

    date: timestamp => {

        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth()+1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            year,
            month,
            day,
            iso: year + '-' + month + '-' + day,
            happy: day + '/' + month,
            init: day + '/' + month + '/' + year
        }
    }
}