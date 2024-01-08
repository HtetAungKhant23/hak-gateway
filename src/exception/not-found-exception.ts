import { Catch, NotFoundException } from "@nestjs/common";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements 