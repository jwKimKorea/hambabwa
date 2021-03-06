import {classToPlain, Exclude, Expose} from "class-transformer";
import {HttpStatus} from "@nestjs/common";

export class CommonResponse<T> {
    @Exclude() private readonly statusCode: number;
    @Exclude() private readonly message: string;
    @Exclude() private readonly data: Record<string, any>;

    constructor(status: number, data: T) {
        this.statusCode = status;
        this.message = HttpStatus[status];
        this.data = classToPlain(data);
    }

    @Expose()
    get getStatusCode(): number {
        return this.statusCode;
    }

    @Expose()
    get getMessage(): string {
        return this.message;
    }

    @Expose()
    get getData(): Record<string, any> {
        return this.data;
    }
}