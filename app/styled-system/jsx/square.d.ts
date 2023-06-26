/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { SquareProperties } from '../patterns/square'
import type { HTMLStyledProps } from '../types/jsx'

export type SquareProps = SquareProperties & Omit<HTMLStyledProps<'div'>, keyof SquareProperties >


export declare const Square: FunctionComponent<SquareProps>