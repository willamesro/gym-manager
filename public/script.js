const currentPage = location.pathname
const menuItens = document.querySelectorAll("header .links a")


for (item of menuItens) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

// paginação
function pagination(selectedPage, totalPage) {

    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPage; currentPage++) {
        3 <= 7
        3 >= 3
        const firstAndLastPage = currentPage == 1 || currentPage == totalPage
        const pagesAfterSelectedpage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedpage = currentPage >= selectedPage - 2

        if (firstAndLastPage || pagesAfterSelectedpage && pagesBeforeSelectedpage) {
            if (oldPage && currentPage - oldPage > 2) {
                pages.push('...')
            }
            if (oldPage && currentPage - oldPage == 2) {
                pages.push(currentPage - 1)
            }
            pages.push(currentPage)
            oldPage = currentPage
        }
    }
    return pages
}