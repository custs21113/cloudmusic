import React, { Fragment, Suspense } from 'react'
import { Skeleton } from 'antd'
import routes from '../../router'
import { renderRoutes } from 'react-router-config'

export default function AppWrapper() {
    // console.log(routes)
    return (
        <Fragment>
            <Suspense fallback={<Skeleton active></Skeleton>}>{renderRoutes(routes)}</Suspense>
        </Fragment>
    )
}
