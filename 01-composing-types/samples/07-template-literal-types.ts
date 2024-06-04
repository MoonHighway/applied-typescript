// -- Template literal types --

type Country = "Spain";

type Greeting = `Welcome to ${Country}!`;

const welcome: Greeting = "Welcome to Spain!";

// -- Template literal type with unions --

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

// ----

type Language = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Language}_${AllLocaleIDs}`;

// type LocaleMessageIDs = "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" | "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id" | "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"
