import React from 'react'
import ReactQuill from 'react-quill'
import '../../../../../../../node_modules/react-quill/dist/quill.snow.css'
import { Box } from '@material-ui/core'
import './quill.css'

const DescriptionCreate = ({ body, handleChangeQuill }) => {
	return (
		<Box className="ql-app">
			<p>Mô tả</p>
			<ReactQuill
				placeholder="Mô tả sản phẩm"
				modules={DescriptionCreate.modules}
				formats={DescriptionCreate.formats}
				onChange={handleChangeQuill}
				value={body}
			/>
		</Box>
	)
}

export default DescriptionCreate

DescriptionCreate.modules = {
	toolbar: [
		[{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link', 'image', 'video'],
		['clean'],
		['code-block'],
	],
}

DescriptionCreate.formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'link',
	'image',
	'video',
	'code-block',
]
