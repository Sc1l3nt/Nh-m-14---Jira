import React, { useState, useEffect } from 'react'

type Props = {
    component: React.FC,
    componentMobile: React.FC
}

type Screen = {
    with: number,
    height: number
}

const ReponsiveItem = (props: Props) => {
    const [screen, setScreen] = useState<Screen>({
        with: window.innerWidth,
        height: window.innerHeight
    })
    const setScreenWindow=():void=>{
        setScreen({
            with: window.innerWidth,
            height: window.innerHeight
        })
    }
    useEffect(() => {
        window.onload = setScreenWindow

        return () => {
            window.removeEventListener('load', setScreenWindow)
        }
    }, [])

    let Component:React.FC = props.component
    if(props.componentMobile && screen.with < 768){
        Component = props.componentMobile
    }

    return (
        <Component/>
    )
}

export default ReponsiveItem