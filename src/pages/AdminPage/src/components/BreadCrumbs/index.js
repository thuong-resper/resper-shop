import React from 'react'
import { Box, Breadcrumbs, Link, Typography } from '@material-ui/core'

export default function CustomAdminBreadCrumb({ link, lastTitle }) {
	return (
		<Box marginTop={1}>
			<Breadcrumbs separator="›" aria-label="breadcrumb-admin">
				{link.map((l) => (
					<Link key={l.title} color="inherit" href={l.path}>
						{l.title}
					</Link>
				))}
				<Typography color="textPrimary">{lastTitle}</Typography>
			</Breadcrumbs>
		</Box>
	)
}
