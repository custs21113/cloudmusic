import { lazy } from 'react';
import Discover from '../pages/discover';
import Friend from '../pages/friend';
import Mine from '../pages/mine';
import { Redirect } from 'react-router-dom'
// import Recommend from '../components/recommend';
// const Mine = lazy(() => import('../pages/mine'));
// const Friend = lazy(() => import('../pages/friend'));
import RecommendPage from '../pages/discover/recommend'
const Album = lazy(()=>import('../pages/discover/album'))
const Artist = lazy(()=>import('../pages/discover/artist'))
const Playlist = lazy(()=>import('../pages/discover/playlist'))
const Toplist = lazy(()=>import('../pages/discover/toplist'))
const Djradio = lazy(()=>import('../pages/discover/djradio'))
const routes = [
    { path: '/', exact: true, render: ()=><Redirect to="/discover" /> },
    {
        path: '/discover', component: Discover,
        routes: [
            {
              path: '/discover',
              exact: true,
              render: () => <Redirect to="/discover/recommend" />,
            },
            { path: '/discover/recommend', component: RecommendPage},
            { path: '/discover/toplist', component: Toplist},
            { path: '/discover/playlist', component: Playlist},
            { path: '/discover/artist', component: Artist},
            { path: '/discover/album', component: Album},
            { path: '/discover/djradio', component: Djradio}
        ]
    },
    { path: '/mine', component: Mine },
    { path: '/friend', component: Friend },

]
export default routes;