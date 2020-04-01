module.exports = {
  age: timestamp =>{
    return parseInt(
      (
        (
          (
            (
              (Date.now()- timestamp) / 1000
            ) / 60
          ) / 60
        ) /24
      ) / 365.25
    ) 
  },

  age2: timestamp => {
    const today = new Date()
    const birtDate = new Date(timestamp)

    let age = today.getFullYear() - birtDate.getUTCFullYear()
    const month = today.getMonth() - birtDate.getMonth()

    if( month < 0 || month == 0 && today.getDate() <= birtDate.getDate())
    age = age -1

    return age
  }
}