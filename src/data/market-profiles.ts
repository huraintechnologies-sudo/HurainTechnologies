// Country-level market context used on every country and city page:
// indirect tax, data-protection law, the payment rails an app is expected to
// support, and which mobile platform dominates. Keyed by ISO 3166-1 alpha-2.
//
// Tax rates are standard headline rates as of 2026 — they change, and B2B
// cross-border services are often reverse-charged, so pages always tell the
// reader to confirm with a local advisor. Countries not listed fall back to
// the regional defaults at the bottom of this file.

export type MobileSkew = "android" | "ios" | "balanced";

export interface MarketProfile {
  tax?: string; // e.g. "VAT 16%"
  privacyLaw?: string;
  regulator?: string;
  payments?: string[];
  mobile?: MobileSkew;
  businessLanguage?: string;
}

const EU_GDPR = "the EU General Data Protection Regulation (GDPR)";
const EU_PAY_NOTE = "SEPA Instant";

export const marketProfiles: Record<string, MarketProfile> = {
  // ---------- South Asia ----------
  IN: { tax: "GST 18% on IT services", privacyLaw: "the Digital Personal Data Protection Act, 2023 (DPDP Act)", regulator: "RBI (payments) and MeitY", payments: ["UPI", "RuPay & Visa/Mastercard cards", "Razorpay / PayU / Cashfree", "Net banking"], mobile: "android" },
  PK: { tax: "GST / provincial sales tax on services (16–18%)", privacyLaw: "sector rules from the State Bank of Pakistan and PTA (a national data-protection bill is pending)", regulator: "State Bank of Pakistan", payments: ["Raast", "JazzCash", "Easypaisa", "Debit cards"], mobile: "android" },
  BD: { tax: "VAT 15%", privacyLaw: "Bangladesh's personal-data-protection rules and Bangladesh Bank ICT guidelines", regulator: "Bangladesh Bank", payments: ["bKash", "Nagad", "Rocket", "Cards via SSLCommerz"], mobile: "android" },
  LK: { tax: "VAT 18%", privacyLaw: "the Personal Data Protection Act No. 9 of 2022", regulator: "Central Bank of Sri Lanka", payments: ["LankaQR", "Cards", "Mobile wallets (eZ Cash, mCash)"], mobile: "android" },
  NP: { tax: "VAT 13%", privacyLaw: "the Individual Privacy Act, 2018", regulator: "Nepal Rastra Bank", payments: ["eSewa", "Khalti", "Fonepay QR", "ConnectIPS"], mobile: "android" },

  // ---------- Middle East ----------
  AE: { tax: "VAT 5%", privacyLaw: "the UAE Personal Data Protection Law (Federal Decree-Law 45/2021), plus DIFC/ADGM rules in free zones", regulator: "CBUAE, VARA (Dubai virtual assets), DFSA/FSRA in free zones", payments: ["Cards & Apple Pay", "Tabby / Tamara (BNPL)", "Aani instant payments", "Cash on delivery"], mobile: "balanced", businessLanguage: "English and Arabic" },
  SA: { tax: "VAT 15%", privacyLaw: "the Saudi Personal Data Protection Law (PDPL), enforced by SDAIA", regulator: "SAMA", payments: ["mada", "Apple Pay & STC Pay", "SADAD", "Tabby / Tamara (BNPL)"], mobile: "balanced", businessLanguage: "Arabic and English" },
  QA: { tax: "no VAT yet (GCC VAT framework signed, not implemented)", privacyLaw: "Law No. 13 of 2016 on personal data privacy", regulator: "Qatar Central Bank", payments: ["NAPS debit", "Cards & Apple Pay", "QPay / Fawran instant transfers"], mobile: "balanced" },
  KW: { tax: "no VAT yet", privacyLaw: "CITRA's Data Privacy Protection Regulation", regulator: "Central Bank of Kuwait", payments: ["KNET", "Cards & Apple Pay", "Deema / Tabby (BNPL)"], mobile: "balanced" },
  BH: { tax: "VAT 10%", privacyLaw: "the Personal Data Protection Law (Law No. 30 of 2018)", regulator: "Central Bank of Bahrain", payments: ["BenefitPay", "Cards & Apple Pay", "Fawri+ transfers"], mobile: "balanced" },
  OM: { tax: "VAT 5%", privacyLaw: "the Personal Data Protection Law (Royal Decree 6/2022)", regulator: "Central Bank of Oman", payments: ["Cards", "Thawani", "OmanNet"], mobile: "balanced" },
  JO: { tax: "general sales tax 16%", privacyLaw: "the Personal Data Protection Law of 2023", regulator: "Central Bank of Jordan", payments: ["CliQ", "eFAWATEERcom", "Cards"], mobile: "android" },
  IL: { tax: "VAT 18%", privacyLaw: "the Protection of Privacy Law (Amendment 13)", regulator: "Bank of Israel / Israel Securities Authority", payments: ["Cards (Isracard, Cal)", "Bit", "PayBox"], mobile: "balanced", businessLanguage: "Hebrew and English" },
  TR: { tax: "VAT (KDV) 20%", privacyLaw: "the Personal Data Protection Law No. 6698 (KVKK)", regulator: "BDDK and the Central Bank of Türkiye", payments: ["Cards with instalments (taksit)", "Troy", "FAST instant transfers", "iyzico / PayTR"], mobile: "android", businessLanguage: "Turkish" },
  EG: { tax: "VAT 14%", privacyLaw: "the Personal Data Protection Law No. 151 of 2020", regulator: "Central Bank of Egypt", payments: ["InstaPay", "Fawry", "Meeza cards", "Vodafone Cash"], mobile: "android", businessLanguage: "Arabic and English" },

  // ---------- Africa ----------
  KE: { tax: "VAT 16%", privacyLaw: "the Data Protection Act, 2019 (enforced by the ODPC)", regulator: "Central Bank of Kenya", payments: ["M-Pesa (Daraja API)", "Airtel Money", "Pesalink", "Cards via Pesapal / Flutterwave"], mobile: "android", businessLanguage: "English and Swahili" },
  TZ: { tax: "VAT 18%", privacyLaw: "the Personal Data Protection Act, 2022 (PDPC)", regulator: "Bank of Tanzania", payments: ["M-Pesa (Vodacom)", "Mixx by Yas (Tigo Pesa)", "Airtel Money", "Selcom / AzamPay"], mobile: "android", businessLanguage: "Swahili and English" },
  UG: { tax: "VAT 18%", privacyLaw: "the Data Protection and Privacy Act, 2019", regulator: "Bank of Uganda", payments: ["MTN Mobile Money", "Airtel Money", "Cards via Flutterwave"], mobile: "android" },
  RW: { tax: "VAT 18%", privacyLaw: "Law No. 058/2021 on the protection of personal data and privacy", regulator: "National Bank of Rwanda", payments: ["MTN MoMo", "Airtel Money", "Cards"], mobile: "android" },
  ET: { tax: "VAT 15%", privacyLaw: "the Personal Data Protection Proclamation No. 1321/2024", regulator: "National Bank of Ethiopia", payments: ["telebirr", "M-Pesa Ethiopia", "Chapa", "CBE Birr"], mobile: "android" },
  NG: { tax: "VAT 7.5%", privacyLaw: "the Nigeria Data Protection Act, 2023 (NDPC)", regulator: "Central Bank of Nigeria", payments: ["Paystack", "Flutterwave", "NIP bank transfers", "OPay / Moniepoint"], mobile: "android" },
  GH: { tax: "VAT 15% plus statutory levies", privacyLaw: "the Data Protection Act, 2012 (Act 843)", regulator: "Bank of Ghana", payments: ["MTN MoMo", "Telecel Cash", "GhIPSS instant pay", "Paystack / Hubtel"], mobile: "android" },
  ZA: { tax: "VAT 15%", privacyLaw: "the Protection of Personal Information Act (POPIA)", regulator: "SARB and the FSCA", payments: ["Cards", "PayShap", "Instant EFT (Ozow)", "PayFast / Yoco"], mobile: "android" },
  MA: { tax: "VAT (TVA) 20%", privacyLaw: "Law 09-08 on personal data (CNDP)", regulator: "Bank Al-Maghrib", payments: ["CMI cards", "Cash on delivery", "Mobile wallets"], mobile: "android", businessLanguage: "Arabic and French" },
  DZ: { tax: "VAT (TVA) 19%", privacyLaw: "Law 18-07 on personal data protection", regulator: "Bank of Algeria", payments: ["CIB cards", "Edahabia (Algérie Poste)", "Cash on delivery"], mobile: "android", businessLanguage: "Arabic and French" },
  TN: { tax: "VAT (TVA) 19%", privacyLaw: "Organic Law 2004-63 on personal data (INPDP)", regulator: "Central Bank of Tunisia", payments: ["Cards via ClicToPay", "e-Dinar", "Cash on delivery"], mobile: "android", businessLanguage: "Arabic and French" },
  SN: { tax: "VAT 18%", privacyLaw: "Law 2008-12 on personal data (CDP)", regulator: "BCEAO", payments: ["Wave", "Orange Money", "Free Money"], mobile: "android", businessLanguage: "French" },
  CI: { tax: "VAT 18%", privacyLaw: "Law 2013-450 on personal data (ARTCI)", regulator: "BCEAO", payments: ["Orange Money", "MTN MoMo", "Wave", "Moov Money"], mobile: "android", businessLanguage: "French" },
  CM: { tax: "VAT 19.25%", privacyLaw: "the 2024 law on personal data protection", regulator: "BEAC / COBAC", payments: ["MTN MoMo", "Orange Money"], mobile: "android", businessLanguage: "French and English" },
  ZM: { tax: "VAT 16%", privacyLaw: "the Data Protection Act, 2021", regulator: "Bank of Zambia", payments: ["MTN MoMo", "Airtel Money", "Zamtel Kwacha"], mobile: "android" },
  ZW: { tax: "VAT 15.5%", privacyLaw: "the Cyber and Data Protection Act, 2021", regulator: "Reserve Bank of Zimbabwe", payments: ["EcoCash", "OneMoney", "ZIPIT"], mobile: "android" },
  BW: { tax: "VAT 14%", privacyLaw: "the Data Protection Act, 2024", regulator: "Bank of Botswana", payments: ["Orange Money", "MyZaka", "Cards"], mobile: "android" },
  MU: { tax: "VAT 15%", privacyLaw: "the Data Protection Act 2017", regulator: "Bank of Mauritius / FSC", payments: ["Juice", "MCB cards", "my.t money"], mobile: "android" },
  NA: { tax: "VAT 15%", privacyLaw: "sector rules (a Data Protection Bill is in progress)", regulator: "Bank of Namibia", payments: ["Cards", "Bank EFT", "Mobile wallets"], mobile: "android" },
  MZ: { tax: "VAT (IVA) 16%", privacyLaw: "sector rules under the Electronic Transactions Law", regulator: "Banco de Moçambique", payments: ["M-Pesa (Vodacom)", "e-Mola", "mKesh"], mobile: "android", businessLanguage: "Portuguese" },
  AO: { tax: "VAT (IVA) 14%", privacyLaw: "Law 22/11 on personal data", regulator: "Banco Nacional de Angola", payments: ["Multicaixa Express", "Unitel Money"], mobile: "android", businessLanguage: "Portuguese" },
  CD: { tax: "VAT 16%", privacyLaw: "the 2023 Digital Code", regulator: "Banque Centrale du Congo", payments: ["M-Pesa", "Orange Money", "Airtel Money"], mobile: "android", businessLanguage: "French" },

  // ---------- Europe ----------
  GB: { tax: "VAT 20%", privacyLaw: "UK GDPR and the Data Protection Act 2018", regulator: "FCA and the ICO", payments: ["Cards & Apple/Google Pay", "Open Banking (Faster Payments)", "Direct Debit (Bacs)", "Klarna / Clearpay"], mobile: "ios" },
  IE: { tax: "VAT 23%", privacyLaw: EU_GDPR, regulator: "Central Bank of Ireland / DPC", payments: ["Cards & Apple Pay", EU_PAY_NOTE, "Revolut Pay"], mobile: "balanced" },
  DE: { tax: "VAT (USt) 19%", privacyLaw: `${EU_GDPR} and the BDSG`, regulator: "BaFin", payments: ["SEPA Direct Debit", "PayPal", "Klarna", "Cards & Apple Pay"], mobile: "android", businessLanguage: "German" },
  FR: { tax: "VAT (TVA) 20%", privacyLaw: `${EU_GDPR} (CNIL)`, regulator: "ACPR / AMF", payments: ["Cartes Bancaires", "PayPal", "Apple Pay", EU_PAY_NOTE], mobile: "balanced", businessLanguage: "French" },
  NL: { tax: "VAT (BTW) 21%", privacyLaw: EU_GDPR, regulator: "DNB / AFM", payments: ["iDEAL (moving to Wero)", "Cards", "Klarna"], mobile: "balanced", businessLanguage: "Dutch and English" },
  BE: { tax: "VAT 21%", privacyLaw: EU_GDPR, regulator: "NBB / FSMA", payments: ["Bancontact / Payconiq", "Cards", EU_PAY_NOTE], mobile: "balanced" },
  LU: { tax: "VAT 17%", privacyLaw: EU_GDPR, regulator: "CSSF", payments: ["Cards", "Digicash / Payconiq", EU_PAY_NOTE], mobile: "balanced" },
  ES: { tax: "VAT (IVA) 21%", privacyLaw: `${EU_GDPR} and the LOPDGDD`, regulator: "Banco de España / CNMV", payments: ["Bizum", "Cards", "PayPal"], mobile: "android", businessLanguage: "Spanish" },
  PT: { tax: "VAT (IVA) 23%", privacyLaw: EU_GDPR, regulator: "Banco de Portugal", payments: ["MB WAY", "Multibanco references", "Cards"], mobile: "android", businessLanguage: "Portuguese" },
  IT: { tax: "VAT (IVA) 22%", privacyLaw: `${EU_GDPR} (Garante Privacy)`, regulator: "Banca d'Italia / CONSOB", payments: ["Cards", "PayPal", "Satispay", "Bancomat Pay"], mobile: "android", businessLanguage: "Italian" },
  AT: { tax: "VAT 20%", privacyLaw: EU_GDPR, regulator: "FMA", payments: ["EPS", "Cards", "Klarna"], mobile: "balanced", businessLanguage: "German" },
  CH: { tax: "VAT 8.1%", privacyLaw: "the revised Federal Act on Data Protection (revFADP)", regulator: "FINMA", payments: ["TWINT", "Cards", "QR-bill"], mobile: "ios", businessLanguage: "German, French and Italian" },
  SE: { tax: "VAT (moms) 25%", privacyLaw: EU_GDPR, regulator: "Finansinspektionen", payments: ["Swish", "Klarna", "BankID-verified payments", "Cards"], mobile: "ios" },
  DK: { tax: "VAT (moms) 25%", privacyLaw: EU_GDPR, regulator: "Finanstilsynet", payments: ["MobilePay", "Dankort", "Cards"], mobile: "ios" },
  NO: { tax: "VAT (MVA) 25%", privacyLaw: "GDPR (via the EEA) and the Personal Data Act", regulator: "Finanstilsynet", payments: ["Vipps MobilePay", "BankAxept", "Cards"], mobile: "ios" },
  FI: { tax: "VAT (ALV) 25.5%", privacyLaw: EU_GDPR, regulator: "FIN-FSA", payments: ["MobilePay", "Online bank payments", "Cards"], mobile: "balanced" },
  IS: { tax: "VAT 24%", privacyLaw: "GDPR (via the EEA)", regulator: "Central Bank of Iceland", payments: ["Cards", "Aur / Kass apps"], mobile: "ios" },
  PL: { tax: "VAT 23%", privacyLaw: EU_GDPR, regulator: "KNF", payments: ["BLIK", "Przelewy24", "PayU", "Cards"], mobile: "android", businessLanguage: "Polish" },
  CZ: { tax: "VAT 21%", privacyLaw: EU_GDPR, regulator: "Czech National Bank", payments: ["Cards", "QR bank transfers", "GoPay / Comgate"], mobile: "android" },
  SK: { tax: "VAT 23%", privacyLaw: EU_GDPR, regulator: "National Bank of Slovakia", payments: ["Cards", "Bank transfers", "GoPay"], mobile: "android" },
  HU: { tax: "VAT (ÁFA) 27%", privacyLaw: EU_GDPR, regulator: "Magyar Nemzeti Bank", payments: ["Cards", "Instant payments (AFR)", "SimplePay"], mobile: "android" },
  RO: { tax: "VAT 21%", privacyLaw: EU_GDPR, regulator: "National Bank of Romania", payments: ["Cards", "Netopia / PayU", "Cash on delivery"], mobile: "android" },
  BG: { tax: "VAT 20%", privacyLaw: EU_GDPR, regulator: "Bulgarian National Bank", payments: ["Cards", "ePay.bg", "Cash on delivery"], mobile: "android" },
  GR: { tax: "VAT 24%", privacyLaw: EU_GDPR, regulator: "Bank of Greece", payments: ["Cards", "IRIS instant payments", "PayPal"], mobile: "android" },
  HR: { tax: "VAT (PDV) 25%", privacyLaw: EU_GDPR, regulator: "Croatian National Bank", payments: ["Cards", EU_PAY_NOTE, "KEKS Pay"], mobile: "android" },
  SI: { tax: "VAT (DDV) 22%", privacyLaw: EU_GDPR, regulator: "Bank of Slovenia", payments: ["Cards", "Flik", EU_PAY_NOTE], mobile: "android" },
  EE: { tax: "VAT 24%", privacyLaw: EU_GDPR, regulator: "Finantsinspektsioon", payments: ["Bank links", "Cards", "Montonio"], mobile: "balanced" },
  LV: { tax: "VAT (PVN) 21%", privacyLaw: EU_GDPR, regulator: "Latvijas Banka", payments: ["Bank links", "Cards"], mobile: "android" },
  LT: { tax: "VAT (PVM) 21%", privacyLaw: EU_GDPR, regulator: "Bank of Lithuania", payments: ["Bank links (Paysera)", "Cards"], mobile: "android" },
  CY: { tax: "VAT 19%", privacyLaw: EU_GDPR, regulator: "CySEC / Central Bank of Cyprus", payments: ["Cards", "JCC", EU_PAY_NOTE], mobile: "balanced" },
  MT: { tax: "VAT 18%", privacyLaw: EU_GDPR, regulator: "MFSA", payments: ["Cards", EU_PAY_NOTE, "Revolut"], mobile: "balanced" },
  UA: { tax: "VAT 20%", privacyLaw: "the Law of Ukraine on Personal Data Protection", regulator: "National Bank of Ukraine", payments: ["Cards (monobank, PrivatBank)", "Apple/Google Pay", "LiqPay"], mobile: "android", businessLanguage: "Ukrainian and English" },
  RU: { tax: "VAT 22%", privacyLaw: "Federal Law 152-FZ on Personal Data (with data-localisation rules)", regulator: "Bank of Russia", payments: ["Mir cards", "SBP fast payments", "YooMoney"], mobile: "android", businessLanguage: "Russian" },
  GE: { tax: "VAT 18%", privacyLaw: "the Law on Personal Data Protection (2023)", regulator: "National Bank of Georgia", payments: ["Cards (TBC, Bank of Georgia)", "Apple Pay"], mobile: "android" },
  AM: { tax: "VAT 20%", privacyLaw: "the Law on Protection of Personal Data", regulator: "Central Bank of Armenia", payments: ["ArCa cards", "Idram", "Telcell"], mobile: "android" },
  AZ: { tax: "VAT 18%", privacyLaw: "the Law on Personal Data", regulator: "Central Bank of Azerbaijan", payments: ["Cards", "MilliÖN / E-manat terminals"], mobile: "android" },
  KZ: { tax: "VAT 16%", privacyLaw: "the Law on Personal Data and Its Protection", regulator: "Agency for Regulation and Development of the Financial Market (ARDFM); AFSA in AIFC", payments: ["Kaspi QR", "Halyk", "Cards"], mobile: "android", businessLanguage: "Kazakh and Russian" },
  UZ: { tax: "VAT 12%", privacyLaw: "the Law on Personal Data (with localisation rules)", regulator: "Central Bank of Uzbekistan", payments: ["Uzcard", "Humo", "Click", "Payme"], mobile: "android" },

  // ---------- East & South-East Asia / Pacific ----------
  SG: { tax: "GST 9%", privacyLaw: "the Personal Data Protection Act 2012 (PDPA)", regulator: "Monetary Authority of Singapore (MAS)", payments: ["PayNow", "Cards & Apple Pay", "GrabPay", "NETS"], mobile: "balanced" },
  MY: { tax: "Service Tax 8% (SST)", privacyLaw: "the Personal Data Protection Act 2010 (amended 2024)", regulator: "Bank Negara Malaysia / Securities Commission", payments: ["DuitNow QR", "FPX online banking", "Touch 'n Go eWallet", "GrabPay"], mobile: "android", businessLanguage: "Malay and English" },
  ID: { tax: "VAT (PPN) 12% (11% effective on most services)", privacyLaw: "Law No. 27 of 2022 on Personal Data Protection", regulator: "Bank Indonesia / OJK", payments: ["QRIS", "GoPay", "OVO", "DANA", "Virtual accounts"], mobile: "android", businessLanguage: "Bahasa Indonesia" },
  TH: { tax: "VAT 7%", privacyLaw: "the Personal Data Protection Act B.E. 2562 (PDPA)", regulator: "Bank of Thailand / SEC", payments: ["PromptPay", "TrueMoney", "Cards", "Mobile banking"], mobile: "android", businessLanguage: "Thai" },
  VN: { tax: "VAT 10% (temporarily 8% on many items)", privacyLaw: "the Personal Data Protection Law (effective 2026) and Decree 13/2023", regulator: "State Bank of Vietnam", payments: ["VietQR / Napas", "MoMo", "ZaloPay", "VNPay"], mobile: "android", businessLanguage: "Vietnamese" },
  PH: { tax: "VAT 12%", privacyLaw: "the Data Privacy Act of 2012", regulator: "Bangko Sentral ng Pilipinas", payments: ["GCash", "Maya", "InstaPay / QR Ph", "Cards"], mobile: "android" },
  MM: { tax: "commercial tax 5%", privacyLaw: "sector rules (no comprehensive data-protection law)", regulator: "Central Bank of Myanmar", payments: ["KBZPay", "Wave Money", "AYA Pay"], mobile: "android" },
  KH: { tax: "VAT 10%", privacyLaw: "sector rules (a draft personal-data law is pending)", regulator: "National Bank of Cambodia", payments: ["Bakong / KHQR", "ABA Pay", "Wing"], mobile: "android" },
  CN: { tax: "VAT 6% on most IT services", privacyLaw: "the Personal Information Protection Law (PIPL) with data-export rules", regulator: "PBOC / CAC", payments: ["Alipay", "WeChat Pay", "UnionPay"], mobile: "android", businessLanguage: "Mandarin" },
  HK: { tax: "no VAT or GST", privacyLaw: "the Personal Data (Privacy) Ordinance (PDPO)", regulator: "HKMA / SFC", payments: ["FPS", "Octopus", "AlipayHK / WeChat Pay HK", "Cards"], mobile: "ios", businessLanguage: "English and Cantonese" },
  TW: { tax: "business tax (VAT) 5%", privacyLaw: "the Personal Data Protection Act", regulator: "Financial Supervisory Commission", payments: ["LINE Pay", "JKOPAY", "Cards", "Convenience-store payment"], mobile: "balanced", businessLanguage: "Mandarin" },
  JP: { tax: "consumption tax 10%", privacyLaw: "the Act on the Protection of Personal Information (APPI)", regulator: "Financial Services Agency (FSA)", payments: ["Cards (JCB, Visa)", "PayPay", "Konbini payments", "Suica / IC cards"], mobile: "ios", businessLanguage: "Japanese" },
  KR: { tax: "VAT 10%", privacyLaw: "the Personal Information Protection Act (PIPA)", regulator: "Financial Services Commission", payments: ["KakaoPay", "Naver Pay", "Toss", "Cards"], mobile: "android", businessLanguage: "Korean" },
  MN: { tax: "VAT 10%", privacyLaw: "the Law on Personal Data Protection (2021)", regulator: "Bank of Mongolia", payments: ["QPay", "SocialPay", "Cards"], mobile: "android" },
  AU: { tax: "GST 10%", privacyLaw: "the Privacy Act 1988 and Australian Privacy Principles", regulator: "ASIC / APRA / AUSTRAC", payments: ["Cards & Apple Pay", "PayID / PayTo (NPP)", "BPAY", "Afterpay"], mobile: "ios" },
  NZ: { tax: "GST 15%", privacyLaw: "the Privacy Act 2020", regulator: "FMA / Reserve Bank of NZ", payments: ["Cards & Apple Pay", "Account-to-account (open banking)", "Afterpay / Laybuy"], mobile: "ios" },
  FJ: { tax: "VAT 15%", privacyLaw: "sector rules (no comprehensive data-protection law)", regulator: "Reserve Bank of Fiji", payments: ["M-PAiSA", "MyCash", "Cards"], mobile: "android" },

  // ---------- Americas ----------
  US: { tax: "no federal VAT; state and local sales tax varies (SaaS taxable in some states)", privacyLaw: "sector laws (HIPAA, GLBA, COPPA) plus state laws such as the CCPA/CPRA", regulator: "SEC, CFPB, state regulators and FinCEN", payments: ["Cards & Apple Pay", "ACH / RTP / FedNow", "PayPal & Venmo", "Cash App Pay"], mobile: "ios" },
  CA: { tax: "GST 5% plus provincial HST/PST (up to 15% combined)", privacyLaw: "PIPEDA, plus Quebec's Law 25", regulator: "OSFI / FINTRAC / provincial securities regulators", payments: ["Interac e-Transfer & debit", "Cards & Apple Pay", "PayPal"], mobile: "ios", businessLanguage: "English and French" },
  MX: { tax: "VAT (IVA) 16%", privacyLaw: "the Federal Law on Protection of Personal Data Held by Private Parties (2025)", regulator: "CNBV / Banxico", payments: ["SPEI / CoDi", "OXXO Pay (cash)", "Cards with meses sin intereses", "Mercado Pago"], mobile: "android", businessLanguage: "Spanish" },
  BR: { tax: "ISS/PIS/COFINS today, moving to CBS/IBS under the 2026–2033 tax reform", privacyLaw: "the LGPD (Lei Geral de Proteção de Dados)", regulator: "Banco Central do Brasil / ANPD", payments: ["Pix", "Boleto", "Cards with parcelamento (instalments)", "Mercado Pago"], mobile: "android", businessLanguage: "Portuguese" },
  AR: { tax: "VAT (IVA) 21%", privacyLaw: "Law 25.326 on Personal Data Protection", regulator: "BCRA / CNV", payments: ["Mercado Pago", "Transferencias 3.0 QR", "Cards in cuotas"], mobile: "android", businessLanguage: "Spanish" },
  CL: { tax: "VAT (IVA) 19%", privacyLaw: "Law 19.628, being replaced by Law 21.719 (new data-protection agency)", regulator: "CMF", payments: ["Webpay (Transbank)", "Khipu transfers", "Mercado Pago"], mobile: "android", businessLanguage: "Spanish" },
  CO: { tax: "VAT (IVA) 19%", privacyLaw: "Law 1581 of 2012 (Habeas Data)", regulator: "Superintendencia Financiera", payments: ["PSE", "Nequi", "Daviplata", "Bre-B instant payments"], mobile: "android", businessLanguage: "Spanish" },
  PE: { tax: "IGV 18%", privacyLaw: "Law 29733 on Personal Data Protection", regulator: "SBS", payments: ["Yape", "Plin", "Cards", "PagoEfectivo"], mobile: "android", businessLanguage: "Spanish" },
  EC: { tax: "VAT (IVA) 15%", privacyLaw: "the Organic Law on Personal Data Protection (2021)", regulator: "Superintendencia de Bancos", payments: ["Cards", "DeUna", "Bank transfers"], mobile: "android", businessLanguage: "Spanish" },
  UY: { tax: "VAT (IVA) 22%", privacyLaw: "Law 18.331 on Personal Data Protection", regulator: "Banco Central del Uruguay", payments: ["Cards", "Mercado Pago", "Abitab / Redpagos"], mobile: "android", businessLanguage: "Spanish" },
  PY: { tax: "VAT (IVA) 10%", privacyLaw: "sector rules (a data-protection law is in progress)", regulator: "Banco Central del Paraguay", payments: ["Cards", "Tigo Money", "Bancard"], mobile: "android", businessLanguage: "Spanish" },
  BO: { tax: "VAT (IVA) 13%", privacyLaw: "constitutional habeas data rules", regulator: "ASFI", payments: ["QR Simple", "Tigo Money", "Cards"], mobile: "android", businessLanguage: "Spanish" },
  VE: { tax: "VAT (IVA) 16%", privacyLaw: "constitutional habeas data rules", regulator: "SUDEBAN", payments: ["Pago Móvil", "Cards", "Zelle (USD)"], mobile: "android", businessLanguage: "Spanish" },
  CR: { tax: "VAT (IVA) 13%", privacyLaw: "Law 8968 on personal data (PRODHAB)", regulator: "SUGEF", payments: ["SINPE Móvil", "Cards"], mobile: "android", businessLanguage: "Spanish" },
  PA: { tax: "ITBMS 7%", privacyLaw: "Law 81 of 2019 on personal data", regulator: "Superintendencia de Bancos", payments: ["Yappy", "Cards", "ACH Xpress"], mobile: "android", businessLanguage: "Spanish" },
  GT: { tax: "VAT (IVA) 12%", privacyLaw: "sector rules (no comprehensive data-protection law)", regulator: "Superintendencia de Bancos", payments: ["Cards", "Bank transfers", "Tigo Money"], mobile: "android", businessLanguage: "Spanish" },
  DO: { tax: "ITBIS 18%", privacyLaw: "Law 172-13 on personal data", regulator: "Superintendencia de Bancos", payments: ["Cards", "Bank transfers", "tPago"], mobile: "android", businessLanguage: "Spanish" },
  JM: { tax: "GCT 15%", privacyLaw: "the Data Protection Act, 2020", regulator: "Bank of Jamaica", payments: ["Cards", "Lynk", "JAM-DEX"], mobile: "android" },
  TT: { tax: "VAT 12.5%", privacyLaw: "the Data Protection Act (partially in force)", regulator: "Central Bank of Trinidad and Tobago", payments: ["Cards", "WiPay", "Linx debit"], mobile: "android" },
};

