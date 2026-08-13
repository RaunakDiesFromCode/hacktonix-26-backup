import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { CONFIG } from "../../config/config";
import BrutalButton from "./BrutalButton";

type Props = {
    open: boolean;
    onClose: () => void;
};

const backdrop: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modal: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 500, damping: 32 },
    },
};

const inputClass =
    "w-full bg-black border-2 border-white px-4 py-3 text-white placeholder-white/40 outline-none focus:border-cyan-400 transition disabled:opacity-50";

// Declare global turnstile callbacks
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        turnstile?: any;
        onTurnstileSuccess?: (token: string) => void;
        onTurnstileError?: (error: string) => void;
    }
}

const RegisterModal = ({ open, onClose }: Props) => {

    useEffect(() => {
        if (!open) return;

        const scrollY = window.scrollY;

        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";

            window.scrollTo(0, scrollY);
        };
    }, [open]);


    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const turnstileRef = useRef<HTMLDivElement>(null);
    const turnstileWidgetId = useRef<string | null>(null);

    // Turnstile callbacks
    useEffect(() => {
        window.onTurnstileSuccess = (token: string) => {
            console.log('✓ CAPTCHA verified');
            setTurnstileToken(token);
        };

        window.onTurnstileError = (error: string) => {
            console.error('✗ Turnstile error:', error);
            setTurnstileToken(null);
        };

        return () => {
            window.onTurnstileSuccess = undefined;
            window.onTurnstileError = undefined;
        };
    }, []);

    // Initialize Turnstile when modal opens
    useEffect(() => {
        if (open && turnstileRef.current && window.turnstile) {
            // Small delay to ensure DOM is ready
            const timer = setTimeout(() => {
                if (turnstileRef.current && !turnstileWidgetId.current) {
                    try {
                        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
                            sitekey: CONFIG.CLOUDFLARE_SITE_KEY,
                            theme: 'dark',
                            callback: (token: string) => {
                                console.log('✓ CAPTCHA verified');
                                setTurnstileToken(token);
                            },
                            'error-callback': (error: string) => {
                                console.error('✗ Turnstile error:', error);
                                setTurnstileToken(null);
                            },
                        });
                    } catch (error) {
                        console.error('Error rendering Turnstile:', error);
                    }
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [open]);

    // Reset form when modal closes
    useEffect(() => {
        if (!open) {
            setTurnstileToken(null);
            setIsSubmitting(false);
            setSubmitStatus('idle');
            setErrorMessage('');
            if (window.turnstile && turnstileWidgetId.current) {
                try {
                    window.turnstile.reset(turnstileWidgetId.current);
                } catch (error) {
                    console.error('Error resetting Turnstile:', error);
                }
            }
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!turnstileToken) {
            setSubmitStatus('error');
            setErrorMessage('Please complete CAPTCHA verification');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const formData = new FormData(e.currentTarget);
            const data = {
                timestamp: new Date().toISOString(),
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                turnstileToken: turnstileToken
            };

            console.log('📤 Sending registration data...');
            console.log('Data:', data);
            console.log('To:', CONFIG.GOOGLE_SCRIPT_URL);

            await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            console.log('✓ Request sent successfully');

            // Show success message
            setSubmitStatus('success');

            // Reset form
            (e.target as HTMLFormElement).reset();

            // Close modal immediately
            onClose();

            // Show toast notification
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);

        } catch (error) {
            console.error('✗ Submission error:', error);
            setSubmitStatus('error');
            setErrorMessage('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        variants={backdrop}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={onClose}
                    >
                        <motion.div
                            variants={modal}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            onClick={(e) => e.stopPropagation()}
                            className="
    w-[94%] sm:w-[90%]
    max-w-xl
    bg-black
    border-4 border-white
    shadow-[10px_10px_0_0_#06b6d4]
    p-5 sm:p-8
    text-white
    max-h-[85vh] sm:max-h-[90vh]
    overflow-y-auto
    relative
"
                        >
                            {/* Close X Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border-2 border-white hover:bg-white hover:text-black transition-colors"
                                aria-label="Close"
                            >
                                <span className="text-2xl font-bold leading-none">
                                    ×
                                </span>
                            </button>

                            <h2
                                className="
        text-2xl sm:text-3xl lg:text-4xl
        font-hero uppercase
        mb-4 sm:mb-6
        text-cyan-300
    "
                            >
                                Pre-Register
                            </h2>

                            <form
                                className="space-y-4 sm:space-y-5"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className={inputClass}
                                    required
                                    disabled={isSubmitting}
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className={inputClass}
                                    required
                                    disabled={isSubmitting}
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number (10 digits)"
                                    className={inputClass}
                                    pattern="[0-9]{10}"
                                    required
                                    disabled={isSubmitting}
                                />

                                {/* Cloudflare Turnstile CAPTCHA */}
                                <div className="flex justify-center py-4 overflow-x-hidden">
                                    <div
                                        ref={turnstileRef}
                                        className="cf-turnstile scale-[0.9] sm:scale-100"
                                    />
                                </div>

                                {/* Success Message */}
                                {submitStatus === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 border-2 border-green-500 bg-green-500/10"
                                    >
                                        <p className="text-center text-green-400 uppercase tracking-wide text-sm font-bold">
                                            ✓ Registration Successful!
                                        </p>
                                    </motion.div>
                                )}

                                {/* Error Message */}
                                {submitStatus === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 border-2 border-red-500 bg-red-500/10"
                                    >
                                        <p className="text-center text-red-400 uppercase tracking-wide text-sm font-bold">
                                            ✗{" "}
                                            {errorMessage ||
                                                "Registration Failed"}
                                        </p>
                                    </motion.div>
                                )}

                                <BrutalButton
                                    type="submit"
                                    variant="primary"
                                    disabled={
                                        !turnstileToken ||
                                        isSubmitting ||
                                        submitStatus === "success"
                                    }
                                    className="w-full justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg
                                                className="animate-spin h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Submitting…
                                        </>
                                    ) : submitStatus === "success" ? (
                                        "✓ Registered"
                                    ) : (
                                        "Pre-Register"
                                    )}
                                </BrutalButton>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: 100 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                        }}
                        className="
    fixed
    bottom-4 sm:bottom-8
    right-1/2 sm:right-8
    translate-x-1/2 sm:translate-x-0
    z-9999
    bg-black
    border-4 border-green-500
    shadow-[8px_8px_0_0_#22c55e]
    p-4 sm:p-6
    w-[90%] sm:min-w-75
"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-green-500 border-2 border-white flex items-center justify-center">
                                <span className="text-black text-xl font-bold">
                                    ✓
                                </span>
                            </div>
                            <div>
                                <p className="text-white font-bold uppercase tracking-wide text-sm">
                                    Registration Successful!
                                </p>
                                <p className="text-white/70 text-xs mt-1">
                                    Check your email for confirmation
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default RegisterModal;
