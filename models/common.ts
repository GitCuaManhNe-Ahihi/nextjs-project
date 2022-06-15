import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
export interface LayoutProps{
    children:ReactNode;
}


export type NextPageWithLayout = NextPage & {
  Layout?: (page: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