type Region = "africa" | "europe" | "middle-east" | "asia" | "oceania" | "latam" | "north-america" | "caribbean";

const regionDefaults: Record<Region, MarketProfile> = {
  africa: { payments: ["Mobile money wallets", "Local debit cards", "Bank transfers"], mobile: "android" },
  europe: { payments: ["Cards & Apple/Google Pay", "SEPA or local bank transfers", "PayPal"], mobile: "balanced" },
  "middle-east": { payments: ["Cards & Apple Pay", "Local instant bank transfers", "Cash on delivery"], mobile: "balanced" },
  asia: { payments: ["QR-code wallets", "Local debit cards", "Bank transfers"], mobile: "android" },
  oceania: { payments: ["Cards", "Mobile wallets", "Bank transfers"], mobile: "android" },
  latam: { payments: ["Cards with instalments", "Cash vouchers", "Local instant transfers"], mobile: "android" },
  "north-america": { payments: ["Cards & Apple Pay", "Bank transfers"], mobile: "ios" },
  caribbean: { payments: ["Cards", "Bank transfers", "Mobile wallets"], mobile: "android" },
};

const MIDDLE_EAST = new Set(["AE", "SA", "QA", "KW", "BH", "OM", "JO", "LB", "IQ", "IR", "SY", "YE", "PS", "IL", "TR"]);
const CARIBBEAN_PREFIX = /^America\/(Anguilla|Antigua|Aruba|Barbados|Cayman|Curacao|Dominica|Grenada|Guadeloupe|Havana|Jamaica|Martinique|Montserrat|Nassau|Port_of_Spain|Port-au-Prince|Puerto_Rico|Santo_Domingo|St_|Tortola|Kralendijk|Lower_Princes|Marigot)/;

