// "use client";

// import { AuthInteractor } from "@/app/interactors";
// import styled from "styled-components";
// import { Button } from "ui/components";
// import { Color, Typography } from "ui/styles";

// export default function SocialPage() {
//   const isLinkedinLinked = typeof window !== 'undefined' ? localStorage.getItem("LINKEDIN_LINK") === "true" : false;

//   const handleAuthorizeClick = async () => {
//     await AuthInteractor.getOTP();
//     typeof window !== 'undefined' ?? localStorage.setItem("LINKEDIN_LINK", "true");
//     const linkedinCookie = localStorage.getItem("LINKEDIN_URL");
//     if (linkedinCookie) {
//       window.open(linkedinCookie, "_blank");
//     } else {
//       console.error("LinkedIn URL not found.");
//     }
//   };

//   const handleDelinkLinkedIn = async () => {
//     await AuthInteractor.getOTP();
//     typeof window !== 'undefined' ?? localStorage.setItem("LINKEDIN_LINK", "false");
//     const linkedinCookie = typeof window !== 'undefined' ? localStorage.getItem("LINKEDIN_URL") : "";
//     if (linkedinCookie) {
//       window.open(linkedinCookie, "_blank");
//     } else {
//       console.error("LinkedIn URL not found.");
//     }
//   };

//   return (
//     <Container>
//       <Card>
//         <Title>LinkedIn</Title>
//         <Column>
//           <Label>Manage account connection</Label>
//           {isLinkedinLinked ? (
//             <Button label="Unlink Linkedin" onClick={() => void handleDelinkLinkedIn()} />
//           ) : (
//             <Button label="Link Linkedin" onClick={() => void handleAuthorizeClick()} />
//           )}
//         </Column>
//       </Card>
//     </Container>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 24px;
// `;

// const Card = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 24px;
//   align-items: center;
//   width: 100%;
//   max-width: 800px;
//   padding: 50px 30px;
//   background: white;
//   border: 10px;
//   border-radius: 5px;
// `;

// const Column = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
//   width: 100%;
// `;

// const Label = styled.span`
//   ${Typography.BODY_3};
//   color: ${Color.NEUTRAL_700};
//   align-self: start;
// `;

// const Title = styled.div`
//   ${Typography.HEADER_2};
//   color: ${Color.NEUTRAL_900};
//   align-self: start;
// `;

export default function SocialPage() {
  return <></>;
}
