import Player from '../../components/player';
import { Fragment, useEffect } from 'react';
import store from '../../store';

export default function PlayerWarpper (props) {
    return (
        <Fragment>
            <Player {...store.getState()} ></Player>
        </Fragment>
    )
}