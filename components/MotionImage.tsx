import { cn } from "@/lib/utils";
import { Focus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type MotionImageProps = {
    src: string;
    alt: string;
    className?: string;
    active?: boolean;
    onClick?: () => void;
    initial?: Record<string, any>
    animate?: Record<string, any>
    transition?: Record<string, any>
};

export default function MotionImage({ src, alt, className, active, onClick, initial = {}, animate = {}, transition = {} }: MotionImageProps) {
    return (
        <div className="relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        opacity: {
                            delay: 0.5,
                            ease: "easeInOut",
                            duration: 0.8,
                        }
                    }}
                >
                    {active && (
                        <motion.div
                            layoutId="active-img"
                            className="absolute z-10 bottom-2.5 right-2.5 h-7 w-7 flex justify-center items-center bg-primary/60"
                            style={{ borderRadius: "4px" }}
                        >
                            <Focus color="white" className="" />
                        </motion.div>
                    )}
                </motion.div>
                <motion.img
                    src={src}
                    alt={alt}
                    whileHover={{ scale: 1.035 }}
                    initial={initial}
                    animate={{ opacity: [0, 1], ...animate }}
                    transition={{
                        scale: {
                            duration: 0.4,
                            ease: "easeOut",
                        },
                        ...transition
                    }}
                    className={cn("rounded-lg cursor-pointer", className)}
                    onClick={() => onClick ? onClick() : undefined}
                />
            </AnimatePresence>
        </div>
    );
}