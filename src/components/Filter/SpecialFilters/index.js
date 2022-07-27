import { Box, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import { FilterTitle } from 'components/Filter/FilterTitle'
import { Controller } from 'react-hook-form'
import {
	laptopCpu,
	laptopRam,
	laptopRes,
	laptopRom,
	laptopSc,
	phoneRam,
	phoneRom,
	phoneSc,
	phoneType,
	smWatchFace,
	smWatchPin,
	smWatchSc,
	tabletRam,
	tabletRom,
	tabletSc,
	watchSc,
	watchSex,
} from 'staticOptions'
import React from 'react'
import { isExactMatch } from 'utils/checkMarch'

const SpecialCheckbox = ({
	title,
	icon,
	style,
	name,
	control,
	filterArray,
	handleChangeCheckbox,
	attr,
	defaultValues,
}) => {
	return (
		<Box>
			<FilterTitle title={title} icon={icon} />
			<FormGroup style={style ?? null}>
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<>
							{filterArray?.map((i, idx) => (
								<FormControlLabel
									{...field}
									key={idx}
									label={i.label}
									onChange={(event) =>
										field.onChange(handleChangeCheckbox(i, event, name, attr ?? 'value'))
									}
									control={
										<Checkbox
											color="primary"
											size="small"
											checked={
												defaultValues[name] && isExactMatch(defaultValues[name], i[attr ?? 'value'])
											}
										/>
									}
								/>
							))}
						</>
					)}
				/>
			</FormGroup>
		</Box>
	)
}

export function PhoneFilters({ defaultValues, control, handleChangeCheckbox }) {
	return (
		<Box>
			<SpecialCheckbox
				title="Loại điện thoại"
				icon="ic:baseline-merge-type"
				name="type"
				control={control}
				filterArray={phoneType}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
			<SpecialCheckbox
				title="Màn hình"
				icon="cil:screen-smartphone"
				name="sc"
				control={control}
				filterArray={phoneSc}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
			<SpecialCheckbox
				title="Ram"
				icon="clarity:hard-disk-line"
				style={{ flexDirection: 'row' }}
				name="ram"
				control={control}
				filterArray={phoneRam}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
			<SpecialCheckbox
				title="Bộ nhớ trong"
				icon="icon-park-outline:disk"
				style={{ flexDirection: 'row' }}
				name="rom"
				control={control}
				filterArray={phoneRom}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
		</Box>
	)
}

export function LaptopFilters({ defaultValues, control, handleChangeCheckbox }) {
	return (
		<Box>
			<SpecialCheckbox
				title="Độ phân giải"
				icon="ic:twotone-filter-center-focus"
				style={{ flexDirection: 'row' }}
				name="res"
				control={control}
				filterArray={laptopRes}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
			<SpecialCheckbox
				title="CPU"
				icon="ep:cpu"
				name="cpu"
				control={control}
				filterArray={laptopCpu}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
			<SpecialCheckbox
				title="Màn hình"
				icon="cil:laptop"
				style={{ flexDirection: 'row' }}
				name="sc"
				control={control}
				filterArray={laptopSc}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
			<SpecialCheckbox
				title="Ram"
				icon="clarity:hard-disk-line"
				style={{ flexDirection: 'row' }}
				name="ram"
				control={control}
				filterArray={laptopRam}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
			<SpecialCheckbox
				title="Ổ cứng"
				icon="icon-park-outline:disk"
				style={{ flexDirection: 'row' }}
				name="rom"
				control={control}
				filterArray={laptopRom}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
		</Box>
	)
}

export function TabletFilters({ defaultValues, control, handleChangeCheckbox }) {
	return (
		<Box>
			<SpecialCheckbox
				title="Màn hình"
				icon="et:tablet"
				name="sc"
				control={control}
				filterArray={tabletSc}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
			<SpecialCheckbox
				title="Ram"
				icon="clarity:hard-disk-line"
				style={{ flexDirection: 'row' }}
				name="ram"
				control={control}
				filterArray={tabletRam}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
			<SpecialCheckbox
				title="Ổ cứng"
				icon="icon-park-outline:disk"
				style={{ flexDirection: 'row' }}
				name="rom"
				control={control}
				filterArray={tabletRom}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
		</Box>
	)
}

export function SmWatchFilters({ defaultValues, control, handleChangeCheckbox }) {
	return (
		<Box>
			<SpecialCheckbox
				title="Đối tượng sử dụng"
				icon="icons8:gender-neutral-user"
				style={{ flexDirection: 'row' }}
				name="sex"
				control={control}
				filterArray={watchSex}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
			<SpecialCheckbox
				title="Thời lượng pin"
				icon="bi:pin-angle"
				name="pin"
				control={control}
				filterArray={smWatchPin}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
			<SpecialCheckbox
				title="Hình dáng mặt"
				icon="akar-icons:watch-device"
				name="face"
				control={control}
				filterArray={smWatchFace}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
			<SpecialCheckbox
				title="Đường kính mặt"
				icon="fluent:slide-size-20-regular"
				name="sc"
				control={control}
				filterArray={smWatchSc}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
		</Box>
	)
}

export function WatchFilters({ defaultValues, control, handleChangeCheckbox }) {
	return (
		<Box>
			<SpecialCheckbox
				title="Đối tượng sử dụng"
				icon="icons8:gender-neutral-user"
				style={{ flexDirection: 'row' }}
				name="sex"
				control={control}
				filterArray={watchSex}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
			<SpecialCheckbox
				title="Đường kính mặt"
				icon="fluent:slide-size-20-regular"
				name="sc"
				control={control}
				filterArray={watchSc}
				handleChangeCheckbox={handleChangeCheckbox}
				defaultValues={defaultValues}
			/>
		</Box>
	)
}
