import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from '../../auth/models/enums/roles.enum';
import { CreateModelDto } from '../dto/cars.model.req.dto';
import { CarsService } from './cars.service';

@ApiTags('Cars')
@ApiBearerAuth()
@Controller('cars')
export class Cars {
  constructor(private readonly carsService: CarsService) {}
  @Post(':brandId/models')
  @UseGuards(RolesGuard)
  @Roles(UserRole.MANAGER)
  async addModelToBrand(
    @Param('brandId') brandId: string,
    @Body() createModelDto: CreateModelDto,
  ) {
    if (!brandId) {
      throw new ForbiddenException('Invalid brand ID');
    }
    return await this.carsService.addModelToBrand(brandId, createModelDto);
  }
  @Get('brands')
  async getAllBrands() {
    return await this.carsService.getAllBrands();
  }
  @Get('brands/:brandId/models')
  async getModelsByBrand(@Param('brandId') brandId: string) {
    return await this.carsService.getModelsByBrand(brandId);
  }
}
