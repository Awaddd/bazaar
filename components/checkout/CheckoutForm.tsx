"use client"

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check, ChevronDown, CreditCard } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Step = "contact" | "shipping" | "method" | "payment";

interface StepConfig {
    id: Step;
    number: number;
    title: string;
}

const steps: StepConfig[] = [
    { id: "contact", number: 1, title: "Contact Information" },
    { id: "shipping", number: 2, title: "Shipping Information" },
    { id: "method", number: 3, title: "Shipping Method" },
    { id: "payment", number: 4, title: "Payment" },
];

export default function CheckoutForm() {
    const [currentStep, setCurrentStep] = useState<Step>("contact");
    const [completedSteps, setCompletedSteps] = useState<Set<Step>>(new Set());

    const isStepCompleted = (stepId: Step) => completedSteps.has(stepId);
    const isStepCurrent = (stepId: Step) => currentStep === stepId;

    const completeStep = (stepId: Step) => {
        setCompletedSteps(prev => new Set(prev).add(stepId));
        const currentIndex = steps.findIndex(s => s.id === stepId);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1].id);
        }
    };

    const editStep = (stepId: Step) => {
        setCurrentStep(stepId);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { delay: 0.4, duration: 0.4, ease: "easeOut" } }}
            className="flex flex-col space-y-3 lg:pt-2"
        >
            {/* Step 1: Contact Information */}
            <StepSection
                step={steps[0]}
                isCompleted={isStepCompleted("contact")}
                isCurrent={isStepCurrent("contact")}
                onEdit={() => editStep("contact")}
            >
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label htmlFor="firstName" className="font-medium">First Name</Label>
                            <Input id="firstName" className="mt-2" placeholder="John" />
                        </div>
                        <div>
                            <Label htmlFor="lastName" className="font-medium">Last Name</Label>
                            <Input id="lastName" className="mt-2" placeholder="Doe" />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="email" className="font-medium">Email</Label>
                        <Input id="email" type="email" className="mt-2" placeholder="john@example.com" />
                    </div>
                    <div>
                        <Label htmlFor="phone" className="font-medium">Phone</Label>
                        <div className="flex gap-2 mt-2">
                            <Input className="w-24" placeholder="+1" />
                            <Input className="flex-1" placeholder="(555) 123-4567" />
                        </div>
                    </div>
                    <Button
                        className="w-full mt-4"
                        size="lg"
                        onClick={() => completeStep("contact")}
                    >
                        Continue
                    </Button>
                </div>
            </StepSection>

            {/* Step 2: Shipping Information */}
            <StepSection
                step={steps[1]}
                isCompleted={isStepCompleted("shipping")}
                isCurrent={isStepCurrent("shipping")}
                onEdit={() => editStep("shipping")}
            >
                <div className="space-y-3">
                    <div>
                        <Label htmlFor="address" className="font-medium">Address</Label>
                        <Input id="address" className="mt-2" placeholder="123 Main Street" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label htmlFor="city" className="font-medium">City</Label>
                            <Input id="city" className="mt-2" placeholder="New York" />
                        </div>
                        <div>
                            <Label htmlFor="zip" className="font-medium">Zip Code</Label>
                            <Input id="zip" className="mt-2" placeholder="10001" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label htmlFor="country" className="font-medium">Country</Label>
                            <Input id="country" className="mt-2" placeholder="United States" />
                        </div>
                        <div>
                            <Label htmlFor="state" className="font-medium">State</Label>
                            <Input id="state" className="mt-2" placeholder="NY" />
                        </div>
                    </div>
                    <Button
                        className="w-full mt-4"
                        size="lg"
                        onClick={() => completeStep("shipping")}
                    >
                        Continue
                    </Button>
                </div>
            </StepSection>

            {/* Step 3: Shipping Method */}
            <StepSection
                step={steps[2]}
                isCompleted={isStepCompleted("method")}
                isCurrent={isStepCurrent("method")}
                onEdit={() => editStep("method")}
            >
                <div className="space-y-3">
                    <div className="space-y-2">
                        <button className="w-full p-4 border-2 border-primary rounded-lg text-left bg-primary/5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-medium">Standard Shipping</div>
                                    <div className="text-sm text-muted-foreground">5-7 business days</div>
                                </div>
                                <div className="font-semibold text-green-600">Free</div>
                            </div>
                        </button>
                        <button className="w-full p-4 border border-border rounded-lg text-left hover:border-foreground/50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-medium">Express Shipping</div>
                                    <div className="text-sm text-muted-foreground">2-3 business days</div>
                                </div>
                                <div className="font-semibold">$15</div>
                            </div>
                        </button>
                        <button className="w-full p-4 border border-border rounded-lg text-left hover:border-foreground/50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-medium">Next Day Delivery</div>
                                    <div className="text-sm text-muted-foreground">1 business day</div>
                                </div>
                                <div className="font-semibold">$25</div>
                            </div>
                        </button>
                    </div>
                    <Button
                        className="w-full mt-4"
                        size="lg"
                        onClick={() => completeStep("method")}
                    >
                        Continue
                    </Button>
                </div>
            </StepSection>

            {/* Step 4: Payment */}
            <StepSection
                step={steps[3]}
                isCompleted={isStepCompleted("payment")}
                isCurrent={isStepCurrent("payment")}
                onEdit={() => editStep("payment")}
            >
                <div className="space-y-3">
                    <div>
                        <Label htmlFor="cardNumber" className="font-medium">Card Number</Label>
                        <div className="relative mt-2">
                            <Input id="cardNumber" placeholder="4242 4242 4242 4242" className="pr-10" />
                            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="cardName" className="font-medium">Cardholder Name</Label>
                        <Input id="cardName" className="mt-2" placeholder="John Doe" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label htmlFor="expiry" className="font-medium">Expiry Date</Label>
                            <Input id="expiry" className="mt-2" placeholder="MM/YY" />
                        </div>
                        <div>
                            <Label htmlFor="cvv" className="font-medium">CVV</Label>
                            <Input id="cvv" className="mt-2" placeholder="123" type="password" maxLength={3} />
                        </div>
                    </div>
                    <Button
                        className="w-full mt-7 flex items-center justify-center space-x-2"
                        size="lg"
                    >
                        <span>Place Order</span>
                        <ArrowRight size={18} />
                    </Button>
                </div>
            </StepSection>
        </motion.div>
    );
}

