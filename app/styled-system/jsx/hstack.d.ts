/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { HstackProperties } from '../patterns/hstack'
import type { HTMLStyledProps } from '../types/jsx'

export type HstackProps = HstackProperties & Omit<HTMLStyledProps<'div'>, keyof HstackProperties >


export declare const HStack: FunctionComponent<HstackProps>