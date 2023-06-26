/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { LinkBoxProperties } from '../patterns/link-box'
import type { HTMLStyledProps } from '../types/jsx'

export type LinkBoxProps = LinkBoxProperties & Omit<HTMLStyledProps<'div'>, keyof LinkBoxProperties >


export declare const LinkBox: FunctionComponent<LinkBoxProps>