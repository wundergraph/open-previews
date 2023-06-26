/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { FloatProperties } from '../patterns/float'
import type { HTMLStyledProps } from '../types/jsx'

export type FloatProps = FloatProperties & Omit<HTMLStyledProps<'div'>, keyof FloatProperties >


export declare const Float: FunctionComponent<FloatProps>