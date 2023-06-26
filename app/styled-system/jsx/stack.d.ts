/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { StackProperties } from '../patterns/stack'
import type { HTMLStyledProps } from '../types/jsx'

export type StackProps = StackProperties & Omit<HTMLStyledProps<'div'>, keyof StackProperties >


export declare const Stack: FunctionComponent<StackProps>