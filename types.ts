export interface IDomainValues{
    availableBy: string;
    likelyFree: boolean | null;
    pageTitle: string | null;
    domainNameRating: string | null;
    pagesCrawledFromRoot: number | null;
    encodedDomainUrl: string;
    externalLinks: number | null;
    lastCrawled: string | null;
    pagesToPage: number | null;
    domainUrl: string;
    pageAuthority: number | null;
    spamScore: number | null;
    domainAuthority: number | null;
    id: string;
    hidden: boolean | undefined;
    onPreview: boolean | undefined;
}
export type ServerErrorMessage = { error: string; }

export interface IUserDetails{
    uid: string;
    displayName: string | null;
    photoURL: string | null;
    email: string | null;
    lastSignInTime: string | null;
    creationTime: string | null;
    name: string | null;
    phoneNumber: string | null;
    subscriptionType?: "premium" | "standard";
    userType?: "admin" | "user";
    liked?: IDomainValues[] | null;
}

export type filterOptions = "domainName" | "availabilityDate" | "domainAuthority" | "externalLinks" | "pageAuthority" | undefined;

