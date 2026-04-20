const BODY_COLOR = "white";
const BODY_SIZE  = "clamp(14px,1.1vw,16px)";

export default function PrivacySection() {
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
        <h1 className="font-good-times text-[clamp(28px,5vw,64px)] text-white tracking-wider">
          PRIVACY POLICY
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
            Welcome to The Point (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We respect your privacy and are
            committed to protecting your personal data. This Privacy Policy explains how we collect,
            use, and safeguard your information when you visit our website or use our services,
            including our online booking system and events calendar.
          </p>

          <PolicySection title="1. Age Restriction (Strictly 21+)">
            <p>
              The Point is strictly a 21+ venue. Our website and services are not intended for
              individuals under the age of 21. We do not knowingly collect personal information from
              anyone under 21. If we become aware that we have collected personal data from someone
              under this age, we will take steps to delete that information immediately.
            </p>
          </PolicySection>

          <PolicySection title="2. Information We Collect">
            <p>We may collect the following types of information when you interact with our website:</p>
            <BulletList>
              <li>
                <strong className="text-white">Personal Information:</strong> When you submit an inquiry
                or make a reservation for our private event space, The Treehouse, we may collect your
                name, email address, phone number, event type, and answers to pre-screening questions.
              </li>
              <li>
                <strong className="text-white">Usage Data:</strong> We automatically collect certain
                information when you visit our website, such as your IP address, browser type, device
                type (mobile or desktop), and how you interact with our events calendar and web pages.
              </li>
            </BulletList>
          </PolicySection>

          <PolicySection title="3. How We Use Your Information">
            <p>We use the information we collect for the following purposes:</p>
            <BulletList>
              <li>To process and manage your private space bookings and inquiries for The Treehouse.</li>
              <li>
                To communicate with you regarding your reservations, upcoming events, comedy nights,
                or sports viewing parties.
              </li>
              <li>
                To operate, maintain, and improve our website&apos;s functionality, ensuring it remains
                mobile-responsive and user-friendly.
              </li>
              <li>To prevent fraud, enforce our policies, and comply with legal obligations.</li>
            </BulletList>
          </PolicySection>

          <PolicySection title="4. How We Share Your Information">
            <p>
              We do not sell or rent your personal information to third parties. We may share your
              information with trusted third-party service providers who assist us in operating our
              website, managing our events calendar, or conducting our business, as long as those
              parties agree to keep this information confidential.
            </p>
          </PolicySection>

          <PolicySection title="5. Cookies and Tracking Technologies">
            <p>
              Our website uses cookies to enhance your browsing experience, analyze site traffic, and
              optimize our SEO. You can choose to disable cookies through your browser settings, but
              this may affect your ability to use certain features of our site, such as the booking
              system.
            </p>
          </PolicySection>

          <PolicySection title="6. Data Security">
            <p>
              We implement reasonable security measures to maintain the safety of your personal
              information when you submit a booking or enter your details on our site. However, please
              remember that no method of transmission over the internet or method of electronic storage
              is 100% secure.
            </p>
          </PolicySection>

          <PolicySection title="7. Third-Party Links">
            <p>
              Our website may contain links to third-party sites or social media platforms. We are not
              responsible for the privacy practices or content of these external sites.
            </p>
          </PolicySection>

          <PolicySection title="8. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this
              page with an updated &ldquo;Effective Date.&rdquo;
            </p>
          </PolicySection>

          <PolicySection title="9. Contact Us">
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices,
              please contact us at:
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