interface StepSectionProps {
    step: StepConfig;
    isCompleted: boolean;
    isCurrent: boolean;
    onEdit: () => void;
    children: React.ReactNode;
}

function StepSection({ step, isCompleted, isCurrent, onEdit, children }: StepSectionProps) {
    const isOpen = isCurrent || !isCompleted;

    return (
        <div className="border border-border rounded-lg overflow-hidden">
            <button
                onClick={isCompleted ? onEdit : undefined}
                className={cn(
                    "w-full p-4 flex items-center justify-between transition-colors",
                    isCompleted && "cursor-pointer hover:bg-muted/50",
                    isCurrent && "bg-muted"
                )}
            >
                <div className="flex items-center space-x-3">
                    <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm",
                        isCompleted
                            ? "bg-primary text-primary-foreground"
                            : isCurrent
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                    )}>
                        {isCompleted ? <Check size={16} /> : step.number}
                    </div>
                    <span className={cn(
                        "font-semibold",
                        !isCurrent && !isCompleted && "text-muted-foreground"
                    )}>
                        {step.title}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    {isCompleted && (
                        <span className="text-sm text-muted-foreground hidden sm:inline">Edit</span>
                    )}
                    {!isCompleted && (
                        <ChevronDown
                            className={cn(
                                "transition-transform text-muted-foreground",
                                isOpen && "rotate-180"
                            )}
                            size={20}
                        />
                    )}
                </div>
            </button>

            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-border"
                >
                    <div className="p-4">
                        {children}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
