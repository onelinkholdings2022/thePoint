const BODY_COLOR = "white";
const BODY_SIZE = "clamp(14px,1.1vw,16px)";

export default function TermsSection() {
    return (
        <section className="relative w-full bg-main">

            {/* ── Header zone ── */}
            <div
                className="flex flex-col items-center gap-4 text-center"
                style={{
                    paddingTop: "clamp(100px, 12vw, 160px)",
                    paddingBottom: "clamp(48px, 5vw, 72px)",
                    paddingInline: "clamp(20px, 8vw, 100px)",
                }}
            >
                <h1 className="font-good-times text-[clamp(28px,5vw,64px)] uppercase text-white tracking-wider">
                    Terms and Conditions
                </h1>
                <p className="google-sans-flex text-[20px]" style={{ color: "white" }}>
                    Effective Date: January 01, 2026
                </p>
            </div>

            {/* ── Gradient divider ── */}
            <div
                style={{
                    height: "1px",
                    marginInline: "clamp(20px, 8vw, 100px)",
                    background: "linear-gradient(to right, #e3ac77 0%, #d05b3c 50%, #bc0a00 100%)",
                }}
            />

            {/* ── Content zone ── */}
            <div
                style={{
                    paddingTop: "clamp(48px, 5vw, 72px)",
                    paddingBottom: "clamp(80px, 10vw, 140px)",
                    paddingInline: "clamp(20px, 8vw, 100px)",
                }}
            >
                <div style={{ maxWidth: "100rem", marginInline: "auto" }} className="flex flex-col gap-8">

                    <p
                        className="google-sans-flex leading-7"
                        style={{ fontSize: BODY_SIZE, color: BODY_COLOR }}
                    >
                        Welcome to The Point. These Terms and Conditions ("Terms") govern your use of our website (the "Site") and any services, bookings, or inquiries made through it. By accessing or using our Site, you agree to be bound by these Terms. If you do not agree, please do not use our Site.
                    </p>

                    <PolicySection title="1. Age Restriction (Strictly 21+)">
                        <p>
                            The Point is strictly a 21-and-over establishment. By using this Site, inquiring about private events, or visiting our physical location, you represent and warrant that you are at least 21 years of age. Valid, government-issued photo identification is required for entry to the venue. We do not accommodate guests under 21, including children or infants.
                        </p>
                    </PolicySection>

                    <PolicySection title="2. The Treehouse & Private Event Bookings">
                        <p>Our Site provides a booking and inquiry system for our private event space, The Treehouse. By submitting a booking request:</p>
                        <BulletList>
                            <li>
                                <strong className="text-white">Pre-Screening:</strong> All inquiries are subject to review. Submitting a request does not guarantee a reservation until confirmed by our team.
                            </li>
                            <li>
                                <strong className="text-white">Deposits and Payments:</strong> Confirmed private bookings may require a deposit or minimum spend agreement. Details will be provided directly to you upon confirmation.
                            </li>
                            <li>
                                <strong className="text-white">Cancellations:</strong> Cancellation policies for private events will be outlined in your specific booking agreement. [Optional: Insert general cancellation policy, e.g., "Deposits are non-refundable within 7 days of the event."]
                            </li>
                        </BulletList>
                    </PolicySection>

                    <PolicySection title="3. Events Calendar and Promotions">
                        <p>We regularly update our Site with upcoming events, including comedy nights, live entertainment, and sports viewing.</p>
                        <BulletList>
                            <li>Event details, timings, and availability are subject to change without prior notice.</li>
                            <li>
                                Special events may require separate ticketing or cover charges at the door, which will be communicated on the Site or upon entry.
                            </li>
                        </BulletList>
                    </PolicySection>

                    <PolicySection title="4. Menu and Product Disclaimer">
                        <p>
                            The Point offers a premium bar selection, including alcohol and CBD-infused beverages.
                        </p>
                        <BulletList>
                            <li>Menus, pricing, and availability of specific items are subject to change.</li>
                            <li>
                                We encourage all guests to consume responsibly. We reserve the right to refuse service to any individual who appears intoxicated or fails to provide valid age verification.
                            </li>
                        </BulletList>
                    </PolicySection>

                    <PolicySection title="5. Intellectual Property">
                        <p>
                            All content on this Site, including but not limited to logos, text, graphics, event descriptions, and photographs (including interior and exterior venue images), is the property of The Point or its content creators and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or use our content without written permission.
                        </p>
                    </PolicySection>

                    <PolicySection title="6. User Conduct">
                        <p>
                            When using our Site, you agree not to:
                        </p>
                        <BulletList>
                            <li>Submit false, inaccurate, or misleading information through our booking forms.</li>
                            <li>
                                Interfere with the security or functionality of the Site.
                            </li>
                            <li>
                                Use the Site for any unlawful purpose.
                            </li>
                        </BulletList>
                    </PolicySection>

                    <PolicySection title="7. Limitation of Liability">
                        <p>
                            To the fullest extent permitted by law, The Point and its owners, employees, and affiliates shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Site, the booking system, or any errors or omissions in the Site's content.
                        </p>
                    </PolicySection>

                    <PolicySection title="8. Governing Law">
                        <p>
                            These Terms and your use of the Site shall be governed by and construed in accordance with the laws of the State of Washington, without regard to its conflict of law principles. Any legal action or proceeding related to this Site shall be brought exclusively in the state or federal courts located in Washington.
                        </p>
                    </PolicySection>

                    <PolicySection title="9. Changes to These Terms">
                        <p>
                            We reserve the right to update or modify these Terms at any time. Any changes will be effective immediately upon posting to the Site. Your continued use of the Site following the posting of revised Terms means that you accept and agree to the changes.
                        </p>
                    </PolicySection>

                    <PolicySection title="10. Contact Us">
                        <p>
                            If you have any questions or concerns regarding these Terms, please contact us:
                        </p>
                        <BulletList>
                            <li>Phone: (206) 535-7455</li>
                        </BulletList>
                    </PolicySection>

                </div>
            </div>
        </section>
    );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-3">
            <h2
                className="google-sans-flex font-semibold text-white"
                style={{ fontSize: "clamp(16px,1.4vw,20px)" }}
            >
                {title}
            </h2>
            <div
                className="google-sans-flex leading-7 flex flex-col gap-2"
                style={{ fontSize: BODY_SIZE, color: BODY_COLOR }}
            >
                {children}
            </div>
        </div>
    );
}

function BulletList({ children }: { children: React.ReactNode }) {
    return (
        <ul
            style={{
                listStyleType: "disc",
                marginLeft: "1.5rem",
                paddingLeft: "0.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.375rem",
                color: BODY_COLOR,
            }}
        >
            {children}
        </ul>
    );
}
