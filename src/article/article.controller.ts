import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Article } from './entities/article.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { FilterArticlesDto } from './dto/filter-articles.dto';  
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

@Controller('article')  
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  
  @Post()
  @Roles('ROLE_ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleService.create(createArticleDto);
  }

  
  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,  
    @Query() filterQuery: FilterArticlesDto 
  ) {
    return this.articleService.findAll(paginationQuery, filterQuery);  
  }

  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);  
  }

  
  @Patch(':id')
  @Roles('ROLE_ADMIN') 
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async update(
    @Param('id') id: string, 
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    return this.articleService.update(+id, updateArticleDto);  
  }

  
  @Delete(':id')
  @Roles('ROLE_ADMIN')  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async remove(@Param('id') id: string) {
    return this.articleService.remove(+id);  
  }


  

  // @Roles('ROLE_ADMIN')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiBearerAuth()
  // @ApiOkResponse({ type: User })
  //   @Put(':id')
  // async update(
  //   @Param('id') userId: string,
  //   @Body() updateData: Partial<{ email: string; username: string; roleId: number }>,
  // ) {
  //   try {
  //     return await this.authService.update(Number(userId), updateData);
  //   } catch (error) {
  //     throw new NotFoundException(error.message);
  //   }
  // }
}
