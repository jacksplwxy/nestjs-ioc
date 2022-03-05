import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Parse,
  Headers,
} from '../core/controllerDecorators';
import { UsersService } from '../provider/users.provider'

@Controller('/users')
export default class Users {
  constructor(private usersService: UsersService) { }
  @Get('/')
  getAllUsers(
    @Headers('authorization') auth: string,
    @Query('id') userId: string,
  ) {
    return this.usersService.getAllUsers(auth, userId)
  }

  @Post('/')
  createUser(
    @Headers('authorization') auth: string,
    @Body('name') name: string,
    @Body('password') psd: string,
    @Parse('number') @Body('gender') gender: number, // 0 | 1
  ) {
    return this.usersService.createUser(auth, name, gender)
  }
}
