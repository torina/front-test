import { Grid } from "@mui/material";
import React from "react";
import RightBlock from "./rightBlock";
import LeftBlock from "./leftBlock";

const Privacy = () => {

  const [points, setPoints] = React.useState([])
  const [content, setContent] = React.useState([])

  React.useEffect(() => {

    setContent([
      'What personal data we may collect and how we collect your personal data?',
      'The legal ground and purpose of collecting and processing your personal data',
      'How will we process your data?',
      'What are your data protection rights?',
      'What is the period of personal data processing?',
      'How do we share information we collect?',
      'Analytics and other third party services',
      'Our Privacy policy towards children',
      'International data transfers',
      'Privacy policies of other websites',
      'Changes to our Privacy policy',
      'How to contact us'
    ])

    setPoints([
      {
        title: 'WHAT PERSONAL DATA WE MAY COLLECT AND HOW WE COLLECT YOUR PERSONAL DATA? ',
        body: `We collect the following data: \n
        1.   &nbsp;&nbsp;The data You provide us when You register Your user’s account for getting access to our Philanthropy International Platform:
        • Contact details: first name, last name, email address.\n
        2.   &nbsp;&nbsp;The data You provide us when You want to use the services presented at our Philanthropy International Platform:
        • Contact details: first name, last name, email address, phone number, postal address.\n
        providing customer and/or operational support;\n
        • ID data: date of birth, Your tax ID, passport ID/national ID.\n
        Considering the specificity of services presented at our Philanthropy International Platform, we have a legal requirement to collect documents, confirming Your ID. That is why, if You are placing the project which implies the money collection on our Philanthropy International Platform, we’ll ask You to pass Your ID verification. In this case we shall ask You to provide us with the: i) passport (page with photo) or government issued national photo ID (front and back); and ii) bank statement or utility bills- gas, electric, telephone with your name and address (documents cannot be more than 3 months old).\n
        • bank account details/payment details.\n
        3.   &nbsp;&nbsp;The data you provide us voluntary when you contact us by phone and/or email and/or chat.\n
        4.   &nbsp;&nbsp;Automatically collected data: IP address; device type; cookies; operating system type; operating system version; links You click and other behavioral data with regard to your use of our Philanthropy International Platform. We may use third-party services that collect, monitor and analyze this type of information in order to increase the functionality of our Philanthropy International Platform. 
        `
      },
      {
        title: `THE LEGAL GROUND AND PURPOSE OF COLLECTING AND PROCESSING YOUR PERSONAL DATA`,
        body: `We process your personal data on a lawful basis pursuant to the following legal grounds:\n
        a) <u>Legitimate interests:</u>
        - contact details are required for: processing Your requests; confirming Your identity; communication with You;
        - ID data are required to establish, exercise or defense of legal claims, whether in court proceedings, civil, labor or administrative cases (if the case may be);
        - automatically collected data is necessary to identify the interoperability of our Philanthropy International Platform with your mobile device or computer and system administration.
        - data about links you click and other behavioral data with regard to your usage of our Website is necessary for: improving the quality of our services; marketing, research and analytical purposes to make our Philanthropy International Platform user-friendly; understanding the relevance of our Philanthropy International Platform functionality and your need in respect to our services.\n
        b) <u>Legal obligation:</u>
        - ID data, including the documents confirming Your ID, are required to comply with our obligation to conduct KYC and KYB procedure, which is an essential stage for ensuring financial security of our Philanthropy International Platform, as well as its users and customers; protection against fraud and scams; record keeping; \n
        c) <u>Entering into a contract and its further execution:</u>
        - contact details, ID data and payment details are required to create and maintain Your user’s account; to provide customer and/or operational support; contact with You.\n
        d) <u>Consent:</u>
        We process the following personal data based on your consent as follows:
        - contact details, such as name, phone number and email address may be used for direct marketing, including, offering relevant products/services. We occasionally also send out newsletters to our subscribers. You can withdraw your consent request by clicking the “Unsubscribe” link in our emails or by contacting us at <a href="mailto:info@philanthropy.international?subject=Ask a question">info@philanthropy.international</a>
        `
      },
      {
        title: `HOW WILL WE PROCESS YOUR DATA?`,
        body: `We may process your personal data by way of collection, storing, recording, structuring and using it according to the purpose for which the personal data was collected. We have implemented and continue to maintain appropriate technical and organisational measures in order to protect against the loss, misuse and alteration of the personal data, and also to prevent personal data from being accessed by unauthorised persons. All your personal data is stored on secure servers. Our employees and contractors are trained on and are aware of their responsibility to maintain your privacy. We shall not sell your personally identifiable data to any third parties for their own direct marketing use. 
        We will take appropriate technical and organisational security measures against the accidental loss, destruction, damage and/or the unauthorised or unlawful use of your personal information. These will include ensuring that any service provider provides sufficient security guarantees in relation to any data processing it undertakes on our behalf.
        `
      },
      {
        title: `WHAT ARE YOUR DATA PROTECTION RIGHTS?`,
        body: `We would like to make sure that you are fully aware of all of your data protection rights. Every user is entitled to the following:

        <u>The right to access</u> – You have the right to request us for copies of your personal data. We will not charge for this service.
        
        <u>The right to rectification</u> – You have the right to request us for correction any information you believe is inaccurate. You also have the right to request us to complete the information you believe is incomplete.
        
        <u>The right to erasure</u> – You have the right to request us to erase your personal data, under certain conditions. You may exercise the right to request the erasure of your personal data if:
        &nbsp;&nbsp;&nbsp;•	the personal data is no longer necessary for the purposes which we originally collected or processed it for;
        &nbsp;&nbsp;&nbsp;•	your personal data were provided by third parties without your knowledge and consent;
        &nbsp;&nbsp;&nbsp;•	there is no overriding legitimate interest to continue the processing of your personal data;
        &nbsp;&nbsp;&nbsp;•	your personal data is used only for direct marketing purposes, and you object to such processing;
        &nbsp;&nbsp;&nbsp;•	 it is necessary to comply with a legal request or legal obligation.
        
        <u>The right to restrict processing</u> – You have the right to request us to restrict the processing of your personal data, under certain conditions.
        
        <u>The right to object to processing</u> – You have the right to object to the processing of your personal data, under certain conditions. You may request to cease processing of your personal data if:
        &nbsp;&nbsp;&nbsp; •	there is no overriding legitimate interest to continue the processing of your personal data;
        &nbsp;&nbsp;&nbsp; •	your personal data is used only for direct marketing purposes and you object to such processing;
        &nbsp;&nbsp;&nbsp; •	it’s necessary to comply with a legal request or legal obligation.

        <u>The right to data portability</u> – You have the right to request us to transfer the data that we have collected to another organization, or directly to you. You can make a portability request at any time regarding data that:
        &nbsp;&nbsp;&nbsp; •	was collected based on your consent to use your personal data, or
        &nbsp;&nbsp;&nbsp; •	was collected as part of a contract you have with us.

        <u>The right Not to be subject to a decision based solely on automated processing</u> – You have the right to be free from decisions based solely on automated processing of your personal data, including profiling, that affects you.
         
        If you would like to exercise any of these rights, please contact our Data Protection Officer at email:  <a href="mailto:info@philanthropy.international?subject=Ask a question">info@philanthropy.international</a>. We shall respond without delay. However, in case of a complicated request from you, we shall respond within one month of receipt of the request.
        Should you wish to report a complaint or if you feel that we have not addressed your concern in a satisfactory manner, you may contact the Information Commissioner’s Office via their website <a href='https://ico.org.uk/make-a-complaint/'>https://ico.org.uk/make-a-complaint/</a>
        `
      },
      {
        title: `WHAT IS THE PERIOD OF PERSONAL DATA PROCESSING?`,
        body: `Processing of your personal data is carried out for the limited period until:
        &nbsp;&nbsp;&nbsp;•	the personal data is no longer necessary in relation to the purposes for which it was collected or otherwise processed;
        &nbsp;&nbsp;&nbsp;•	receiving your request concerning erasure of your personal data, if applicable.
        `
      },
      {
        title: `HOW DO WE SHARE INFORMATION WE COLLECT?`,
        body: `In view of the provisions of current legislation, we may share your personal data with the following third parties:
        &nbsp;&nbsp;&nbsp;•	to our employees and contractors responsible for the maintenance of our Philanthropy International Platform and customer relations;
        &nbsp;&nbsp;&nbsp;•	to the corresponding service providers where applicable in order to assist us with the services that you have requested from us, as well as to meet our commitments arising from our relations with you and relating to the usage of our Philanthropy International Platform. In this case they are obliged to provide you with an adequate level of personal data protection;
        &nbsp;&nbsp;&nbsp;•	to the persons designated by you as authorised to give instructions on your behalf;
        &nbsp;&nbsp;&nbsp;•	to the relevant government regulators, public authorities, judicial bodies or law enforcement agencies to meet legal requirements, including complying with court orders, valid discovery requests etc. or to comply with any laws, rules, guidelines and regulations imposed by any governmental authority;
        &nbsp;&nbsp;&nbsp;•	 to the corresponding law enforcement agencies in order to investigate, eliminate and/or prevent offences;
        &nbsp;&nbsp;&nbsp;•	to our affiliates, successors and those assigned on the basis of legitimate interests in the course of our normal business activities. We shall take all the steps reasonably necessary to ensure that relevant appropriate safeguards were taken for treating your personal data securely. We will inform you of this in advance and ensure that your personal information is secure.
        `
      },
      {
        title: `THIRD PARTY SERVICES`,
        body: `Our Website is hosted on Wix, operated by Wix.com Ltd.(40 Namal Tel Aviv St., Tel Aviv 6350671, Israel) . They provide us with the online platform services that allows us to develop a website. To familiarize yourself with the WIX privacy policy use the link https://www.wix.com/about/privacy.`
      },
      {
        title: `OUR PRIVACY POLICY TOWARDS CHILDREN`,
        body: `We do not knowingly collect personal information from natural persons under 18. If we become aware that a natural person under 18 has provided us with personal information, we will take steps to delete such information. If you become aware that such a person has provided us with personal information, please contact us promptly.`
      },
      {
        title: `INTERNATIONAL DATA TRANSFERS`,
        body: `Our company is located in the UK. However, we sometimes use third parties located in other countries to provide support services. As a result, your personal information may be processed in countries outside the European Economic Area (EEA) and EU. Whenever we transfer your personal data out of the EU and EEA, we ensure a similar degree of protection is afforded to it, in particular: by transferring the data to countries that have been deemed to provide an adequate level of protection for personal data by the European Commission; or by using Standard Contractual Clauses before transferring any data.`

      },
      {
        title: `PRIVACY POLICIES OF OTHER WEBSITES`,
        body: `The Philanthropy International Platform contains links to other websites of services providers represented on Philanthropy International Platform. Our Privacy policy applies only to our Philanthropy International Platform, so if you click on a link to another website, you should read their privacy policy.`
      },
      {
        title: `CHANGES TO OUR PRIVACY POLICY`,
        body: `We are keeping our Privacy policy under regular review and places any updates on this web page. We will inform you in advance of any changes and their effective date, by posting the relevant notification on our website.`
      },
      {
        title: `HOW TO CONTACT US?`,
        body: `If you have any questions about our Privacy policy, the data we hold on you, or you would like to exercise one of your data protection rights, please do not hesitate to contact us.
        Email us at: <a href="mailto:info@philanthropy.international?subject=Ask a question">info@philanthropy.international</a>.
        You can contact us: by post, to the postal address of our principal place of business: 7 Bell Yard, London, United Kingdom, WC2A 2JR.
        `
      }
    ])
  }, [])



  React.useEffect(() => {
    document.title = `Privacy | Philanthropy International`;
  }, [])



  return (
    <Grid container justifyContent='center'>
      {/* <LeftBlock /> */}
      <RightBlock points={points} content={content} />
    </Grid>
  );
};

export default Privacy;
