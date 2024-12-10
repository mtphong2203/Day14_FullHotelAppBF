export class Response<T> {
    public data: T[] = [];
    public page: PageInfo;
    public links: Link[] = [];

    constructor(page: PageInfo) {
        this.page = page;
    }
}

export class PageInfo {
    public size: number;
    public totalElements: number;
    public totalPages: number;
    public number: number;

    constructor(size: number, totalElements: number, totalPages: number, number: number) {
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.number = number;
    }
}

export class Link {
    public rel: string;
    public href: string;

    constructor(rel: string, href: string) {
        this.rel = rel;
        this.href = href;
    }
}