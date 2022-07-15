import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Menu} from "./entities/menu.entity";

@Controller('menu')
@ApiTags('Menu CRUD Api')
export class MenuController {
  constructor(
      private readonly menuService: MenuService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '메뉴 생성 API', description: '메뉴를 생성 한다.' })
  @ApiCreatedResponse({description: '생성 결과'})
  async create(
    @Body() adminInput: CreateMenuDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Menu> {
    return this.menuService.create(adminInput, file);
  }

  @Get()
  @ApiOperation({ summary: '전체 메뉴 목록 조회 API', description: '전체 메뉴 목록을 조회한다.' })
  @ApiCreatedResponse({description: '조회 결과'})
  async findAll(): Promise<Menu[]> {
    return await this.menuService.findAll();
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '메뉴 수정 API', description: '메뉴를 수정한다.' })
  @ApiCreatedResponse({description: '수정 결과'})
  async update(
      @Param('id') id: number,
      @Body() updateMenuDto: UpdateMenuDto
  ) {
    return await this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '메뉴 삭제 API', description: '메뉴를 삭제한다.' })
  @ApiCreatedResponse({description: '삭제 결과'})
  async remove(
      @Param('id') id: number
  ) {
    return await this.menuService.remove(id);
  }
}