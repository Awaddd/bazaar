import { Star } from "lucide-react";

type Props = {
    value: number;
}

export default function ({ value }: Props) {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index} className={index < value ? "text-yellow-500/80" : "text-slate-500/30"}>
                        <Star className="fill-current stroke-[1.5px]" />
                    </span>
                ))}
            </div>
            <span className="text-base mt-1 font-medium text-muted-foreground">Rated by <span className="font-black">120</span> shoppers</span>
        </div>
    )
}