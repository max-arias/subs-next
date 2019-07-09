import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'

export default class MyApp extends App {
  componentDidCatch (error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <title>Subgregator</title>
        </Head>
        <Component {...pageProps} />
      </Container>
    )
  }
}
