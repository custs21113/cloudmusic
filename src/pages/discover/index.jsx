import React, { Fragment, Suspense } from 'react'
import Navbar from '../../components/navbar'
import { renderRoutes } from 'react-router-config'
import { Skeleton } from 'antd'
import './index.scss';
export default function Discover(props) {
    const { route } = props;
    return (
        <Fragment>
            <Navbar></Navbar>
            <Suspense fallback={() => <Skeleton active></Skeleton>}>
                <div className="discover">

                    {renderRoutes(route.routes)}
                </div>
            </Suspense>
        </Fragment>

    )
}
