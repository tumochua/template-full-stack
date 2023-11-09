import config from '@/config';

import Home from '@/pages/Home/index';
import DefaultLayout from '@/layouts/DefaultLayout';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login/index';

import Admin from '@/pages/Admin';
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.login, component: Login, layout: DefaultLayout },
    { path: config.routes.notFound, component: NotFound, layout: null },
];

const privateRoutes = [
    {
        id: 1,
        path: config.routes.admin,
        component: Admin,
        layout: DefaultLayout,
        role: ['R1'] // Để null tức use nào cx có quyền truy cập vào router này. Nếu muốn ai mới có quyền
        // truy cập vào role này thì để 1 mảng rồi để roleId vào
    },
]

export { publicRoutes, privateRoutes };
