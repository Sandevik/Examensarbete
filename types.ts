export interface IDomainValues{
    availableBy: string;
    likelyFree: boolean;
    pageTitle: string;
    domainNameRating: string;
    pagesCrawledFromRoot: number;
    encodedDomainUrl: string;
    externalLinks: number;
    lastCrawled: string;
    pagesToPage: number;
    domainUrl: string;
    pageAuthority: string;
    spamScore: number;
    domainAuthority: number;
    id?: string;
}

export type ServerErrorMessage = { error: string; }