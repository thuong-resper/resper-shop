import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	makeStyles,
	Radio,
	RadioGroup,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { Controller } from 'react-hook-form'
import { Form } from 'components/Form/Form'
import React from 'react'
import { FilterTitle } from 'components/Filter/FilterTitle'
import { categoryId, colorOptions, priceOptions, starOptions } from 'staticOptions'
import clsx from 'clsx'
import Iconify from 'components/Iconify'
import {
	LaptopFilters,
	PhoneFilters,
	SmWatchFilters,
	TabletFilters,
	WatchFilters,
} from 'components/Filter/SpecialFilters'

const useStyles = makeStyles((theme) => ({
	formLabel: { height: '2rem' },
	starRadio: {
		my: 0.5,
		borderRadius: 1,
		'& > :first-of-type': { py: 0.5 },
		'&:hover': {
			opacity: 0.48,
			'& > *': { backgroundColor: 'transparent' },
		},
	},
}))

const defaultFilter = {
	category: '',
	price: '',
	rating: '',
	subs: false,
	color: false,
	type: false,
	sc: false,
	ram: false,
	rom: false,
	res: false,
	cpu: false,
	sex: false,
	pin: false,
	face: false,
}

export function ProductFilterSidebar({
	query,
	control,
	categoryData,
	handleChangeCategory,
	subData,
	handleChangeCheckbox,
	defaultValues,
	categoryWatch,
	reset,
}) {
	const classes = useStyles()

	return (
		<div>
			<>
				<>
					<Form>
						<Box>
							<FilterTitle title={'Danh mục sản phẩm'} icon={'bx:category'} />
							<Controller
								control={control}
								name="category"
								render={({ field }) => (
									<RadioGroup row {...field} style={{ flexDirection: 'column' }}>
										{categoryData?.map((c, idx) => (
											<FormControlLabel
												key={idx}
												value={c._id}
												control={<Radio color="primary" size="small" />}
												onChange={() => handleChangeCategory(c)}
												label={c.name}
												className={classes.formLabel}
											/>
										))}
									</RadioGroup>
								)}
							/>
						</Box>

						{categoryWatch && (
							<Box>
								<FilterTitle title={'Thương hiệu'} icon={'tabler:brand-asana'} />
								<FormGroup style={{ flexDirection: 'row' }}>
									<Controller
										name="subs"
										control={control}
										render={({ field, fieldState }) => (
											<>
												{subData?.map((i, idx) => (
													<FormControlLabel
														{...field}
														key={idx}
														label={i.name}
														onChange={(event) =>
															field.onChange(handleChangeCheckbox(i, event, 'subs', '_id'))
														}
														control={
															<Checkbox
																color="primary"
																size="small"
																checked={defaultValues.subs && defaultValues.subs.includes(i._id)}
															/>
														}
													/>
												))}
											</>
										)}
									/>
								</FormGroup>
							</Box>
						)}

						<Box>
							<FilterTitle title={'Giá'} icon={'ion:pricetags-outline'} />
							<Controller
								control={control}
								name="price"
								render={({ field }) => (
									<RadioGroup row {...field} style={{ flexDirection: 'column' }}>
										{priceOptions.map((i, idx) => (
											<FormControlLabel
												key={idx}
												value={i.value}
												control={<Radio color="primary" size="small" />}
												label={i.label}
												className={classes.formLabel}
											/>
										))}
									</RadioGroup>
								)}
							/>
						</Box>
						<Box>
							<FilterTitle title={'Đánh giá'} icon={'bi:star'} />
							<Controller
								control={control}
								name="rating"
								render={({ field }) => (
									<RadioGroup row {...field}>
										{starOptions.map((i, idx) => (
											<FormControlLabel
												key={idx}
												value={i.value}
												label={i.label}
												control={
													<Radio
														disableRipple
														color="default"
														size="small"
														icon={<Rating readOnly value={5 - idx} />}
														checkedIcon={<Rating readOnly value={5 - idx} />}
													/>
												}
												className={clsx(classes.formLabel, classes.starRadio)}
											/>
										))}
									</RadioGroup>
								)}
							/>
						</Box>

						<Box>
							<FilterTitle title={'Màu sắc'} icon={'codicon:symbol-color'} />
							<FormGroup style={{ flexDirection: 'row', marginLeft: 4 }}>
								<Controller
									name="color"
									control={control}
									render={({ field, fieldState }) => (
										<>
											{colorOptions?.map((i, idx) => (
												<FormControlLabel
													key={idx}
													control={
														<Checkbox
															icon={
																<Iconify
																	icon={'akar-icons:square-fill'}
																	width="1.5rem"
																	height="1.5rem"
																/>
															}
															checked={defaultValues.color && defaultValues.color.includes(i.value)}
															style={{
																padding: '4px',
																color: `${i.code}`,
															}}
														/>
													}
													className={classes.formLabel}
													label=""
													onChange={(event) =>
														field.onChange(handleChangeCheckbox(i, event, 'color', 'value'))
													}
												/>
											))}
										</>
									)}
								/>
							</FormGroup>
						</Box>

						{/* Special filters */}
						{categoryWatch === categoryId.phone && (
							<PhoneFilters
								defaultValues={defaultValues}
								control={control}
								handleChangeCheckbox={handleChangeCheckbox}
							/>
						)}
						{categoryWatch === categoryId.laptop && (
							<>
								<LaptopFilters
									defaultValues={defaultValues}
									control={control}
									handleChangeCheckbox={handleChangeCheckbox}
								/>
							</>
						)}
						{categoryWatch === categoryId.tablet && (
							<>
								<TabletFilters
									defaultValues={defaultValues}
									control={control}
									handleChangeCheckbox={handleChangeCheckbox}
								/>
							</>
						)}
						{categoryWatch === categoryId.smWatch && (
							<>
								<SmWatchFilters
									defaultValues={defaultValues}
									control={control}
									handleChangeCheckbox={handleChangeCheckbox}
								/>
							</>
						)}
						{categoryWatch === categoryId.watch && (
							<>
								<WatchFilters
									defaultValues={defaultValues}
									control={control}
									handleChangeCheckbox={handleChangeCheckbox}
								/>
							</>
						)}
					</Form>
					<Box mt={2}>
						<Button
							fullWidth
							size="large"
							type="submit"
							color="inherit"
							variant="outlined"
							onClick={() =>
								reset({
									...defaultValues,
									...defaultFilter,
								})
							}
							startIcon={<Iconify icon={'ic:outline-clear-all'} width="1.5rem" height="1.5rem" />}
						>
							Xóa tất cả
						</Button>
					</Box>
				</>
			</>
		</div>
	)
}
