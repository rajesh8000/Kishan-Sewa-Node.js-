import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcomt to the Kishan Sewa',
  description: 'We sell all kinds of grocery, fruits, and other farming tools',
  keywords: 'groceries, buy groceries, cheap groceries',
}

export default Meta
