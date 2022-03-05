import { Controller, Get, Query, Post, Body, Parse } from '../core/controllerDecorators';
import { indexService } from '../provider/index.provider'

@Controller('/index')
export default class Index {
  constructor(private indexService: indexService) { }

  @Get('/')
  index(@Parse('number') @Query('id') id: number) {
    return this.indexService.getResult(id);
  }
  

  @Post('/login')
  login(
    @Body() body: { name: string; password: string },
    @Body('name') name: string,
    @Body('password') psd: string,
  ) {
    return this.indexService.login(name,psd);
  }
}
