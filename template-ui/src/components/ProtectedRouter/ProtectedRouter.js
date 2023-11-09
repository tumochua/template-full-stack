/* eslint-disable no-fallthrough */
import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import config from '@/config';
import Cookies from 'js-cookie';

function ProtectedRouter({ route }) {
    // const [isRouter, setIsRouter] = useState(false)
    const [roleId, setRoleId] = useState(null)

    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    const isLogin = accessToken && refreshToken;
    // console.log(route);
    useEffect(() => {
        setRoleId('R0');
    }, [roleId, isLogin, route]);

    const hasPermission = isLogin && (roleId === null || route?.role === null || (route?.role.includes(roleId)));
    if (hasPermission) {
        return <Outlet />; // Cho phép truy cập vào trang admin nếu roleId nằm trong danh sách role
    }

    return <Navigate to={config.routes.home} />; // Điều hướng về trang home nếu không đủ quyền hoặc chưa đăng nhập
}

export default ProtectedRouter;
