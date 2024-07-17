import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Container,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title className="text-sm font-thin">Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>
        {`Here's`} your verification code: {otp}
      </Preview>
      <Container className="bg-gray-100 p-5 font-roboto">
        <Section className="bg-white p-6 rounded-lg shadow-md">
          <Row>
            <Heading as="h1" className="text-gray-900 text-2xl mb-4">
              Verification Code
            </Heading>
          </Row>
          <Row>
            <Text className="text-gray-900 text-lg mb-2">
              Hello {username},
            </Text>
          </Row>
          <Row>
            <Text className="text-gray-700 text-base mb-4">
              Thank you for registering. Please use the following verification
              code to complete your registration:
            </Text>
          </Row>
          <Row>
            <Text className="text-blue-600 text-xl font-bold mb-4">{otp}</Text>
          </Row>
          <Row>
            <Text className="text-gray-700 text-base">
              If you did not request this code, please ignore this email.
            </Text>
          </Row>
        </Section>
        <Section className="bg-gray-100 p-4 text-center border-t mt-6">
          <Text className="text-gray-700 text-sm">Best regards,</Text>
          <Text className="text-gray-700 text-sm">Replibot</Text>
          <Text className="text-gray-700 text-sm">
            <a href="https://replibot.vercel.app" className="text-orange-600">
              Visit our website
            </a>
          </Text>
        </Section>
      </Container>
    </Html>
  );
}
