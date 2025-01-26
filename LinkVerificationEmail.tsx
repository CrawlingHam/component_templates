import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text } from "@react-email/components";
export default function VerificationEmail({ verificationLink }: { verificationLink: string }) {
    return (
        <Html>
            <Head />
            <Preview>FlixBurst Email Verification</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={coverSection}>
                        <Section style={imageSection}>
                            <Img src="https://i.imgur.com/29NTNFC.png" width="160" height="85" alt="FlixBurst Logo" />
                        </Section>
                        <Section style={upperSection}>
                            <Heading style={h1}>Verify your email address</Heading>
                            <Text style={mainText}>
                                Thanks for starting the new FlixBurst account creation process. We want to make sure it's really you. Please click the
                                verification link below to confirm your email address. If you don't want to create an account, you can ignore this
                                message.
                            </Text>
                            <Section style={verificationSection}>
                                <Link href={verificationLink} style={verificationLinkStyling}>
                                    Verify Email Address
                                </Link>
                                <Text style={validityText}>(This link is valid for 10 minutes)</Text>
                            </Section>
                            <Text style={text}>If you didn't request this email, there's nothing to worry about, you can safely ignore it.</Text>
                        </Section>
                        <Hr />
                        <Section style={lowerSection}>
                            <Text style={cautionText}>
                                FlixBurst will never email you and ask you to disclose or verify your password, credit card, or banking account
                                number.
                            </Text>
                        </Section>
                    </Section>
                    <Text style={footerText}>
                        This message was produced and distributed by FlixBurst Web Services, Inc. © {new Date().getFullYear()}, FlixBurst Web
                        Services, Inc.. All rights reserved. FlixBurst is a registered trademark of{" "}
                        <Link href="https://amazon.com" target="_blank" style={link}>
                            Amazon.com
                        </Link>
                        , Inc. View our{" "}
                        <Link href="https://amazon.com" target="_blank" style={link}>
                            privacy policy
                        </Link>
                        .
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}
const main = {
    backgroundColor: "#fff",
    color: "#212121",
};

const container = {
    padding: "20px",
    margin: "0 auto",
    backgroundColor: "#eee",
};

const h1 = {
    color: "#333",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
};

const link = {
    color: "#2754C5",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    textDecoration: "underline",
};

const text = {
    color: "#333",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0",
};

const imageSection = {
    backgroundColor: "#ffffff",
    display: "flex",
    padding: "20px 0",
    alignItems: "center",
    justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
    ...text,
    fontSize: "12px",
    padding: "0 20px",
};

const verifyText = {
    ...text,
    margin: 0,
    fontWeight: "bold",
    textAlign: "center" as const,
};

const codeText = {
    ...text,
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: "bold",
    fontSize: "36px",
    margin: "10px 0",
    textAlign: "center" as const,
};

const verificationLinkStyling = {
    display: "inline-block",
    backgroundColor: "#0070f3",
    color: "#ffffff",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    marginBottom: "10px",
};

const validityText = {
    ...text,
    margin: "0px",
    textAlign: "center" as const,
};

const verificationSection = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
