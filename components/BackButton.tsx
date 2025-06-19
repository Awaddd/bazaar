"use client"

import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import Link from "next/link";

// temporarily using link instead of navigating back

export default function () {

    return (
        <div className="fixed xl:absolute bottom-4 xl:top-[30px] right-4 xl:right-0">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    opacity: {
                        delay: 0.2,
                        duration: 0.4,
                        ease: "easeOut"
                    }
                }}
            >
                <Button
                    asChild
                    variant="default"
                    className="!font-medium bg-primary/85 rounded-full"
                >
                    <Link href="/"><ArrowLeft /></Link>
                </Button>
            </motion.div>
        </div>
    )
}