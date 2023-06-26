/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { LinkOverlayProperties } from '../patterns/link-overlay'
import type { HTMLStyledProps } from '../types/jsx'

export type LinkOverlayProps = LinkOverlayProperties & Omit<HTMLStyledProps<'a'>, keyof LinkOverlayProperties >


export declare const LinkOverlay: FunctionComponent<LinkOverlayProps>