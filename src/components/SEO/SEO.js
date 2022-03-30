import React from 'react'
import { Helmet } from 'react-helmet-async'

function SEO({ children, pageDescription, pageTitle, pageUrl, image }) {
	return (
		<React.Fragment>
			<Helmet prioritizeSeoTags>
				<title>{pageTitle || 'ResperShop'}</title>
				<meta
					name="description"
					content={pageDescription || 'ResperShop - Smartphone, laptop, tablet, watch'}
				/>
				<meta property="og:url" content={pageUrl || ''} />
				<meta property="og:description" content={pageDescription || ''} />
				<meta property="og:title" content={`${pageTitle}` || ''} />
				{image && <meta property="og:image" content={image} />}
				<meta property="twitter:title" content={`${pageTitle || pageDescription}`} />
				<meta property="twitter:card" content={image ? 'summary_large_media' : 'summary'} />
				{image && <meta property="twitter:image" content={image} />}
			</Helmet>
			{children}
		</React.Fragment>
	)
}

export default SEO
