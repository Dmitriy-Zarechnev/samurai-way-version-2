import {UsersListType} from '../redux/reducers/users-reducer'

// Вспомогательная функция, которая позволяет заменить в массиве объект
export const updateObjectInArray = (items: UsersListType[],
                                    itemId: number,
                                    objPropName: keyof UsersListType,
                                    newObjProps: { [key: string]: any }) => {
    return items.map(u => {
        return u[objPropName] === itemId ? {...u, ...newObjProps} : u
    })
}