export function regionFor(code: string | null | undefined, timezone: string | null | undefined): Region {
  if (code && MIDDLE_EAST.has(code)) return "middle-east";
  if (code === "CY") return "europe"; // EU member on Asia/Nicosia time
  if (code === "US" || code === "CA") return "north-america";
  const tz = timezone || "";
  if (tz.startsWith("Africa/")) return "africa";
  if (tz.startsWith("Europe/") || tz.startsWith("Atlantic/Reykjavik") || tz.startsWith("Atlantic/Faroe") || tz.startsWith("Atlantic/Madeira") || tz.startsWith("Atlantic/Canary")) return "europe";
  if (CARIBBEAN_PREFIX.test(tz) || tz.startsWith("Atlantic/Bermuda")) return "caribbean";
  if (tz.startsWith("America/")) return "latam";
  if (tz.startsWith("Australia/") || tz.startsWith("Pacific/")) return "oceania";
  return "asia";
}

export const regionLabels: Record<Region, string> = {
  africa: "Africa",
  europe: "Europe",
  "middle-east": "Middle East",
  asia: "Asia",
  oceania: "Oceania & Pacific",
  latam: "Latin America",
  "north-america": "North America",
  caribbean: "Caribbean",
};

export function marketProfileFor(code: string | null | undefined, timezone: string | null | undefined): MarketProfile & { region: Region } {
  const region = regionFor(code, timezone);
  const specific = (code && marketProfiles[code]) || {};
  return { ...regionDefaults[region], ...specific, region };
}
