import React from 'react'
import iconsSprite from '../../../assets/images/sprite_svg.svg'

type IconPropsType = {
    iconId: string,
    width?: string,
    height?: string,
    viewBox?: string,
}

export const Icon = React.memo((props: IconPropsType) => {
    return (
        <svg width={props.width || '30'} height={props.height || '30'} viewBox={props.viewBox || '0 0 24 24'}
             xmlns="http://www.w3.org/2000/svg">
            <use xlinkHref={`${iconsSprite}#${props.iconId}`}/>
        </svg>
    )
})





