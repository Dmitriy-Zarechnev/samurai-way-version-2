// РАсчеты для пагинации страниц в USERS

export const onPaginationHelper = (totalCount: number, pageSize: number, currentPage: number) => {
    let pagesCount = Math.ceil(totalCount / pageSize)
    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let curPg = currentPage
    let curPF = ((curPg - 5) < 0) ? 0 : curPg - 5
    let curPL = curPg + 5

    let pagStart = pages.slice(0, 3)
    let pagCenter = pages.slice(curPF, curPL)
    let pagEnd = pages.slice(pages.length - 3)

    if (curPg <= 7) {
        pagStart = []
    }
    if (curPg >= pages.length - 7) {
        pagEnd = []
    }
    return {pagStart, pagCenter, pagEnd}
}