import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { CONFIG } from "../../config/config";

// Declare global turnstile
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        turnstile?: any;
    }
}

type Props = {
    open: boolean;
    onClose: () => void;
};

/* -------------------------
   Animations
-------------------------- */

const backdrop: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modal: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 500,
            damping: 28,
        },
    },
};

/* -------------------------
   Styles
-------------------------- */

const inputStyle = `
  w-full
  bg-black text-white
  border-2 border-white
  px-4 py-3
  font-bold
  outline-none
  focus:border-cyan-400
  focus:shadow-[4px_4px_0_0_#22d3ee]
  transition
`;

/* -------------------------
   Component
-------------------------- */

export default function MentorApplyModal({ open, onClose }: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [profileImage, setProfileImage] = useState<string>('');
    const [imageMimeType, setImageMimeType] = useState<string>('');
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const turnstileRef = useRef<HTMLDivElement>(null);
    const turnstileWidgetId = useRef<string | null>(null);

    /* Lock page scroll when open */
    useEffect(() => {
        if (!open) return;

        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = original;
        };
    }, [open]);

    // Initialize Turnstile when modal opens
    useEffect(() => {
        if (open && turnstileRef.current && window.turnstile) {
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

    // Reset Turnstile when modal closes
    useEffect(() => {
        if (!open) {
            setTurnstileToken(null);
            if (window.turnstile && turnstileWidgetId.current) {
                try {
                    window.turnstile.reset(turnstileWidgetId.current);
                } catch (error) {
                    console.error('Error resetting Turnstile:', error);
                }
            }
        }
    }, [open]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setErrorMessage('Image size should be less than 10MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
                setImageMimeType(file.type);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!turnstileToken) {
            setErrorMessage('Please complete CAPTCHA verification');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const formData = new FormData(e.currentTarget);
            const data = {
                formType: 'mentor',
                timestamp: new Date().toISOString(),
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                contactNumber: formData.get('contactNumber') as string,
                whatsappNumber: formData.get('whatsappNumber') as string,
                bio: formData.get('bio') as string,
                previousExperience: formData.get('previousExperience') as string,
                portfolio: formData.get('portfolio') as string,
                currentOccupation: formData.get('currentOccupation') as string,
                company: formData.get('company') as string,
                linkedinUrl: formData.get('linkedinUrl') as string,
                expertise: formData.get('expertise') as string,
                experienceYears: formData.get('experienceYears') as string,
                profileImage: profileImage,
                imageMimeType: imageMimeType
            };

            console.log('📤 Sending mentor application...');

            await fetch(CONFIG.MENTOR_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            console.log('✓ Application sent successfully');
            (e.target as HTMLFormElement).reset();
            setProfileImage('');
            setImageMimeType('');
            if (fileInputRef.current) fileInputRef.current.value = '';
            onClose();
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);

        } catch (error) {
            console.error('✗ Submission error:', error);
            setErrorMessage('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                    className="
            fixed inset-0 z-50
            bg-black/80 backdrop-blur-sm
            grid place-items-center   /* ← important: NOT flex */
            overflow-hidden
            p-4
          "
                >
                    {/* ================= MODAL ================= */}
                    <motion.div
                        variants={modal}
                        onClick={(e) => e.stopPropagation()}
                        className="
              w-full max-w-5xl
              h-[90vh]
              overflow-y-auto
              overscroll-contain
              [-webkit-overflow-scrolling:touch]

              bg-cyan-950
              border-4 border-white
              shadow-[10px_10px_0_0_#fff]
              p-6 sm:p-10
            "
                    >
                        {/* ---------- HEADER ---------- */}
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase">
                                Apply as Mentor
                            </h2>

                            <button
                                onClick={onClose}
                                className="
                  px-3 py-1 border-2 border-white
                  text-white font-bold
                  hover:bg-white hover:text-black
                "
                            >
                                ✕
                            </button>
                        </div>

                        {/* ---------- FORM ---------- */}
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
                            <input 
                                name="name"
                                placeholder="Your Name" 
                                className={inputStyle}
                                required
                                disabled={isSubmitting}
                            />
                            <input
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                className={inputStyle}
                                required
                                disabled={isSubmitting}
                            />

                            <input 
                                name="contactNumber"
                                placeholder="Contact Number" 
                                className={inputStyle}
                                pattern="[0-9]{10}"
                                title="Please enter a 10-digit contact number"
                                required
                                disabled={isSubmitting}
                            />
                            <input
                                name="whatsappNumber"
                                placeholder="WhatsApp Number"
                                className={inputStyle}
                                pattern="[0-9]{10}"
                                title="Please enter a 10-digit WhatsApp number"
                                required
                                disabled={isSubmitting}
                            />

                            {/* Bio */}
                            <textarea
                                name="bio"
                                rows={4}
                                placeholder="Bio — tell us about yourself"
                                className={`${inputStyle} md:col-span-2 resize-none`}
                                required
                                disabled={isSubmitting}
                            />

                            {/* Previous Experience */}
                            <textarea
                                name="previousExperience"
                                rows={4}
                                placeholder="Your Previous Experience"
                                className={`${inputStyle} md:col-span-2 resize-none`}
                                required
                                disabled={isSubmitting}
                            />

                            <input
                                name="portfolio"
                                type="url"
                                placeholder="Your Portfolio"
                                className={inputStyle}
                                required
                                disabled={isSubmitting}
                            />
                            <input
                                name="currentOccupation"
                                placeholder="Current Occupation (E.g- Intern, Working, Student)"
                                className={inputStyle}
                                required
                                disabled={isSubmitting}
                            />

                            <input
                                name="company"
                                placeholder="Company"
                                className={inputStyle}
                                required
                                disabled={isSubmitting}
                            />
                            <input
                                name="linkedinUrl"
                                type="url"
                                placeholder="LinkedIn URL"
                                className={inputStyle}
                                required
                                disabled={isSubmitting}
                            />

                            <input
                                name="expertise"
                                placeholder="Expertise (AI, Web, ML...)"
                                className={inputStyle}
                                required
                                disabled={isSubmitting}
                            />
                            <input
                                name="experienceYears"
                                placeholder="Experience (years)"
                                type="number"
                                min="0"
                                className={inputStyle}
                                required
                                disabled={isSubmitting}
                            />

                            {/* Image */}
                            <div className="md:col-span-2">
                                <label className="block text-white font-bold mb-2">
                                    Profile Image *
                                </label>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                    className="
                    w-full text-white
                    file:mr-4 file:px-4 file:py-2
                    file:border-2 file:border-white
                    file:bg-black file:text-white
                    file:font-bold
                    hover:file:bg-white hover:file:text-black
                  "
                                    disabled={isSubmitting}
                                />
                                {profileImage && (
                                    <p className="mt-2 text-sm text-cyan-300">✓ Image selected</p>
                                )}
                            </div>

                            {/* Error Message */}
                            {errorMessage && (
                                <div className="md:col-span-2 p-4 border-2 border-red-500 bg-red-500/10">
                                    <p className="text-center text-red-400 uppercase tracking-wide text-sm font-bold">
                                        ✗ {errorMessage}
                                    </p>
                                </div>
                            )}

                            {/* Cloudflare Turnstile CAPTCHA */}
                            <div className="md:col-span-2 flex justify-center">
                                <div ref={turnstileRef} className="flex justify-center"></div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting || !turnstileToken}
                                className={`
                  md:col-span-2 mt-4
                  uppercase
                  bg-cyan-300 text-black
                  border-4 border-white
                  font-extrabold py-4
                  shadow-[6px_6px_0_0_#fff]
                  hover:translate-x-1 hover:translate-y-1
                  hover:shadow-none
                  transition
                  flex items-center justify-center gap-3
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                            >
                                {isSubmitting && (
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}

            {/* Toast Notification */}
            {showToast && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: 100 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="fixed bottom-8 right-8 z-9999 bg-black border-4 border-green-500 shadow-[8px_8px_0_0_#22c55e] p-6 min-w-75"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-green-500 border-2 border-white flex items-center justify-center">
                            <span className="text-black text-xl font-bold">✓</span>
                        </div>
                        <div>
                            <p className="text-white font-bold uppercase tracking-wide text-sm">
                                Application Submitted!
                            </p>
                            <p className="text-white/70 text-xs mt-1">
                                We'll review and get back to you
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
