"use client"

import { ReactNode } from "react";
import { Element } from "react-scroll";

export default function ({ children }: { children: ReactNode }) {
    return (
        <Element name="section2">
            {children}
        </Element>
    )
}
