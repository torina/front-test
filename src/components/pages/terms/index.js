import { Grid } from "@mui/material";
import React from "react";
import RightBlock from "./rightBlock";
import LeftBlock from "./leftBlock";

const Terms = () => {

  const content = [
    'Definitions',
    'Acknowledgment',
    'Use of the Platform?',
    '3.1. User Account',
    '3.2. Charitable/non-profitable organization',
    '3.3 Sponsor',
    '3.4 Volunteer',
    'Content',
    'Restrictions and Prohibit Conducts',
    'Deleting Your Account',
    'Intellectual Property',
    'Other Websites',
    'Our Rights',
    'General Disclaimers',
    'Limitation of Liability',
    'Indemnification',
    'Changes to These Terms and Conditions',
    'Dispute Resolution and Governing Law ',
    'Contact'
  ]

  const table = [
    {
      title:'Account',
      text:'unique account created by You to access Our Platform or parts of Our Platform'
    },
    {
      title:'Charitable/non-profitable organization',
      text:'legal entity that becomes a User of the Platform and aims to find financial or other support for its Project, with the regard to these Terms and Conditions (also referred to as “Charity”)'
    },
    {
      title:'Company',
      text:'ATLAS INITIATIVE CIC (referred to as either “Company”, “We”, “Us”, “Our” in these Terms) that is the administrator and the owner of this Platform'
    },
    {
      title:'Content',
      text:'materials such as text, images, videoclips, dashboards, data or other information that can be posted, uploaded, linked to or otherwise made available, regardless of the form of that Content'
    },
    {
      title:'Donation',
      text:'money, virtual currency or other means of payment sent to support the Project of Charitable/non-profitable organization'
    },
    {
      title:'Know Your Business',
      text:'Company\'s regulatory obligation to verify the identity of business Users (also referred to as “KYB”)'
    },
    {
      title:'Know Your Customer',
      text:'Company\'s regulatory obligation to combat financial crime by verifying the identity of individual Users (also referred to as “KYC”)'
    },
    {
      title:'Platform',
      text:`this Platform that can be accessed by the link: <a href='https://platform.philanthropy.international/'>https://platform.philanthropy.international/</a>`
    },
    {
      title:'Project',
      text:'Project of Charitable/non-profitable organization that is looking for support within this Platform'
    },
    {
      title:'Services',
      text:'all informative services and tools provided by the Platform'
    },
    {
      title:'Software',
      text:'technology and software, which is a sole property of the Company, underlying the Platform or distributed by Us in connection therewith'
    },
    {
      title:'Sponsor',
      text:'individual or legal entity represented by the individual that acts and operates User Account on behalf of such legal entity, and aims to find relevant Charitable Projects to support financially, with the regard to these Terms and Conditions'
    },
    {
      title:'Terms and Conditions',
      text:'legal document that forms the entire agreement between You and the Company regarding the use of the Platform (also referred to as “Terms”)'
    },
    {
      title:'User',
      text:'individual who uses and operates this Platform as a Sponsor, or a Volunteer, or on behalf of a Charitable/non-profitable organization, which constitute three types of Users'
    },
    {
      title:'User Content',
      text:'any material, information, or data that You submit, upload, or otherwise make available on the Platform'
    },
    {
      title:'Volunteer',
      text:'individual that becomes a User of the Platform and aims to support Charitable Projects by contributing their time, skills etc., with regard to these Terms and Conditions  '
    },
    {
      title:'You',
      text:'individual accessing or using the Platform, or the legal entity, Charitable or non-profitable organization on behalf of which authorised individual is accessing or using the Platform, as applicable (also referred to as “User”) '
    },
  ]

  const points = [
    {
      title: "Definitions",
      body: ``,
    },
    {
      title: `Acknowledgment`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;These are the Terms and Conditions governing the use of this Platform and the agreement that operates between You and Us. These Terms and Conditions set out the rights and obligations of all Users regarding the use of the Platform. Your access to and use of the Platform is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all Users of the Platform, namely Sponsors, Charitable and non-profitable organizations, Volunteers. By accessing or using the Platform You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Platform.\n
      &nbsp;&nbsp;&nbsp;&nbsp;You confirm that You are over the age of 18. ATLAS INITIATIVE CIC does not permit those under 18 to use the Platform. Your access to and use of the Platform is also conditioned on Your acceptance of and compliance with the Privacy Policy. It describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Platform and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Platform. This Privacy Policy can be accessed by the link  <a href='https://platform.philanthropy.international/terms'>https://platform.philanthropy.international/terms/</a>.
      `,
    },
    {
      title: `Use of the Platform?`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;We may process your personal data by way of collection, storing, recording, structuring and using it according to the purpose for which the personal data was collected. We have implemented and continue to maintain appropriate technical and organizational measures in order to protect against the loss, misuse and alteration of the personal data, and also to prevent personal data from being accessed by unauthorised persons. All your personal data is stored on secure servers. Our employees and contractors are trained on and are aware of their responsibility to maintain your privacy. We shall not sell your personally identifiable data to any third parties for their own direct marketing use. \n
      &nbsp;&nbsp;&nbsp;&nbsp;We will take appropriate technical and organizational security measures against the accidental loss, destruction, damage and/or the unauthorised or unlawful use of your personal information. These will include ensuring that any service provider provides sufficient security guarantees in relation to any data processing it undertakes on our behalf.
      `,
    },
    {
      title: `3.1 User Accounts`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;There are three types of User Accounts on the Platform: Charitable/non-profitable organization; Sponsor; Volunteer. When You create an Account on the Platform, You must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in the immediate termination of Your Account on Our Platform. \n
      &nbsp;&nbsp;&nbsp;&nbsp;You are responsible for safeguarding the password that You use to access the Platform and for any activities or actions under Your password. Any usage and/or activity within the Platform accessed and proceeding from Your Account would be considered as an activity made by You individually. You agree not to disclose Your password to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorised use of Your Account. You may not use as a username the name of another person or entity or that is not lawfully permitted for use, a name or trademark that is subject to any rights of another person or entity other than You without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene. \n
      &nbsp;&nbsp;&nbsp;&nbsp;Subject to the entirety of these Terms, We grant to You a limited, non-exclusive, non-transferable, non-sublicensable, revocable permit to access/use certain parts of the Platform and Platform tools/services. You shall not attempt any access to/use of any part of the Platform or Platform tools/services beyond that/those clearly and unequivocally authorised and intended by Us.
      `,
    },
    {
      title: `3.2. Charitable/non-profitable organization`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;As a Charitable or non-profitable organization, You can place a charitable Project on the Platform to find support. It is Your responsibility to add the Project's title, sector, description and deadline. In order to receive the best result, You have to clarify the support that You’re expecting to find on the Platform. It can be either Donations from the Sponsors, volunteering, or both. You need to provide the requirements for the best supporter for Your Project. \n
      &nbsp;&nbsp;&nbsp;&nbsp;If You need financial support, You will receive notifications about new Donations. The Platform provides You with the possibility to chat with any User on the Platform. Throughout the process, You owe Your Sponsors a high standard of effort, honest communication, and dedication to complete the aim of the Project. In order to monitor the results You have to add proof of appropriate use of resources in the section “Results” on the Platform not later than 1 day after receiving the funds. \n
      &nbsp;&nbsp;&nbsp;&nbsp;You are solely responsible for compliance with all applicable laws in relation to Your use of the Platform and activity of Your Charitable/non-profitable organization. You are further solely responsible for all User Content that You upload, post, publish, display, transmit or otherwise use. You are also responsible for ensuring the funds raised are used for the purpose outlined in the Project uploading the receipts or other confirmations that You got the Donations and used them in a proper way. When You use the Platform, You release ATLAS INITIATIVE CIC as the administrator of this Platform from any claims, damages, and demands of every kind — known or unknown, suspected or unsuspected, disclosed or undisclosed, direct or indirect — arising out of or in any way related to any disputes. Disputes should be resolved by the Users themselves. \n
      &nbsp;&nbsp;&nbsp;&nbsp;<b>Failure to complete the Project.</b> There may be changes or delays, and there’s a chance something could happen that prevents You from being able to finish the Project as promised. If You are unable to complete their Project, You have failed to meet the basic obligations of an agreement. You must make every reasonable effort to find another way of bringing the Project to the best possible conclusion for Sponsors. If this happened, You should:
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	send an update that explains what work has been done, how funds were used, and what prevents Your organization from finishing the Project as planned;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	provide evidence that You have been making all efforts to bring the Project to the best possible conclusion within the discussed time period using resources appropriately;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	offer to return any remaining funds to Sponsors or else explain how those funds will be used to complete the Project in some alternate form; \n
      &nbsp;&nbsp;&nbsp;&nbsp;If You are unable to satisfy the Terms, You may be subject to legal action by Sponsors. It is Your responsibility to provide the receipt and confirmation of the use of Donations to the Sponsors. We might include payment processing features to the Platform or using third parties for processing Sponsors payments, but in any case it’s a Charitable or non-profitable organization's sole responsibility to complete the posted project. \n
      &nbsp;&nbsp;&nbsp;&nbsp;<b>Taxes.</b> It is Your responsibility to determine what, if any, taxes apply to the Donations You receive through Your use of the Platform. It is solely Your responsibility to assess, collect, report or remit the correct tax, if any, to the appropriate tax authority. \n
      &nbsp;&nbsp;&nbsp;&nbsp;<b>Registration.</b> In order to register on the Platform as a Charitable/non-profitable organization, you should complete the following steps:
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.	Create Your login and password in accordance with the provisions of these Terms and Conditions
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.	Confirm Your email address
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.	Fill in KYB adding the legal name of Your organization, short description, website, date and place of incorporation, Your contact information, etc. Please be aware that all data about Your Charitable/non-profitable organization should coincide with the data from its official registration
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.	Add Your banking requisites
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.	Add Projects and type of needed support (volunteering, Donations, or both) 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.	Add Project deadline
      `,
    },
    {
      title: `3.3. Sponsor`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;As a Sponsor, You may place proposals of charitable grants and/or join promising charitable Projects. In order to find the Project to support financially, You may review a number of Projects offered by the Charitable/non-profitable organizations on the Platform and choose the Projects that meet Your individual and/or corporate social responsibility goals. You may find all the necessary information about the Charity and the Project, including its title, sector, description, deadline, and resources needed. You may all the time extend the network of partnering Charities as You are not limited by any number of Projects You can support. The Platform provides You with the possibility to chat with any User on the Platform. You can receive notifications about new Projects added by Charitable/non-profitable organizations. You can track all statuses and Projects on Your personal dashboard on the Platform. \n
      &nbsp;&nbsp;&nbsp;&nbsp;In order to contribute to a Project of any Charitable/non-profitable organization, You will be required to provide Us information regarding Your credit card or another payment instrument that is linked to Your account. You, as a Sponsor, represent and warrant to Us that such information is true, current and accurate and that You are authorised to use the applicable payment instrument. \n
      &nbsp;&nbsp;&nbsp;&nbsp;When You use the Platform, You release ATLAS INITIATIVE CIC as the administrator of this Platform from any claims, damages, and demands of every kind — known or unknown, suspected or unsuspected, disclosed or undisclosed, direct or indirect — arising out of or in any way related to any disputes. Disputes should be resolved by the Users themselves. \n
      &nbsp;&nbsp;&nbsp;&nbsp;<b>Donations.</b> All Donations are at Your own risk. When You make a Donation, it is Your responsibility to understand how Your Donation will be used, all Donations are directly sent to Charities. We are not responsible for any offers or promises, made or offered by Charitable/non-profitable organizations. We do not and cannot verify the information that Users supply, nor do We represent or guarantee that the Donations will be used in accordance with any purpose prescribed by a Charitable/non-profitable organization in accordance with applicable laws. Such responsibility lies on the Users themselves. Notwithstanding the foregoing, We take possible fraudulent activity and the misuse of funds raised very seriously. If You have reason to believe that Charity is not raising or using the Donations for their stated purpose, please alert Our team of this potential issue via email <a href="mailto:info@philanthropy.international?subject=Ask a question">info@philanthropy.international</a>.
      &nbsp;&nbsp;&nbsp;&nbsp;We might act as a payment processor using third parties or without such usage. In that case We might use controls and verifications of the Charitable/non-profitable organization in the case of payment processing, We might reduce risks by processing payments stage by stage, but in any case We can’t be liable for Charitable/non-profitable organization’s projects and usage of the funds. \n
      &nbsp;&nbsp;&nbsp;&nbsp;<b>Taxes.</b> It is Your responsibility to consult a tax advisor as to the amount of Your Donation that is tax deductible or eligible for tax recognition, having regard to (among other things) the tax status of the recipient of any Donation in any relevant jurisdiction. We make no representation as to whether all or any portion of Your Donations, including, if any, transaction fees, are tax deductible or eligible for tax credits. We will have no liability for any claim by any tax authority with respect to the characterisation on any applicable tax return of any Donation by You, or any Charitable/non-profitable organization. \n
      &nbsp;&nbsp;&nbsp;&nbsp;<b>Personal information.</b> Unless You opt out of the disclosure by writing a notice about such disclosure to Our official email provided in Section 15 of these Terms, You acknowledge and agree that certain of Your personal information will be shared with the Charitable/non-profitable organization to the Project of which You make a Donation. We are not responsible, and shall not be liable, for any Charity’s use of Your information. \n
      &nbsp;&nbsp;&nbsp;&nbsp;<b>Registration.</b> In order to register on the Platform as a Sponsor you should complete the following steps:
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.	Create Your login and password in accordance with the provisions of these Terms and Conditions.
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.	Confirm Your email address
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.	Fill in KYB/KYC in order to donate.
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.	Add information about Your Payment Instrument. \n
      &nbsp;&nbsp;&nbsp;&nbsp;<b>SITR.</b> Sponsors of c projects in the United Kingdom might qualify for special tax relief. UK Social Investment Tax Relief (SITR) program provides tax relief for individuals and organizations that invest in eligible social enterprises. To be eligible for SITR, a social enterprise must meet certain criteria, including being a community interest company, a charity, or a community benefit society. ATLAS INITIATIVE CIC, which is the operator of Philanthropy Platform, is a community interest company. The enterprise must use the investment to further its social or environmental mission, and must not be primarily involved in property development, financial services, or certain other excluded activities. \n
      &nbsp;&nbsp;&nbsp;&nbsp;Individuals investing through SITR may benefit from a range of tax reliefs, including 30% Income Tax relief on the value of their investment. Investment can be made in the form of equity or debt. \n
      <b>Individual investors</b>
      &nbsp;&nbsp;&nbsp;&nbsp;•	must not invest as part of a tax avoidance scheme;
      &nbsp;&nbsp;&nbsp;&nbsp;•	must not own more than 30% or have a material interest in the social enterprise or charity;
      &nbsp;&nbsp;&nbsp;&nbsp;•	must not become an employee, trustee or director of the social enterprise or charity; \n
      <b>Kinds of investment</b>
      There are two main kinds of investment an investor can make:
      &nbsp;&nbsp;&nbsp;&nbsp;•	Loan
      &nbsp;&nbsp;&nbsp;&nbsp;•	Shares \n
      <b>Amount</b>
      The maximum amount an individual can invest using SITR is £1m. There is no minimum amount. \n
      <b>How long is the investment for?</b>
      &nbsp;&nbsp;&nbsp;&nbsp;•	The investment must be held for a minimum of three years.
      &nbsp;&nbsp;&nbsp;&nbsp;•	SITR applies immediately from the point of the investment.  \n
      (PLEASE NOTE:THIS SITR SECTION IS FOR INFORMATIVE PURPOSES ONLY, IT IS NOT AND SHOULD NOT BE TREATED AS A LEGAL ADVICE, PLEASE CONSULT YOUR ATTORNEY FIRST)
      `,
    },
    {
      title: `3.4. Volunteer`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;As a Volunteer, You may provide Project-based support. If You want to contribute Your time, skills or any other kind of support, You may search for the Projects You are interested in. You may find all the necessary information on the Platform about the Charity and the Project, including its title, sector, description, deadline, and support needed. You can communicate with the Charitable/non-profitable organizations directly. You can track all statuses and Projects on Your personal dashboard on the Platform. \n
      &nbsp;&nbsp;&nbsp;&nbsp;You acknowledge that You support the Charity on an unpaid basis in order to benefit their Project. You confirm that You are aware of the charitable nature of this Platform and the Projects posted on it. You agree not to use the Platform for any other purpose apart from volunteering. You are solely responsible for Your choice of the Projects You decide to support and Your ability to meet the expectations of the Charity. We don’t become involved in disputes between Users. Users are solely responsible for the User Content and/or Projects posted on the Platform. You agree to indemnify and hold harmless the Platform from any claims, damages, or expenses arising from the User's submission of Content to the Platform. We are not liable for any damages or losses related to Your use of the Platform. When You use the Platform, You release ATLAS INITIATIVE CIC as the administrator of this Platform from any claims, damages, and demands of every kind — known or unknown, suspected or unsuspected, disclosed or undisclosed, direct or indirect — arising out of or in any way related to any disputes. Disputes should be resolved by the Users themselves. \n
      &nbsp;&nbsp;&nbsp;&nbsp;<b>Registration.</b> In order to register on the Platform as a Volunteer you should complete the following steps:
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.	Create Your login and password in accordance with the provisions of these Terms and Conditions.
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.	Confirm Your email address
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.	Fill in KYB/KYC in order to donate.
      `,
    },
    {
      title: `Content`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;<b>Content Publicity.</b> Some of Your activity on and through the Platform is public, such as User Content You post publicly on the Platform (including descriptions, texts, information, data, photos, videos, trademarks, logos, or other materials You upload or post through the Platform or share with other Users). Additionally, User profile information You enter in connection with Your User profile may be displayed to other Users to facilitate User interaction within the Platform. \n
      &nbsp;&nbsp;&nbsp;&nbsp;User Content refers to any material, information, or data that You submit, upload, or otherwise make available on the Platform. Such User Content may include information about the Charitable/non-profitable organizations and their Projects; Sponsors; Volunteers; Projects updates, etc. The Platform is not responsible for the User Content. You expressly understand and agree that You are solely responsible for the User Content and for all activity that occurs under Your account, whether done so by You or any third person using Your account. You agree that any User Content You submit will not infringe on any third party's intellectual property rights or rights of privacy or publicity. \n
      &nbsp;&nbsp;&nbsp;&nbsp;You grant the Platform a non-exclusive, worldwide licence to use, reproduce, display User Content You submit. The Platform is not responsible for any errors or omissions in User Content or for any damages or losses caused by the use of such User Content. The Platform reserves the right to remove or edit any User Content if it deems to be in violation of these Terms or for any other reason. You agree to indemnify and hold harmless the Platform from any claims, damages, or expenses arising from the User's submission of content to the platform. You should not post any User Content that is illegal, offensive, or harmful and should be aware of the regulating laws. Please see more restrictions below in these Terms. \n 
      &nbsp;&nbsp;&nbsp;&nbsp;<b>Chatting rules.</b> You should be aware that You are responsible for the content You submit and any legal action arising from it. We do not tolerate:
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	hateful or harassing behaviour or conduct that encourages or incites hate or harassment in any way;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	stalking or threatening the Users;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	bullying;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	sexism;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	racisme;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	ageism;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	ethnic, sexual, religious, disability, or transphobic slurs;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	other hate-based chat;
      Any of these and other actions may result in a suspension of Your Account.
      `,
    },
    {
      title: `Restrictions and Prohibit Conducts`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;The following are examples of the Content and/or use that is illegal or prohibited by the Platform. This list is not exhaustive and We reserve the right to remove any Project and/or investigate any User who, in Our sole discretion, violates any of the Terms or spirit of these Terms, or other policies. We further reserve the right, without limitation, to ban or disable Your use of the Platform, remove the offending Content, suspend or terminate Your account, freeze or place a hold on Donations, and report You to law enforcement authorities or otherwise take appropriate legal action.  \n
      &nbsp;&nbsp;&nbsp;&nbsp;Without limiting the foregoing, You agree and represent, warrant and covenant:
      A. not to use the Platform to raise funds or establish or contribute to any Project with the implicit or explicit purpose of promoting or involving:      
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	the violation of any law, regulation, industry requirement, or third-party guidelines or agreements by which You are bound;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	Projects that are fraudulent, misleading, inaccurate, dishonest or impossible;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	offensive, graphic, perverse or sensitive or sexual Content;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	the funding of a ransom, human trafficking or exploitation, vigilantism, bribes or bounty;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	drugs, narcotics, steroids, controlled substances pharmaceuticals or similar products or therapies that are either illegal, prohibited, or enjoined by an applicable regulatory body; legal substances that provide the same effect as an illegal drug; or other products, medical practices or any related equipment or paraphernalia that have been found by an applicable regulatory body to cause consumer harm;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	activities with, in, or involving countries, regions, governments, persons, or entities that are subject to UK and other economic sanctions under applicable law, unless such activities are expressly authorised by the appropriate governmental authority;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	knives, explosives, ammunition, firearms, or other weaponry or accessories;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	Content that reflects, incites or promotes behaviour that We deem, in Our sole discretion, to be an abuse of power or in support of terrorism, hate, violence, harassment, bullying, discrimination, terrorist financing or intolerance of any kind or reflects an abuse of power relating to race, ethnicity, national origin, religious affiliation, sexual orientation, sex, gender, gender identity, gender expression, disabilities or diseases;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	the legal defence of alleged financial and violent crimes;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	publication of Content (such as mug shots) that causes reputational harm;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	gambling, gaming and/or any other activity with an entry fee and a prize including, but not limited to raffles, casino games, sports betting, fantasy sports, horse or greyhound racing, lottery tickets, raffle tickets, auctions and other ventures that facilitate gambling, games of skill or chance (whether or not it is legally defined as a lottery);
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	the aggregation of Donations owed to third parties, factoring, or other activities intended to obfuscate the origin of Donations;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	the receipt or grant of cash advances or lines of credit to You or to another person or for purposes other than those purposes clearly stated in the Project or for credit repair or debt settlement services;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	counterfeit music, films, software, or other licensed materials without the appropriate authorisation from the rights holder;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	products and actions that directly infringe or facilitate infringement upon the trademark, patent, copyright, trade secrets, or proprietary or privacy rights of any third party;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	the unauthorised sale or resale of goods or services;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	any election campaigns in an unsupported country unless run by a registered organization within a supported country;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	the collecting or providing of Donations for any purpose other than as described in a Project description; or
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	any other activity that We may deem, in Our sole discretion, to (a) be unacceptable or objectionable; (b) restrict or inhibit any other person from using or enjoying the Platform; or (c) expose the Platform or its Users to any harm or liability of any type.
      B. not to use the Platform to transmit or otherwise upload any Content that: 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	infringes any intellectual property or other proprietary rights of any party; 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	You do not have a right to upload under any law or under contractual or fiduciary relationships;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	contains software viruses or any other computer code, files or programmes designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment; 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	poses or creates a privacy or security risk to any person; or 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	constitutes unsolicited or unauthorised advertising, promotional materials, commercial activities and/or sales, “junk mail”, “spam”, “chain letters”, “pyramid schemes”, “contests”, “sweepstakes” or any other form of solicitation;
      C. not to interfere with or disrupt servers or networks connected to or used the Platform’s work, or disobey any requirements, procedures, policies or regulations of the networks connected to or used on the Platform;
      D. not to harvest, collect or publish personally identifiable information of others;
      E. not to raise Donations for a minor without the express permission of the minor’s guardian unless the funds are transferred into a trust account for the sole benefit of the minor;
      F. not to use the Platform on behalf of a third party or post any personal data or other information about a third party, without the express consent of that third party;
      G. not to use another User’s Account without permission, impersonate any person or entity, falsely state or otherwise misrepresent Your affiliation with a person or entity, misrepresent a Charitable/non-profitable organization through the Platform, or post Content in any inappropriate category or areas on the Platform;
      H. not to create any liability for Us;
      I. not to gain unauthorised access to the Platform, or any Account, computer system, or network connected to the Platform, by any unauthorised or illegal means;
      J. not to obtain or attempt to obtain any materials or information not intentionally made available through the Platform;
      K. not to use the Platform to post, transmit or in any way exploit any information, software or other material for commercial purposes, or that contains advertising, except that using the Platform for fundraising activities in accordance with these Terms is expressly permitted;
      L. not to undertake any activity or engage in any conduct that is inconsistent with the purpose of the Platform; or
      M. not to attempt to undertake indirectly any of the foregoing. \n
      &nbsp;&nbsp;&nbsp;&nbsp;Additionally, with respect to all Donations You make or accept through the Platform, You agree and represent, warrant and covenant:
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	not to make or accept any Donations that You know or suspect to be erroneous, suspicious or fraudulent;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	to maintain reasonable and standard security measures to protect any information transmitted and received through the Platform, including without limitation, adhering to any security procedures and controls required by ATLAS INITIATIVE CIC from time to time;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	to maintain a copy of all electronic and other records related to Projects and Donations as necessary for Us to verify compliance with these Terms and make such records available to Us upon Our request. For clarity, the foregoing does not affect or limit Your obligations to maintain documentation as required by applicable laws, rules, regulations, or governmental authority; and 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	at Our request, to fully cooperate in the auditing of, investigation of, and remedial efforts to correct any alleged or uncovered violation or wrongdoing of a User to whom, or Project or Donation to which, You are connected. \n
      &nbsp;&nbsp;&nbsp;&nbsp;We reserve the right to refuse, condition, or suspend any Donations or other transactions that We believe in Our sole discretion may violate these Terms or harm the interests of Our Users, partners, the public, or expose You, Us, or others to risks unacceptable to Us.
      `,
    },
    {
      title: `Deleting Your Account`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;You can terminate Your account at any time through Your account settings. We may retain certain information as required by law or as necessary for Our legitimate purposes. All provisions of this agreement survive termination of an Account, including Our rights regarding any Content You’ve already submitted to the Platform.
      `,
    },
    {
      title: `Intellectual Property`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;With respect to User Content, You represent and warrant that You own all rights, titles and interests in and to, or otherwise have all necessary rights and consents to (and to allow others to) fully exploit, such Content, including, without limitation, as it concerns all copyrights, trademark rights and rights of publicity or privacy related thereto. By uploading, sharing, providing, or otherwise making available any User Content, or any portion thereof, in connection with the Platform, You hereby grant and will grant Us and Users a nonexclusive, worldwide, royalty-free, fully paid up, transferable, sublicensable, perpetual, irrevocable licence to copy, display, upload, perform, distribute, store, modify and otherwise use Your User Content in connection with the operation of the Platform. Without limiting the foregoing, if any User Content contains Your name, image or likeness, You hereby release and hold harmless ATLAS INITIATIVE CIC and its contractors and employees, from: \n
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	all claims for invasion of privacy, publicity or libel
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	any liability or other claims by virtue of any blurring, distortion, alteration, optical illusion, or other use or exploitation of Your name, image or likeness;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	any liability for claims made by You (or any successor to any claim You might bring) in connection with Your User Content, name, image or likeness. \n
      &nbsp;&nbsp;&nbsp;&nbsp;You waive any right to inspect or approve any intermediary version(s) or finished version(s) of the results of the use of Your User Content (including Your name, image etc.). Further, if any person (other than You) appears in Your User Content, You represent and warrant that You have secured all necessary licences, waivers and releases from such person(s) for the benefit of the Platform in a manner fully consistent with the licences, waivers and releases set forth above. You further acknowledge that Your participation in the Platform and submission of User Content is voluntary and that You will not receive financial compensation of any type associated with the licences, waivers, and releases set forth herein (or Platform’s exploitation thereof), and that the sole consideration for the subject matter of this agreement is the opportunity to use the Platform. \n
      &nbsp;&nbsp;&nbsp;&nbsp;We need certain licences from You in order to perform properly. When You as a Charity launch a Project, You agree to these terms:
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	We can use the Content You’ve submitted. You grant to Us, and others acting on Our behalf, the worldwide, non-exclusive, perpetual, irrevocable, royalty-free, sublicensable, transferable right to use, exercise, commercialise, and exploit the copyright, publicity, trademark, and database rights with respect to Your Content. In general, We use this Content to promote projects in order to find You the best support. When We use the Content, We can make changes, like editing or translating it. You grant Us the right to edit, modify, reformat, excerpt, delete, or translate any of Your Content.
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	You won’t submit stuff You don’t hold the copyright for (unless You have permission). Your Content will not contain third-party copyrighted material, or material that is subject to other third-party proprietary rights, unless You have permission from the rightful owner of the material, or You are otherwise legally entitled to post the material (and to grant Us all the licence rights outlined here).
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	Any royalties or licensing on Your Content are Your responsibility. You will pay all royalties and other amounts owed to any person or entity based on Your Content.
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	You agree and confirm that if We use Your Content, We’re not violating anyone’s rights or copyrights. If We exploit or make use of Your submission in the ways contemplated in this agreement, You promise that this will not infringe or violate the rights of any third party, including (without limitation) any privacy rights, publicity rights, copyrights, contract rights, or any other intellectual property or proprietary rights. \n
      &nbsp;&nbsp;&nbsp;&nbsp;You also acknowledge and agree that the Platform may contain Content or features that are protected by copyright, patent, trademark, trade secret or other proprietary rights and laws. Except as expressly authorised by Us, You agree not to modify, copy, frame, scrape, rent, lease, loan, sell, distribute or create derivative works based on the Platform or its content, in whole or in part, except that the foregoing does not apply to Your own User Content that You legally upload to the Platform. In connection with Your use of the Platform, You will not engage in or use any data mining, spiders, robots, scraping or similar data gathering or extraction methods.
      &nbsp;&nbsp;&nbsp;&nbsp;Any use of the Platform or its Content other than as specifically authorised herein is strictly prohibited. The technology and Software underlying the Platform or distributed in connection therewith is Our property. You agree not to copy, modify, create a derivative work of, reverse engineer, reverse assemble or otherwise attempt to discover any source code, sell, assign, sublicense, or otherwise transfer any right in the Software. Any rights not expressly granted herein are reserved by Us.
      `,
    },
    {
      title: `Other Websites`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;The Platform may contain links to other websites (for instance, Project pages, User profiles, etc.). When You access third-party websites, You do so at Your own risk. Unless We expressly say otherwise, You should assume that these other websites are not under Our control. We assume no responsibility for the content of such websites, and We disclaim liability for any and all forms of loss or damage arising out of their use. Additionally, even if We include a link to other websites on this Platform, that does not mean that We endorse that other Website or in any way recommend that You should use it.
      `,
    },
    {
      title: `Our Rights`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;To protect the Platform and to help ensure that all the Users enjoy a safe and secure environment, We reserve these rights: 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	We can make changes to the Platform without notice or liability;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	We have the right to decide who’s eligible to use the Platform. We may impose restrictions or limitations on Accounts, or for significant or repeated violations of Our Terms We may cancel Accounts;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	We have the right to reject, cancel, interrupt, remove, or suspend any Project at any time and for any reason.
      `,
    },
    {
      title: `General Disclaimers`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;<b>We are not a broker, financial institution, or creditor.</b> We are an informative platform only. We facilitate the cooperation between Users, but We are not an affiliate, partner, agent, employer, employee, administrator, representative of any User, Sponsor, Charitable/non-profitable organization or Volunteer. \n
      &nbsp;&nbsp;&nbsp;&nbsp;<b>Payment Processor. </b> We might act as a payment processor using third parties and hold Sponsors funds till the project or it’s part is done. But in any case, Sponsors are making every Donation solely on the basis of their own analysis of information about the Project or Charitable/non-profitable organization posted on the Platform or elsewhere. We are not responsible for the correctness of the information provided by other Users as well as for the verification of the origin of Donations. In case of the payment processing option, such information will be available publicly on the Platform’s website. \n
      &nbsp;&nbsp;&nbsp;&nbsp;We don’t oversee the performance or punctuality of the Projects, and We don’t endorse any Content Users submit to the Platform. When You use the Platform, You release Us from claims, damages, and demands of every kind — known or unknown, suspected or unsuspected, disclosed or undisclosed — arising out of or in any way related to such disputes. You’re solely responsible for any resulting damage or loss to any party. We are not liable for any damages or losses related to Your use of the Platform. We don’t become involved in disputes between Users. We are not responsible for the compliance by Users with sanctions restrictions and fulfilment of applicable legal requirements. \n
      &nbsp;&nbsp;&nbsp;&nbsp;<b>Content.</b> You acknowledge that all information and Content accessed by You using the Platform is at Your own risk. By entering and/or registering on the Platform You are expressing Your consent that ATLAS INITIATIVE CIC is not liable for any Content posted on the Platform by any third party. \n
      &nbsp;&nbsp;&nbsp;&nbsp;<b>Sales Are Prohibited on the Platform.</b> You are not permitted to offer any good or service in exchange for a Donation on the Platform. \n
      &nbsp;&nbsp;&nbsp;&nbsp;<b>Warranties.</b> Your use of the Platform is at Your sole risk. We make no warranty or condition that: the use of the Platform will meet Your requirements; the use of the Platform will be uninterrupted, timely, secure, or error-free; the results that may be obtained from the use of the Platform will be accurate or reliable; or the quality of any Projects, information, or other material obtained by You through the Platform will meet Your expectations.
      We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the Platform or the information, Projects, or related material contained on the Platform for any purpose. We are not responsible for any errors or omissions in the information provided on this Platform, and We make no warranties that any information provided on this Platform is accurate, complete, or up-to-date. All information and Content provided on the Platform are for informational purposes only. 
      `,
    },
    {
      title: `Limitation of Liability`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;You expressly understand and agree that, to the fullest extent permitted by applicable law, We will not be liable for any: 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	indirect, incidental, special, consequential, punitive or exemplary damages;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	damages for loss of profits; 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	damages for loss of goodwill;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	damages for loss of use;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	loss or corruption of data;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	other intangible losses (even if We have been advised of the possibility of such damages), whether based on contract, tort, negligence, strict liability or otherwise, resulting from (a) the use or the inability to use the Platform; (b) the cost of procurement of substitute goods and services resulting from any goods, data, information or services or messages received entered into through or from the Platform; (c) unauthorised access to or alteration of Your transmissions or data; (e) statements or conduct of any third party on the Platform; or (f) any other matter relating to the Platform. \n
      &nbsp;&nbsp;&nbsp;&nbsp;Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages. Accordingly, some of the limitations set forth above may not apply to You. If You are dissatisfied with these Terms, Your sole and exclusive remedy is to discontinue the use of the Platform. You acknowledge and agree that the limitations of liability set forth in this section are integral to these Terms and that, without such limitations, the Terms would be substantially different.
      `,
    },
    {
      title: `Indemnification`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;You agree to defend, indemnify, and hold Us harmless from all liabilities, claims, and expenses (including reasonable attorneys’ fees and other legal costs) that arise from or relate to Your use or misuse of the Platform. We reserve the right to assume the exclusive defence and control of any matter otherwise subject to this indemnification clause, in which case You agree that You’ll cooperate and help Us in asserting any defences. As part of this, by accepting these Terms, You consent to the service of process for any action that could be brought against Us, for any reason.
      `,
    },
    {
      title: `Changes to These Terms and Conditions`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. By continuing to access or use Our Platform after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new Terms, in whole or in part, please stop using the Platform. If there is a conflict between two versions of the Terms and Conditions to which You have agreed or been deemed to agree, the more recent version shall take precedence unless it is expressly stated otherwise. It is Your responsibility to check the changes to these Terms periodically.
      `,
    },
    {
      title: `Dispute Resolution and Governing Law`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;You agree that all disputes between You and Us or any of Our directors or employees acting in their capacity as such (whether or not such dispute involves a third party) with regard to Your relationship with Us, including without limitation disputes related to these Terms, Your use of the Platform, and/or rights of privacy and/or publicity, will be resolved by binding, individual arbitration. We encourage You to contact Us if You’re having an issue before resorting to the courts. In case it is impossible to make an agreement between Us or after arbitration, You agree to submit to the exclusive jurisdiction of the courts of England and Wales.
      `,
    },
    {
      title: `Contact`,
      body: `&nbsp;&nbsp;&nbsp;&nbsp;If You wish to communicate with Us about anything related to these Terms and Conditions, You may do so by sending an email to <a href="mailto:info@philanthropy.international?subject=Ask a question">info@philanthropy.international</a>.
      `,
    },
  ];

  React.useEffect(() => {
    document.title = `Terms and Conditions | Philanthropy International`;
  },[])
  return (
    <Grid container justifyContent="center">
      {/* <LeftBlock /> */}
      <RightBlock content={content} points={points} table={table}/>
    </Grid>
  );
};

export default Terms;
