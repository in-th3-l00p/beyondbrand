interface Metric {
    year: number;
    revenue: number;
    profit: number;
    debt: number;
    long_term_assets: number;
    short_term_assets: number;
    equity: number;
    employees: number;
}

interface Email {
    address: string;
    usage: string;
}
interface Phone {
    number: string;
    usage: string;
}

export default interface Business {
    id: number;
    name: string;
    emails: Email[];
    logo: string;
    worldwide: boolean;
    countries?: string[];
    phones: Phone[];
    website: string;
    metrics: Metric[];
}