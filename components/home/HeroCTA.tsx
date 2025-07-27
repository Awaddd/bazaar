"use client"

import { Link } from 'react-scroll';
import { Button } from '../ui/button';

export default function () {
    return (
        <Link to="section2" smooth={true} duration={500}>
            <Button size="lg" className="!px-10 bg-primary/90 hover:bg-primary">
                Browse Collection
            </Button>
        </Link>
    )
}