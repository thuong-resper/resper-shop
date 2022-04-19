import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { unwrapResult } from '@reduxjs/toolkit'
import {
	Button,
	Form,
	Input,
	InputNumber,
	Modal,
	notification,
	Radio,
	Select,
	Typography,
	Upload,
} from 'antd'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import { getCategories, getCategorySubs } from 'features/Admin/Category/pathAPI'
import { createProduct } from 'features/Admin/Product/pathAPI'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
	colorOptions,
	formItemLayout,
	smWatchFace,
	smWatchPin,
	smWatchSc,
	watchSex,
} from 'staticOptions'
import DescriptionCreate from './DescriptionCreate'
import { UserContext } from 'contexts/index.js'

const { Title } = Typography

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})
}

export default function FormProductCreateSmWatch() {
	const history = useHistory()
	const { Option } = Select
	const [form] = Form.useForm()
	const { TextArea } = Input
	const dispatch = useDispatch()

	// dispatch API
	const actionGetCategories = () => dispatch(getCategories())
	const actionGetCategorySubs = (_id) => dispatch(getCategorySubs(_id))
	const actionCreateProduct = (data, token) => dispatch(createProduct(data, token))

	//state
	const categories = useSelector((state) => state.category.categories)
	const loadingCategorySubs = useSelector((state) => state.category.loading)
	const state = useContext(UserContext)
	const [token] = state.token
	const [body, setBody] = useState('')
	const [subOptions, setSubOptions] = useState([])
	const [showSub, setShowSub] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [fileListImage, setFileListImage] = useState([])
	const [previewVisible, setPreviewVisible] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		actionGetCategories() // eslint-disable-next-line
	}, [])

	const handleChangeCategory = async (value) => {
		const subs = await actionGetCategorySubs(value)
		const resSubs = unwrapResult(subs)
		if (resSubs) {
			setSubOptions(resSubs)
			setShowSub(true)
		}
	}

	const handleChangeQuill = (e) => {
		setBody(e)
	}

	const onFinish = async (values) => {
		if (values) {
			const {
				name,
				price,
				priceCompare,
				shipping,
				quantity,
				color,
				category,
				sex,
				sc,
				subs,
				pin,
				face,
			} = values
			const formData = new FormData()
			setLoading(true)
			const newProduct = {
				name,
				description: body,
				price,
				priceCompare,
				shipping,
				quantity,
				color,
				category,
				sex,
				sc,
				subs,
				pin,
				face,
			}
			// append data product
			for (var index = 0; index < fileListImage.length; index++) {
				formData.append('image', fileListImage[index].originFileObj)
			}
			formData.append('product', JSON.stringify(newProduct))
			// Check Api Request
			const resultProduct = await actionCreateProduct(formData, token)
			const resProduct = unwrapResult(resultProduct)
			if (resProduct) {
				setLoading(false)
				form.resetFields()
				setFileListImage([])
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				})
				history.push('/admin/product')
				notification['success']({
					message: 'Thông Báo!',
					description: 'Thêm mới thành công',
				})
			}
		}
	}
	// image
	const handlePreview = async (file) => {
		try {
			if (!file.url && !file.preview) {
				file.preview = await getBase64(file.originFileObj)
			}
			setPreviewImage(file.url || file.preview)
			setPreviewVisible(true)
		} catch (error) {}
	}
	const handleChange = (f) => {
		const { file, fileList } = f
		let isJpgOrPng =
			file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
		let isLt2M = file.size / 1024 / 1024 < 2
		if (!isJpgOrPng) {
			notification['error']({
				message: 'Thông Báo',
				description: 'Bạn chỉ có thể tải lên tệp JPG / PNG / JPEG !',
			})
		}
		if (!isLt2M) {
			notification['error']({
				message: 'Thông báo',
				description: 'Hình ảnh phải nhỏ hơn 2MB ',
			})
		}
		if (isLt2M && isJpgOrPng) {
			setFileListImage(fileList)
		}
	}
	return (
		<>
			{loading && <SimpleBackdrop />}
			<Title level={4}>Thêm mới đồng hồ thông minh</Title>
			<Form
				form={form}
				{...formItemLayout}
				onFinish={onFinish}
				className="from-add-product from-edit-product"
				name="product"
			>
				<Form.Item
					label="Tên sản phẩm"
					name="name"
					rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
				>
					<TextArea rows={2} maxLength={100} />
				</Form.Item>
				<DescriptionCreate body={body} handleChangeQuill={handleChangeQuill} />
				<Form.Item
					label="Giá tiền"
					name="price"
					rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}
				>
					<InputNumber style={{ width: '100%' }} min={1} max={99999999} />
				</Form.Item>

				<Form.Item
					label="Giá tiền chưa giảm"
					name="priceCompare"
					rules={[{ required: true, message: 'Vui lòng nhập giá tiền chưa giảm' }]}
				>
					<InputNumber style={{ width: '100%' }} min={1} max={99999999} />
				</Form.Item>

				<Form.Item
					label="Giao hàng"
					name="shipping"
					rules={[{ required: true, message: 'Vui lòng chọn chọn giao hàng!' }]}
				>
					<Radio.Group>
						<Radio value="Yes" defaultChecked>
							Có
						</Radio>
						<Radio value="No" defaultChecked>
							Không
						</Radio>
					</Radio.Group>
				</Form.Item>

				<Form.Item
					label="Số lượng"
					name="quantity"
					rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm' }]}
				>
					<InputNumber style={{ width: '100%' }} min={1} max={999} />
				</Form.Item>

				<Form.Item
					name="sex"
					label="Đối tượng sử dụng"
					rules={[{ required: true, message: 'Vui lòng chọn đối tượng sử dụng!' }]}
				>
					<Select placeholder="Chọn đối tượng sử dụng" mode="multiple">
						{watchSex.map((v, i) => (
							<Option key={i} value={v.value}>
								{v.label}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					name="pin"
					label="Thời lượng pin"
					rules={[{ required: true, message: 'Vui lòng chọn thời lượng pin!' }]}
				>
					<Radio.Group>
						{smWatchPin.map((v, i) => (
							<Radio key={i} value={v.value} defaultChecked>
								{v.label}
							</Radio>
						))}
					</Radio.Group>
				</Form.Item>

				<Form.Item
					name="face"
					label="Hình dáng mặt"
					rules={[{ required: true, message: 'Vui lòng chọn hình dáng mặt!' }]}
				>
					<Radio.Group>
						{smWatchFace.map((v, i) => (
							<Radio key={i} value={v.value} defaultChecked>
								{v.label}
							</Radio>
						))}
					</Radio.Group>
				</Form.Item>

				<Form.Item
					name="sc"
					label="Đường kính mặt"
					rules={[{ required: true, message: 'Vui lòng chọn đường kính mặt!' }]}
				>
					<Radio.Group>
						{smWatchSc.map((v, i) => (
							<Radio key={i} value={v.value} defaultChecked>
								{v.label}
							</Radio>
						))}
					</Radio.Group>
				</Form.Item>

				<Form.Item
					name="color"
					label="Màu sắc"
					rules={[{ required: true, message: 'Vui lòng chọn màu sắc!' }]}
				>
					<Select placeholder="Chọn loại màu sắc" mode="multiple">
						{colorOptions.map((v, i) => (
							<Option key={i} value={v.value}>
								{v.label}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					name="category"
					label="Danh mục"
					rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
				>
					<Select placeholder="Chọn danh mục" onChange={handleChangeCategory}>
						{categories.length > 0 &&
							categories.map((c, i) => (
								<Option key={c._id} value={c._id}>
									{c.name}
								</Option>
							))}
					</Select>
				</Form.Item>

				{showSub && (
					<Form.Item
						name="subs"
						label="Thương hiệu"
						rules={[{ required: true, message: 'Vui lòng chọn thương hiệu!' }]}
					>
						{loadingCategorySubs ? (
							<LoadingOutlined style={{ fontSize: 24 }} spin />
						) : (
							<Select placeholder="Chọn thương hiệu">
								{subOptions?.length > 0 &&
									subOptions?.map((v, i) => (
										<Option key={v._id} value={v._id}>
											{v.name}
										</Option>
									))}
							</Select>
						)}
					</Form.Item>
				)}
				<Form.Item
					label="Tải Ảnh Lên"
					name="image"
					rules={[
						{
							required: fileListImage.length < 1 || fileListImage.length < 4 ? true : false,
							message: 'Vui lòng tải 4 ảnh  lên  !',
						},
					]}
				>
					<Upload
						listType="picture-card"
						accept="images/*"
						fileList={fileListImage}
						onPreview={handlePreview}
						onChange={handleChange}
						multiple
					>
						{fileListImage.length >= 6 ? null : (
							<div>
								<PlusOutlined />
								<div style={{ marginTop: 8 }}>Tải ảnh lên</div>
							</div>
						)}
					</Upload>
				</Form.Item>

				<Modal
					visible={previewVisible}
					footer={null}
					onCancel={() => {
						setPreviewVisible(false)
					}}
				>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
				<Form.Item>
					<Button style={{ marginTop: '10px' }} type="primary" htmlType="submit" loading={loading}>
						Thêm sản phẩm
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}
