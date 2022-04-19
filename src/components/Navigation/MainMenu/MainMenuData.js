import { faArchive, faHeart, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import Iconify from 'components/Iconify'

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />

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
		path: '/admin/dashboard',
		icon: getIcon('bxs:dashboard'),
	},
	{
		title: 'Người dùng',
		path: '/admin/user',
		icon: getIcon('carbon:user-avatar-filled'),
	},
	{
		title: 'Sản phẩm',
		path: '/admin/product',
		icon: getIcon('bxs:shopping-bag'),
	},
	{
		title: 'Danh mục',
		path: '/admin/category',
		icon: getIcon('ic:round-category'),
	},
	{
		title: 'Thương hiệu',
		path: '/admin/sub',
		icon: getIcon('ic:round-branding-watermark'),
	},
	{
		title: 'Khuyến mãi',
		path: '/admin/coupon',
		icon: getIcon('ic:round-discount'),
	},
	{
		title: 'Đơn hàng',
		path: '/admin/order',
		icon: getIcon('fa:first-order'),
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
