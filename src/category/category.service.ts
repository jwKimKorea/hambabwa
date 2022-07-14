import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {CreateCategoryExcelDto} from "./dto/create-category-excel.dto";
import {CommonService} from "../common/common.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./entities/category.entity";
import {TreeRepository} from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    private readonly commonService: CommonService,
    @InjectRepository(Category)
    private readonly categoryRepository: TreeRepository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async createByExcel(file: Express.Multer.File) {
    const rows: CreateCategoryExcelDto[] = this.commonService.uploadExcel(file);
    let insertRows: Category[] = [];
    for (const row of rows) {
      const { code, title, parent } = row;
      const children = rows
          .filter(row => row.parent === code)
          .map(row => this.categoryRepository.create({
            code: row.code,
            title: row.title
          }));

      const rowData = this.categoryRepository.create({
        code,
        title,
        children
      });
      insertRows.push(rowData);
    }
    await this.categoryRepository.save(insertRows);
  }

  async findAll() {
    return await this.categoryRepository.findTrees();
  }

  async findOne(code: string) {
    return await this.categoryRepository.findOne({
      relations: ['parent', 'children'],
      where: { code }
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
