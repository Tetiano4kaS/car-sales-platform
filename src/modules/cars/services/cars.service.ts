import { Injectable } from '@nestjs/common';

import { ModelEntity } from '../../../database/entities/car.models.entity';
import { CarBrandRepository } from '../../repository/services/car-brand.repository';
import { CarModelsRepository } from '../../repository/services/car-models.repository';
import { CreateModelDto } from '../dto/cars.model.req.dto';

@Injectable()
export class CarsService {
  constructor(
    private readonly carsModelRepository: CarModelsRepository,
    private readonly carsBrandRepository: CarBrandRepository,
  ) {}
  async addModelToBrand(
    brandId: string,
    createModelDto: CreateModelDto,
  ): Promise<ModelEntity> {
    const brand = await this.carsBrandRepository.findOneBy({ id: brandId });
    if (!brand) {
      throw new Error('Brand not found');
    }
    const model = this.carsModelRepository.create({ ...createModelDto, brand });
    return await this.carsModelRepository.save(model);
  }

  async getAllBrands() {
    return await this.carsBrandRepository.find();
  }

  async getModelsByBrand(brandId: string) {
    return await this.carsModelRepository.find({
      where: { brand: { id: brandId } },
    });
  }
}
