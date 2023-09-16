import {useState } from 'react';
import {useIdleTimer} from 'react-idle-timer';

export default function useIdle({
    //ADD THE onIdle AND idleTime props
    onIdle,
    idleTime=5
}){
	const [isIdle, setIsIdle] = useState();

    const handleOnIdle = event => {
        setIsIdle(true);
        console.log("user is idle", event)        
        console.log("Last Active", getLastActiveTime())
        onIdle()
    }

    const {getRemainingTime, getLastActiveTime} = useIdleTimer({
        timeout: 1000 * 60 * idleTime,
        onIdle: handleOnIdle,
        debounce: 500
    })

    return {
        getRemainingTime,
        getLastActiveTime,
        isIdle
    }

}