import { CountryPage } from "@/lib/types";
import { countriesEuropeAmericas } from "@/data/countries-europe-americas";
import { countriesMeaApac } from "@/data/countries-mea-apac";

const baseCountries: CountryPage[] = [
  // ---------- Tier 1: High-value, regulated markets ----------
  {
    slug: "united-kingdom",
    countryName: "United Kingdom",
    region: "Tier 1 — High-Value Regulated Markets",
    metaTitle: "Blockchain, Payments & API Software Development Company in the UK",
    metaDescription:
      "Hurain Technologies builds payments, API, cloud, and blockchain platforms for UK fintechs and banks working within FCA and Open Banking frameworks.",
    h1: "Blockchain, Payments & API Development Company in the United Kingdom",
    intro:
      "The UK remains one of the most mature and demanding digital markets for fintech and crypto-adjacent businesses. Financial platforms serving UK customers need engineering partners who can build for the FCA's payments and crypto-asset expectations from day one, not retrofit compliance after launch. Hurain Technologies supports UK-facing platforms with open banking API integration, blockchain systems, and cloud modernization designed around UK regulatory expectations.",
    regulatoryNotes: [
      "Payments and open banking integrations typically engage with the FCA's regulatory perimeter and the UK's Open Banking standard for account information and payment initiation.",
      "Crypto-asset businesses marketing to UK consumers fall under the FCA's financial promotions regime for cryptoassets.",
      "Payment institutions and e-money issuers are supervised under the FCA's Payment Services Regulations.",
      "We build the technical controls these frameworks expect; UK licensing and FCA registration should be managed with qualified UK legal and compliance counsel.",
    ],
    focusServiceSlugs: ["api-integration-services", "cybersecurity-compliance", "blockchain-cryptocurrency-development", "payment-gateway-integration"],
    faqs: [
      { question: "Do you support UK Open Banking integrations?", answer: "Yes, we build account information and payment initiation APIs aligned to the UK Open Banking standard for banks, fintechs, and payment platforms." },
      { question: "Can you help a crypto business meet FCA financial promotion requirements technically?", answer: "We build the risk warnings, disclosures, and audit logging patterns commonly expected alongside FCA-compliant marketing, working alongside your UK compliance counsel." },
    ],
  },
  {
    slug: "malta",
    countryName: "Malta",
    region: "Tier 1 — High-Value Regulated Markets",
    metaTitle: "Blockchain, Payments & Fintech Development Company in Malta",
    metaDescription:
      "Blockchain, payments, and fintech software development for Malta-based businesses — built around Malta's Virtual Financial Assets (VFA) and MFSA regulatory framework.",
    h1: "Blockchain, Payments & Fintech Development Company in Malta",
    intro:
      "Malta is one of the EU's most established jurisdictions for regulated fintech and blockchain business, anchored by the Malta Financial Services Authority (MFSA) and the Virtual Financial Assets (VFA) framework. Hurain Technologies builds and modernizes blockchain, payment, and API infrastructure for Malta-based fintechs and crypto businesses that need EU-aligned technical and reporting standards from day one.",
    regulatoryNotes: [
      "Malta's Virtual Financial Assets (VFA) framework applies to certain crypto-asset activities operated from or licensed in Malta, supervised by the MFSA.",
      "Payment institutions and e-money issuers are licensed and supervised by the MFSA under EU payment services standards.",
      "EU passporting allows Malta-licensed entities to operate across the EEA under mutual recognition frameworks.",
      "We engineer to these expectations and work alongside Malta-based legal and compliance advisors for licensing submissions.",
    ],
    focusServiceSlugs: ["blockchain-cryptocurrency-development", "payment-gateway-integration", "api-integration-services"],
    faqs: [
      { question: "Do you build platforms aligned with Malta's VFA framework?", answer: "Yes, we build blockchain and token infrastructure with the technical controls, audit logging, and governance typically expected under an MFSA VFA review." },
      { question: "Can you support a Malta-licensed payment institution?", answer: "Yes, we build payment processing, wallet, and reconciliation infrastructure aligned to MFSA payment institution licensing expectations." },
    ],
  },
  {
    slug: "germany",
    countryName: "Germany",
    region: "Tier 1 — High-Value Regulated Markets",
    metaTitle: "API, Cloud & Blockchain Development Company in Germany",
    metaDescription:
      "Enterprise API integration, cloud modernization, and blockchain development for German banks, fintechs, and regulated platforms under BaFin oversight.",
    h1: "Enterprise API, Cloud & Blockchain Development in Germany",
    intro:
      "Germany's banking and fintech sector operates under some of Europe's strictest supervisory expectations from BaFin, alongside strong data protection requirements under the GDPR. Hurain Technologies helps German banks, fintechs, and payment platforms modernize legacy cores, build secure API ecosystems, and evaluate blockchain-based settlement and tokenization use cases within this framework.",
    regulatoryNotes: [
      "Banking and payment platforms are typically supervised by BaFin, with data handling governed by GDPR at the technical and organizational level.",
      "Crypto-asset custody and trading activity in Germany has historically required specific licensing consideration under German financial supervision.",
      "Open banking API programs commonly reference PSD2-derived technical standards for strong customer authentication.",
      "We build to these technical expectations while German licensing and data protection sign-off should run through qualified local counsel.",
    ],
    focusServiceSlugs: ["api-integration-services", "cloud-application-modernization", "cybersecurity-compliance", "blockchain-cryptocurrency-development"],
    faqs: [
      { question: "Can you help modernize our legacy banking core?", answer: "Yes, we specialize in incremental core modernization that avoids a risky big-bang rewrite while meeting German banking supervisory expectations." },
      { question: "Do you build GDPR-aligned data architecture?", answer: "Yes, data minimization, encryption, and access-control patterns are built into our architecture by default for platforms handling EU personal data." },
    ],
  },
  {
    slug: "netherlands",
    countryName: "Netherlands",
    region: "Tier 1 — High-Value Regulated Markets",
    metaTitle: "Payments, API & Cloud Software Development Company in the Netherlands",
    metaDescription:
      "Payment integration, API engineering, and cloud modernization software development for Dutch fintechs and platforms under DNB and AFM oversight.",
    h1: "Payments, API & Cloud Development Company in the Netherlands",
    intro:
      "The Netherlands has a mature, tightly regulated fintech ecosystem supervised by De Nederlandsche Bank (DNB) and the AFM. Hurain Technologies builds platforms for Dutch payment providers, fintechs, and enterprises that need to satisfy both technical performance expectations and regulator scrutiny.",
    regulatoryNotes: [
      "Payment institutions and fintechs are commonly supervised by DNB and/or the AFM depending on activity type.",
      "Open banking integrations reference PSD2-derived standards for account access and payment initiation.",
      "Crypto-asset service providers registered in the Netherlands are supervised by DNB for AML/CTF compliance.",
      "We build the platform-level technical controls these bodies expect, alongside your Dutch legal and compliance advisors.",
    ],
    focusServiceSlugs: ["payment-gateway-integration", "api-integration-services", "cloud-application-modernization"],
    faqs: [
      { question: "Do you support Dutch payment and open banking integrations?", answer: "Yes, including PSD2-aligned account information and payment initiation APIs for Dutch banks and fintechs." },
      { question: "Can you support a DNB-registered crypto-asset service provider?", answer: "Yes, we build the AML/CTF transaction monitoring and reporting controls typically expected in a DNB registration review." },
    ],
  },
  {
    slug: "canada",
    countryName: "Canada",
    region: "Tier 1 — High-Value Regulated Markets",
    metaTitle: "Fintech, Blockchain & Cloud Development Company in Canada",
    metaDescription:
      "Software development for Canadian fintech, payments, and blockchain platforms — cloud modernization, API integration, and crypto engineering.",
    h1: "Fintech, Blockchain & Cloud Development Company in Canada",
    intro:
      "Canada's fast-growing fintech sector under federal and provincial oversight makes it a priority market for platforms expanding across North America. Hurain Technologies builds payment, API, blockchain, and cloud modernization infrastructure for Canadian fintechs and banks.",
    regulatoryNotes: [
      "Payments and fintech activity intersects with FINTRAC's AML/CTF obligations for money services businesses.",
      "Crypto-asset trading platforms operating in Canada have engaged with provincial securities regulators (CSA) on registration requirements.",
      "Open banking (Consumer-Driven Banking) initiatives are shaping API standards for account data sharing across Canadian institutions.",
      "We build the technical controls (KYC/AML workflows, reporting, audit logging) these bodies expect, alongside Canadian legal counsel.",
    ],
    focusServiceSlugs: ["cloud-application-modernization", "cybersecurity-compliance", "blockchain-cryptocurrency-development"],
    faqs: [
      { question: "Do you support FINTRAC-aligned AML workflows?", answer: "Yes, we build transaction monitoring and reporting workflows aligned to Canadian AML/CTF expectations for money services businesses." },
      { question: "Can you support a CSA-registered crypto trading platform?", answer: "Yes, we build the custody, reporting, and audit-logging infrastructure commonly expected in a provincial securities regulator registration review." },
    ],
  },
  {
    slug: "united-states",
    countryName: "United States",
    region: "Tier 1 — High-Value Regulated Markets",
    metaTitle: "Blockchain, Payments & Cloud Software Development Company in the USA",
    metaDescription:
      "US-focused blockchain, payments, API, and cloud modernization software development for fintechs, payment platforms, and state-licensed money services businesses.",
    h1: "Blockchain, Payments & Cloud Development Company in the United States",
    intro:
      "The US market moves at the pace of state-by-state regulation — money transmitter licensing and federal frameworks like BSA/AML shape how fintech and payments platforms are built. Hurain Technologies works with US fintechs and payment platforms to build compliant, scalable payment, blockchain, and cloud infrastructure across this fragmented regulatory landscape.",
    regulatoryNotes: [
      "Money transmission and payments activity is regulated at the state level (state MTL regimes) alongside federal BSA/AML obligations enforced by FinCEN.",
      "Crypto-asset activity intersects with both federal guidance (FinCEN, SEC/CFTC considerations) and a patchwork of state licensing regimes.",
      "We build the technical infrastructure — KYC/AML, reporting, audit trails — that these frameworks expect, alongside qualified US regulatory counsel for licensing strategy.",
    ],
    focusServiceSlugs: ["blockchain-cryptocurrency-development", "payment-gateway-integration", "cloud-application-modernization", "ai-fraud-detection-automation"],
    faqs: [
      { question: "Can you build for a specific US state's money transmitter licensing requirements?", answer: "Yes, we tailor reporting and compliance controls to the specific state regulatory framework you're operating under." },
      { question: "Do you support BSA/AML-aligned transaction monitoring?", answer: "Yes, we build transaction monitoring and suspicious activity reporting workflows aligned to US AML expectations for money services businesses and crypto platforms." },
    ],
  },
  {
    slug: "australia",
    countryName: "Australia",
    region: "Tier 1 — High-Value Regulated Markets",
    metaTitle: "Payments, Cloud & API Software Development Company in Australia",
    metaDescription:
      "Payment integration, API, cloud modernization, and cybersecurity software development for Australian fintechs and platforms under ASIC, AUSTRAC, and CDR frameworks.",
    h1: "Payments, Cloud & API Development Company in Australia",
    intro:
      "Australia's Consumer Data Right (CDR) open banking regime, AUSTRAC's AML/CTF obligations, and ASIC's financial services oversight create a technically demanding environment for fintech and payments platforms. Hurain Technologies builds API, payments, and cloud modernization infrastructure for Australian fintechs and platforms operating within this framework.",
    regulatoryNotes: [
      "Open banking and data-sharing integrations in Australia are built around the Consumer Data Right (CDR) standard.",
      "Payment and remittance platforms typically engage AUSTRAC's AML/CTF reporting obligations.",
      "Digital currency exchange providers have historically needed to register with AUSTRAC as reporting entities.",
      "We engineer to these technical standards and work alongside Australian legal and compliance counsel on registration and licensing.",
    ],
    focusServiceSlugs: ["api-integration-services", "payment-gateway-integration", "cybersecurity-compliance"],
    faqs: [
      { question: "Do you build Consumer Data Right (CDR) compliant APIs?", answer: "Yes, we build data-sharing and open banking APIs aligned to the CDR technical standard for Australian banks and fintechs." },
      { question: "Can you support AUSTRAC-aligned AML reporting?", answer: "Yes, we build transaction monitoring and reporting workflows aligned to AUSTRAC expectations for reporting entities." },
    ],
  },
  {
    slug: "singapore",
    countryName: "Singapore",
    region: "Tier 1 — High-Value Regulated Markets",
    metaTitle: "Blockchain, Fintech & Cloud Software Development Company in Singapore",
    metaDescription:
      "Blockchain, payments, API, and cloud modernization software development for Singapore fintechs and digital payment token service providers under MAS oversight.",
    h1: "Blockchain, Fintech & Cloud Development Company in Singapore",
    intro:
      "Singapore is Southeast Asia's leading regulated hub for fintech and digital-asset businesses, with the Monetary Authority of Singapore (MAS) setting a high technical and governance bar under the Payment Services Act. Hurain Technologies builds blockchain, payment, and API infrastructure for Singapore-based fintechs and digital payment token service providers.",
    regulatoryNotes: [
      "Digital payment token services and other payment activities are regulated under Singapore's Payment Services Act, overseen by MAS.",
      "MAS technology risk management guidelines shape expectations around system resilience, access control, and incident response.",
      "Cross-border payment and remittance platforms are expected to demonstrate strong AML/CFT transaction monitoring.",
      "We build to these technical and resilience expectations, alongside your MAS licensing counsel.",
    ],
    focusServiceSlugs: ["blockchain-cryptocurrency-development", "api-integration-services", "cloud-application-modernization"],
    faqs: [
      { question: "Do you build platforms aligned with MAS technology risk management guidelines?", answer: "Yes, our architecture and security practices are designed around the resilience, access control, and incident response expectations common to MAS TRM guidelines." },
      { question: "Can you support a Digital Payment Token Service license application?", answer: "We build the technical infrastructure and controls typically reviewed in a DPT license application, working alongside your Singapore regulatory counsel." },
    ],
  },

  // ---------- Tier 2: Fast-growing digital markets ----------
  {
    slug: "india",
    countryName: "India",
    region: "Tier 2 — Fast-Growing Digital Markets",
    metaTitle: "Payments, API & AI Fraud Detection Software Development Company in India",
    metaDescription:
      "Payment gateway integration, open banking APIs, AI fraud detection, and cloud modernization software development for Indian fintechs and platforms.",
    h1: "Payments, API & AI Fraud Detection Development Company in India",
    intro:
      "India's UPI-driven digital payments ecosystem and RBI's evolving fintech regulatory framework make it one of the highest-volume, fastest-moving markets for payment and API engineering. Hurain Technologies builds payment gateway integrations, API platforms, and AI-driven fraud detection systems for Indian fintechs, payment aggregators, and platforms scaling transaction volume rapidly.",
    regulatoryNotes: [
      "Payment aggregators and gateways operate under RBI's payment and settlement systems oversight, including data localization expectations for payment data.",
      "KYC processes commonly reference RBI's KYC master direction and Aadhaar-based e-KYC frameworks where applicable.",
      "Crypto-asset activity in India intersects with evolving tax and reporting requirements rather than a dedicated licensing regime.",
      "We build to these data-handling and reporting expectations, alongside Indian regulatory counsel.",
    ],
    focusServiceSlugs: ["payment-gateway-integration", "ai-fraud-detection-automation", "api-integration-services", "cloud-application-modernization"],
    faqs: [
      { question: "Do you support UPI and India-specific payment rail integration?", answer: "Yes, we integrate UPI and other India-specific payment rails alongside card and wallet payment methods within a unified orchestration layer." },
      { question: "Can you build RBI data-localization-aligned architecture?", answer: "Yes, we design payment data storage and processing architecture aligned to RBI data localization expectations for payment system providers." },
    ],
  },
  {
    slug: "uae",
    countryName: "United Arab Emirates",
    region: "Tier 2 — Fast-Growing Digital Markets",
    metaTitle: "Blockchain, Crypto & Fintech Software Development Company in the UAE",
    metaDescription:
      "Blockchain, crypto exchange, payments, and fintech software development for UAE-based platforms operating under VARA, SCA, and DFSA frameworks.",
    h1: "Blockchain, Crypto & Fintech Development Company in the UAE",
    intro:
      "The UAE has positioned itself as a leading global hub for regulated crypto and blockchain businesses through frameworks like Dubai's VARA and the Securities and Commodities Authority (SCA) at the federal level. We build exchange, wallet, token, and DeFi infrastructure for UAE-based crypto businesses, alongside payments and fintech platforms operating across the Emirates.",
    regulatoryNotes: [
      "Virtual asset service providers operating in Dubai typically engage with the Virtual Assets Regulatory Authority (VARA) licensing framework.",
      "Federally, virtual asset and securities activity intersects with the Securities and Commodities Authority (SCA).",
      "Financial free zones (DIFC/ADGM) operate their own regulatory frameworks (DFSA, FSRA) distinct from onshore UAE regulation.",
      "We build technical infrastructure aligned to these frameworks' expectations and work alongside UAE-licensed legal counsel on registration strategy.",
    ],
    focusServiceSlugs: ["blockchain-cryptocurrency-development", "crypto-exchange-wallet-development", "payment-gateway-integration", "cybersecurity-compliance"],
    faqs: [
      { question: "Do you build platforms aligned with VARA's technical expectations?", answer: "Yes, we build exchange, custody, and token infrastructure with the security, audit-logging, and governance controls typically expected under VARA licensing review." },
      { question: "Can you support a DIFC or ADGM-based fintech launch?", answer: "Yes, we build platforms for entities operating under DFSA (DIFC) or FSRA (ADGM) frameworks, working alongside your free-zone legal counsel." },
    ],
  },
  {
    slug: "saudi-arabia",
    countryName: "Saudi Arabia",
    region: "Tier 2 — Fast-Growing Digital Markets",
    metaTitle: "Fintech, Payments & Cloud Software Development Company in Saudi Arabia",
    metaDescription:
      "Payments, API, cloud modernization, and AML/KYC compliance software development for Saudi fintechs under SAMA and CMA regulatory frameworks.",
    h1: "Fintech, Payments & Cloud Development Company in Saudi Arabia",
    intro:
      "Saudi Arabia's Vision 2030 fintech agenda, driven by the Saudi Central Bank (SAMA) and the Capital Market Authority (CMA), has created one of the fastest-growing regulated fintech environments in the region. Hurain Technologies builds payment, API, and cloud modernization infrastructure for Saudi fintechs and platforms scaling within this framework.",
    regulatoryNotes: [
      "Payment services providers typically operate under SAMA licensing and its open banking framework.",
      "Capital markets and investment-related fintech activity intersects with CMA oversight.",
      "AML/CTF obligations are enforced through SAMA and national AML frameworks.",
      "We build to these technical and reporting expectations, alongside Saudi-licensed regulatory counsel.",
    ],
    focusServiceSlugs: ["payment-gateway-integration", "api-integration-services", "cloud-application-modernization", "cybersecurity-compliance"],
    faqs: [
      { question: "Do you support SAMA open banking API standards?", answer: "Yes, we build account information and payment initiation APIs aligned to SAMA's open banking framework for Saudi banks and fintechs." },
      { question: "Can you help modernize legacy financial infrastructure in Saudi Arabia?", answer: "Yes, our cloud modernization approach is well suited to Saudi financial institutions migrating legacy cores under SAMA's digital transformation expectations." },
    ],
  },
  {
    slug: "south-africa",
    countryName: "South Africa",
    region: "Tier 2 — Fast-Growing Digital Markets",
    metaTitle: "Payments, AI Fraud Detection & Cloud Software Development Company in South Africa",
    metaDescription:
      "Payment integration, AI fraud detection, cloud migration, and AML/KYC compliance software development for South African fintechs and platforms.",
    h1: "Payments, AI Fraud Detection & Cloud Development Company in South Africa",
    intro:
      "South Africa's fintech sector is scaling quickly under the Financial Sector Conduct Authority (FSCA) and South African Reserve Bank (SARB) oversight, with growing crypto-asset regulation following the FSCA's declaration of crypto assets as financial products. Hurain Technologies builds payment, fraud detection, and cloud infrastructure for South African fintechs and platforms.",
    regulatoryNotes: [
      "Crypto-asset service providers are required to register with the FSCA following its 2023 declaration of crypto assets as financial products.",
      "Payment system participants engage with SARB oversight and the National Payment System Act framework.",
      "AML/CTF obligations reference South Africa's FIC Act reporting requirements.",
      "We build the technical controls these frameworks expect, alongside South African regulatory counsel.",
    ],
    focusServiceSlugs: ["payment-gateway-integration", "ai-fraud-detection-automation", "cloud-application-modernization"],
    faqs: [
      { question: "Do you support FSCA-aligned crypto asset service provider requirements?", answer: "Yes, we build the technical controls — reporting, audit logging, custody security — commonly expected in an FSCA CASP registration review." },
      { question: "Can you integrate South African payment rails?", answer: "Yes, we integrate local payment methods and rails alongside card and wallet payments within a unified orchestration layer." },
    ],
  },
  {
    slug: "nigeria",
    countryName: "Nigeria",
    region: "Tier 2 — Fast-Growing Digital Markets",
    metaTitle: "Payments, Wallet & Blockchain Software Development Company in Nigeria",
    metaDescription:
      "Payment gateway, digital wallet, and blockchain software development for Nigerian fintechs operating under CBN and SEC regulatory frameworks.",
    h1: "Payments, Wallet & Blockchain Development Company in Nigeria",
    intro:
      "Nigeria is Africa's largest fintech market, with a fast-evolving regulatory relationship between the Central Bank of Nigeria (CBN) and the digital asset sector. Hurain Technologies builds payment, wallet, and blockchain infrastructure for Nigerian fintechs, remittance platforms, and crypto-adjacent businesses navigating this environment.",
    regulatoryNotes: [
      "Payment service providers and mobile money operators are licensed and supervised by the CBN.",
      "Virtual asset service providers have engaged with the Securities and Exchange Commission (SEC) Nigeria's digital asset rules.",
      "Cross-border remittance platforms operate under CBN guidelines for international money transfer operators.",
      "We build to these evolving technical and reporting expectations, alongside Nigerian regulatory counsel.",
    ],
    focusServiceSlugs: ["payment-gateway-integration", "blockchain-cryptocurrency-development", "ai-fraud-detection-automation"],
    faqs: [
      { question: "Can you build a mobile wallet platform for the Nigerian market?", answer: "Yes, we build wallet and payment infrastructure aligned to CBN payment service provider expectations, including local payment rail integration." },
      { question: "Do you support Naira-crypto on/off-ramp integration?", answer: "Yes, we integrate compliant fiat-to-crypto rails alongside local payment methods for Nigerian platforms." },
    ],
  },
  {
    slug: "kenya",
    countryName: "Kenya",
    region: "Tier 2 — Fast-Growing Digital Markets",
    metaTitle: "Payments, Mobile Money & Blockchain Software Development Company in Kenya",
    metaDescription:
      "Mobile money integration, payment gateway, and blockchain software development for Kenyan fintechs under CBK oversight.",
    h1: "Payments, Mobile Money & Blockchain Development Company in Kenya",
    intro:
      "Kenya's mobile-money-led fintech ecosystem, anchored by M-Pesa and supervised by the Central Bank of Kenya (CBK), remains one of Africa's most advanced digital payment environments. Hurain Technologies builds payment integration, mobile wallet, and blockchain infrastructure for Kenyan fintechs and platforms building on this foundation.",
    regulatoryNotes: [
      "Payment service providers and e-money issuers are licensed under CBK's National Payment System regulations.",
      "Mobile money interoperability and API access commonly reference CBK and industry interoperability standards.",
      "Virtual asset regulation in Kenya continues to evolve; platforms should monitor CBK and Capital Markets Authority guidance.",
      "We build to current technical and reporting expectations, alongside Kenyan regulatory counsel.",
    ],
    focusServiceSlugs: ["payment-gateway-integration", "api-integration-services", "blockchain-cryptocurrency-development"],
    faqs: [
      { question: "Do you integrate M-Pesa and other mobile money rails?", answer: "Yes, we integrate mobile money rails alongside card and bank payment methods within a unified payment orchestration layer." },
      { question: "Can you help a Kenyan fintech get CBK-ready technically?", answer: "Yes, we build the reporting, security, and audit-logging infrastructure typically reviewed in a CBK payment service provider licensing process." },
    ],
  },
  {
    slug: "ghana",
    countryName: "Ghana",
    region: "Tier 2 — Fast-Growing Digital Markets",
    metaTitle: "Payments & Fintech Software Development Company in Ghana",
    metaDescription:
      "Payment gateway, mobile money, and fintech software development for Ghanaian platforms operating under Bank of Ghana oversight.",
    h1: "Payments & Fintech Development Company in Ghana",
    intro:
      "Ghana's fintech sector has grown rapidly under the Bank of Ghana's payment systems regulation, with mobile money and digital payments becoming central to everyday commerce. Hurain Technologies builds payment gateway and fintech platform infrastructure for Ghanaian operators expanding their digital payment footprint.",
    regulatoryNotes: [
      "Payment service providers and dedicated electronic money issuers are licensed under Bank of Ghana's Payment Systems and Services Act framework.",
      "Mobile money interoperability follows national interoperability standards coordinated by the central bank.",
      "AML/CTF obligations reference Ghana's Financial Intelligence Centre requirements.",
      "We build to these technical expectations, alongside Ghanaian regulatory counsel.",
    ],
    focusServiceSlugs: ["payment-gateway-integration", "api-integration-services"],
    faqs: [
      { question: "Can you integrate Ghanaian mobile money and payment rails?", answer: "Yes, we integrate local mobile money and bank payment rails within a unified orchestration and reconciliation layer." },
      { question: "Do you support Bank of Ghana licensing-aligned reporting?", answer: "Yes, we build transaction reporting and audit-logging infrastructure aligned to Bank of Ghana payment service provider expectations." },
    ],
  },
  {
    slug: "philippines",
    countryName: "Philippines",
    region: "Tier 2 — Fast-Growing Digital Markets",
    metaTitle: "Payments & Blockchain Software Development Company in the Philippines",
    metaDescription:
      "Payments and blockchain software development for Philippines-based fintechs under BSP regulatory frameworks, including VASP-aligned infrastructure.",
    h1: "Payments & Blockchain Development Company in the Philippines",
    intro:
      "The Philippines has a fast-growing digital payments sector regulated by the Bangko Sentral ng Pilipinas (BSP), with an increasingly active virtual asset service provider framework. Hurain Technologies builds payment infrastructure for BSP-regulated fintechs and e-money issuers, alongside blockchain infrastructure for VASP-aligned businesses.",
    regulatoryNotes: [
      "Payment service providers and e-money issuers are regulated by the BSP under its digital payments framework.",
      "Virtual asset service providers have engaged with BSP VASP licensing and AML/CTF obligations.",
      "Cross-border remittance platforms operate under BSP guidelines for money transfer operators.",
      "We build to these technical and reporting expectations, alongside Philippines-based regulatory counsel.",
    ],
    focusServiceSlugs: ["payment-gateway-integration", "blockchain-cryptocurrency-development", "api-integration-services"],
    faqs: [
      { question: "Can you support a BSP VASP licensing application?", answer: "We build the technical infrastructure and AML/KYC controls commonly reviewed in a BSP VASP application, alongside your Philippines legal counsel." },
      { question: "Do you support Philippines payment rail integration?", answer: "Yes, we integrate local payment methods and remittance rails alongside card and wallet payments within a unified orchestration layer." },
    ],
  },
  {
    slug: "indonesia",
    countryName: "Indonesia",
    region: "Tier 2 — Fast-Growing Digital Markets",
    metaTitle: "Payments & Blockchain Software Development Company in Indonesia",
    metaDescription:
      "Payment gateway and blockchain/crypto software development for Indonesian fintechs under OJK, Bank Indonesia, and Bappebti frameworks.",
    h1: "Payments & Blockchain Development Company in Indonesia",
    intro:
      "Indonesia's large, fast-growing digital economy is regulated across multiple bodies — Bank Indonesia and the OJK for payments and financial services, and Bappebti for crypto-asset trading. Hurain Technologies builds payment and blockchain infrastructure for Indonesian fintechs and crypto platforms operating within this multi-regulator environment.",
    regulatoryNotes: [
      "Payment system providers are licensed and supervised by Bank Indonesia and the Financial Services Authority (OJK) depending on activity type.",
      "Crypto-asset trading has historically been regulated by Bappebti as a commodity-derivatives-adjacent asset class, with regulatory responsibility transitioning toward the OJK.",
      "AML/CTF obligations reference Indonesia's PPATK reporting framework.",
      "We build to current technical expectations, alongside Indonesian regulatory counsel given the evolving regulatory transition.",
    ],
    focusServiceSlugs: ["payment-gateway-integration", "blockchain-cryptocurrency-development", "api-integration-services"],
    faqs: [
      { question: "Do you support Indonesian payment rail integration?", answer: "Yes, we integrate local payment methods and rails alongside card and wallet payments within a unified orchestration layer." },
      { question: "Can you build a crypto exchange for the Indonesian market?", answer: "Yes, we build exchange and custody infrastructure with the reporting and security controls typically expected under Indonesia's evolving crypto regulatory framework." },
    ],
  },

  // ---------- Tier 3: Partnership and white-label markets ----------
  {
    slug: "curacao",
    countryName: "Curaçao",
    region: "Tier 3 — Partnership & White-Label Markets",
    metaTitle: "Payments & Fintech Software Development Company in Curaçao",
    metaDescription:
      "Payments, PSP integration, and blockchain software development for Curaçao-based fintech and digital businesses under CBCS oversight.",
    h1: "Payments & Fintech Development Company in Curaçao",
    intro:
      "Curaçao is an established offshore jurisdiction for digital businesses, with payment and financial institutions supervised by the Centrale Bank van Curaçao en Sint Maarten (CBCS). Hurain Technologies builds payment infrastructure, PSP integrations, and blockchain systems for Curaçao-based fintech and digital businesses that need to launch quickly without compromising platform quality.",
    regulatoryNotes: [
      "Payment and financial institutions operating from Curaçao are supervised by the CBCS.",
      "Cross-border payment processing typically requires PSPs experienced with offshore merchant categories.",
      "Digital asset businesses should confirm current CBCS guidance, as regulatory expectations continue to evolve in this jurisdiction.",
      "We build the platform and reporting infrastructure these requirements expect, alongside Curaçao-based legal counsel.",
    ],
    focusServiceSlugs: ["payment-gateway-integration", "api-integration-services", "blockchain-cryptocurrency-development"],
    faqs: [
      { question: "Can you launch a payment platform quickly for a Curaçao-based business?", answer: "Yes, our payment orchestration core can be customized and launched quickly on a milestone plan agreed around your scope." },
      { question: "Do you help with PSP integration for offshore merchant categories?", answer: "Yes, we integrate PSPs experienced with offshore and high-risk merchant categories alongside crypto payment rails as an alternative." },
    ],
  },
  {
    slug: "cyprus",
    countryName: "Cyprus",
    region: "Tier 3 — Partnership & White-Label Markets",
    metaTitle: "Fintech, Payments & Blockchain Software Development Company in Cyprus",
    metaDescription:
      "Payment, API, and blockchain/crypto-asset software development for Cyprus-based fintechs and CySEC-regulated platforms.",
    h1: "Fintech, Payments & Blockchain Development Company in Cyprus",
    intro:
      "Cyprus is a well-established EU hub for fintech, forex, and crypto-asset businesses under CySEC oversight, offering EU passporting benefits. Hurain Technologies builds payment, API, and blockchain infrastructure for Cyprus-based fintechs and CASPs operating under this framework.",
    regulatoryNotes: [
      "Investment firms and certain crypto-asset activities are supervised by the Cyprus Securities and Exchange Commission (CySEC).",
      "Crypto-Asset Service Providers (CASPs) registered in Cyprus fall under CySEC's registration and AML oversight regime.",
      "EU passporting allows Cyprus-licensed entities to operate across the EEA under mutual recognition frameworks.",
      "We build to these technical and reporting expectations, alongside Cyprus-based regulatory counsel.",
    ],
    focusServiceSlugs: ["blockchain-cryptocurrency-development", "payment-gateway-integration", "api-integration-services"],
    faqs: [
      { question: "Do you support CySEC CASP registration requirements?", answer: "Yes, we build the technical infrastructure — AML/KYC workflows, audit logging, custody security — commonly reviewed in a CySEC CASP registration." },
      { question: "Can you help launch a fintech platform with EU passporting in mind?", answer: "Yes, we architect for the technical standards common across EU/EEA regulatory frameworks to support passporting strategies." },
    ],
  },
  {
    slug: "estonia",
    countryName: "Estonia",
    region: "Tier 3 — Partnership & White-Label Markets",
    metaTitle: "Blockchain & Crypto Software Development Company in Estonia",
    metaDescription:
      "Blockchain, crypto exchange, and fintech software development for Estonia-based platforms under FIU and evolving EU MiCA-aligned oversight.",
    h1: "Blockchain & Crypto Development Company in Estonia",
    intro:
      "Estonia built an early reputation as a digital-first EU jurisdiction for crypto businesses, and its regulatory approach has matured alongside EU-wide frameworks such as MiCA. Hurain Technologies builds blockchain, exchange, and wallet infrastructure for Estonia-based crypto businesses navigating this transition to EU-harmonized rules.",
    regulatoryNotes: [
      "Virtual asset service providers in Estonia are supervised by the Estonian Financial Intelligence Unit (FIU), with licensing standards tightened significantly in recent years.",
      "EU-wide Markets in Crypto-Assets (MiCA) regulation increasingly shapes technical and governance expectations for crypto-asset service providers across member states, including Estonia.",
      "AML/CTF obligations require robust KYC, transaction monitoring, and travel-rule-ready infrastructure.",
      "We build to these evolving technical expectations, alongside Estonian and EU regulatory counsel.",
    ],
    focusServiceSlugs: ["blockchain-cryptocurrency-development", "crypto-exchange-wallet-development", "cybersecurity-compliance"],
    faqs: [
      { question: "Do you build MiCA-aligned technical infrastructure?", answer: "Yes, we design custody, reporting, and governance architecture aligned to the technical expectations emerging under MiCA and related EU guidance." },
      { question: "Can you support an Estonian FIU-licensed VASP?", answer: "Yes, we build the AML/KYC, audit-logging, and custody controls typically expected in an Estonian FIU licensing review." },
    ],
  },
  {
    slug: "isle-of-man",
    countryName: "Isle of Man",
    region: "Tier 3 — Partnership & White-Label Markets",
    metaTitle: "Fintech & Blockchain Software Development Company in the Isle of Man",
    metaDescription:
      "Fintech, blockchain, and payment software development for Isle of Man-based businesses under Financial Services Authority oversight.",
    h1: "Fintech & Blockchain Development Company in the Isle of Man",
    intro:
      "The Isle of Man is a long-established, reputable jurisdiction for fintech and digital business under the Isle of Man Financial Services Authority (FSA), with an early and active interest in distributed ledger technology. Hurain Technologies builds fintech, payment, and blockchain infrastructure engineered to meet the technical reliability and security standards Isle of Man-licensed businesses are expected to demonstrate.",
    regulatoryNotes: [
      "Financial and fintech businesses are licensed and supervised by the Isle of Man Financial Services Authority (FSA).",
      "The Isle of Man has an established Designated Businesses (Registration and Oversight) framework covering certain DLT and crypto-asset activity.",
      "AML/CTF requirements reference the Isle of Man's designated business AML framework.",
      "We build to these technical expectations, alongside Isle of Man-based legal counsel.",
    ],
    focusServiceSlugs: ["blockchain-cryptocurrency-development", "cybersecurity-compliance", "payment-gateway-integration"],
    faqs: [
      { question: "Do you build platforms aligned with Isle of Man FSA technical standards?", answer: "Yes, we engineer for the system reliability, security, and reporting standards Isle of Man FSA licensing reviews typically expect." },
      { question: "Can you help modernize a legacy Isle of Man-based platform?", answer: "Yes, we regularly take over and modernize legacy fintech and blockchain platforms without disrupting an existing license." },
    ],
  },
  {
    slug: "gibraltar",
    countryName: "Gibraltar",
    region: "Tier 3 — Partnership & White-Label Markets",
    metaTitle: "Blockchain & Fintech Software Development Company in Gibraltar",
    metaDescription:
      "Blockchain/DLT and fintech software development for Gibraltar-licensed businesses under the Gibraltar Financial Services Commission (GFSC) framework.",
    h1: "Blockchain & Fintech Development Company in Gibraltar",
    intro:
      "Gibraltar is one of the earliest and most respected jurisdictions for blockchain and distributed ledger technology (DLT) businesses, regulated by the Gibraltar Financial Services Commission (GFSC). Hurain Technologies builds blockchain infrastructure for GFSC DLT-licensed businesses, alongside payment and fintech platforms operating under Gibraltar's broader financial services framework.",
    regulatoryNotes: [
      "Gibraltar's DLT licensing framework, administered by the GFSC, is one of the earliest dedicated blockchain regulatory regimes globally.",
      "DLT-licensed businesses are expected to demonstrate strong governance, custody security, and operational resilience.",
      "Payment institutions and e-money issuers are also licensed and supervised by the GFSC.",
      "We build to these technical expectations, alongside Gibraltar-based legal counsel.",
    ],
    focusServiceSlugs: ["blockchain-cryptocurrency-development", "cybersecurity-compliance", "api-integration-services"],
    faqs: [
      { question: "Do you support GFSC DLT licensing technical requirements?", answer: "Yes, we build custody, governance, and audit-logging infrastructure aligned to the technical expectations of a GFSC DLT license review." },
      { question: "Can you build a payment platform for a Gibraltar-licensed institution?", answer: "Yes, we build payment processing and reconciliation infrastructure engineered around GFSC technical expectations." },
    ],
  },
  {
    slug: "mauritius",
    countryName: "Mauritius",
    region: "Tier 3 — Partnership & White-Label Markets",
    metaTitle: "Fintech & Blockchain Software Development Company in Mauritius",
    metaDescription:
      "Fintech, payments, and blockchain platform software development for Mauritius-licensed businesses under FSC regulatory oversight.",
    h1: "Fintech & Blockchain Development Company in Mauritius",
    intro:
      "Mauritius has become an increasingly popular jurisdiction for fintech and virtual-asset license structures serving African and Asian markets, regulated by the Financial Services Commission (FSC). Hurain Technologies builds fintech, payment, and blockchain platform infrastructure for Mauritius-licensed businesses using the jurisdiction as a regional base.",
    regulatoryNotes: [
      "Fintech and payment services fall under the Financial Services Commission's licensing categories, including custodian and payment intermediary services.",
      "Virtual asset and custodian services have specific FSC licensing categories introduced in recent years.",
      "Cross-border payment institutions operating from Mauritius are expected to demonstrate strong AML/CTF controls.",
      "We build to these technical expectations, alongside Mauritius-based legal counsel.",
    ],
    focusServiceSlugs: ["payment-gateway-integration", "blockchain-cryptocurrency-development", "cloud-application-modernization"],
    faqs: [
      { question: "Do you support FSC-licensed virtual asset custodian requirements?", answer: "Yes, we build custody, security, and reporting infrastructure aligned to FSC virtual asset licensing expectations." },
      { question: "Can you build a platform serving both African and Asian markets from a Mauritius base?", answer: "Yes, we design multi-region payment and platform architecture suited to operators using Mauritius as a regional hub." },
    ],
  },
];

export const countries: CountryPage[] = [
  ...baseCountries,
  ...countriesEuropeAmericas,
  ...countriesMeaApac,
];

export function getCountryBySlug(slug: string): CountryPage | undefined {
  return countries.find((country) => country.slug === slug);
}
