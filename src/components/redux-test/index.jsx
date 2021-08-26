import React, { Fragment } from 'react'
import store from './store'
export default function Reduxtext(props) {
    // let [count, setCount]=useState(store.getState())
    // useEffect(() => {
    //     setCount(count);
    // }, [count])
    return (
        <Fragment>
            {/* <Provider store={store}> */}

            <div>
                <button onClick={() => store.dispatch({
                    type: "INCREMENT", data: 1
                })}>increment</button>
                <br />{store.getState()}<br />
                <button onClick={() => store.dispatch({
                    type: "DECREMENT", data: 3
                })}>decrement</button></div>
            {/* </Provider> */}
        </Fragment>
    )
}