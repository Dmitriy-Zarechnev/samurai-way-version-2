import React, {useState} from 'react'

type PaginatorPropsType = {
    totalCount: number
    currentArray?: Array<number>
    onPageChanged: (currentPage: number) => void
    currentPage: number
    pageSize: number
    portionSize: number
}

export const Paginator = React.memo((props: PaginatorPropsType) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    let portionCount = Math.ceil(pagesCount / props.portionSize)
    let [portionNumber, setPortionNumber] = useState(1)

    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionPageNumber = portionNumber * props.portionSize

    return (
        <div>
            {portionNumber > 1 &&
                <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return (
                        <span
                            key={p}
                            onClick={() => {
                                props.onPageChanged(p)
                            }}>
                            {p}
                        </span>
                    )
                })}
            {portionCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
        </div>
    )
})

