import { CategoryService } from '@category/category.service';
import { Controller, Get, Req } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async getAll(@Req() request: any): Promise<any> {
    return await this.categoryService.getAll(request.user.id);
  }
}
