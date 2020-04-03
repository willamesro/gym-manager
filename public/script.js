const currentPage = location.pathname
const menuItens = document.querySelectorAll("header .links a")

console.log(currentPage)

for(item of menuItens) {
    if(currentPage.includes(item.getAttribute('href'))){
        item.classList.add('active')
    }
}