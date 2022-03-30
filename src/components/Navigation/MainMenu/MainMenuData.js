import {
	faArchive,
	faHeart,
	faMobileAlt,
	faPassport,
	faStopwatch,
	faStopwatch20,
	faSuitcase,
	faTabletAlt,
	faUserCheck,
} from '@fortawesome/free-solid-svg-icons'

export const mainMenuItems = [
	{
		title: 'Điện thoại',
		icon: 'bi:phone',
		link: '/shop?category=6139b459b9a9f76d315ecf58',
	},
	{
		title: 'Laptop',
		icon: 'ant-design:laptop-outlined',
		link: '/shop?category=6142bff8d0c33220905c8bd2',
	},
	{
		title: 'Tablet',
		icon: 'clarity:tablet-line',
		link: '/shop?category=6142c006d0c33220905c8bd3',
	},
	{
		title: 'Đồng hồ thông minh',
		icon: 'ion:watch-outline',
		link: '/shop?category=61376ecfa8d3c977efbcfa07',
	},
	{
		title: 'Đồng hồ thời trang',
		icon: 'ph:watch-light',
		link: '/watch',
	},
]

export const AdminSidebarItems = [
	{
		title: 'Thống kê',
		icon: faMobileAlt,
		link: '/admin/dashboard',
	},
	{
		title: 'Sản phẩm',
		icon: faSuitcase,
		link: '/admin/product',
	},
	{
		title: 'Danh mục',
		icon: faTabletAlt,
		link: '/admin/category',
	},
	{
		title: 'Thương hiệu',
		icon: faStopwatch,
		link: '/admin/sub',
	},
	{
		title: 'Khuyến mãi',
		icon: faStopwatch20,
		link: '/admin/coupon',
	},
	{
		title: 'Đơn hàng',
		icon: faPassport,
		link: '/admin/order',
	},
]

export const UserSidebarItems = [
	{
		title: 'Thông tin tài khoản',
		icon: faUserCheck,
		link: '/user/profile',
	},
	{
		title: 'Đơn hàng của tôi',
		icon: faArchive,
		link: '/user/orders',
	},
	{
		title: 'Yêu thích',
		icon: faHeart,
		link: '/admin/category',
	},
]
