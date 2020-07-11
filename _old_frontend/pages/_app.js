import App from 'next/app'
import React from 'react'

import 'antd/dist/antd.css'

export default class SubgregatorApp extends App {
  componentDidCatch (error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }

  render() {
    const { Component, pageProps } = this.props

    return <Component {...pageProps} />
  }
}
