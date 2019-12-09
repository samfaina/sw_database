import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DatabaseService } from './database.service';
import { OperationDto } from './models/OperationDto';
import { Site } from './models/Site';

@Controller()
export class DatabaseController {
  constructor(private readonly dbService: DatabaseService) {}

  @MessagePattern('findAll')
  async findAll(): Promise<Site[]> {
    return this.dbService.findAllSites();
  }

  @MessagePattern('findById')
  async findById(id: number | string): Promise<Site> {
    return this.dbService.findSiteById(id);
  }

  @MessagePattern('markAsRead')
  async markAllAsRead(): Promise<OperationDto> {
    return this.dbService.markAllAsReaded();
  }

  @MessagePattern('updateSite')
  async updateSite(site: Site): Promise<OperationDto> {
    return this.dbService.updateSite(site);
  }

  @MessagePattern('insertSite')
  async insertSite(site: Site): Promise<OperationDto> {
    return this.dbService.insertSite(site);
  }

  @MessagePattern('deleteSite')
  async deleteSite(id: number | string): Promise<OperationDto> {
    return this.dbService.deleteSite(id);
  }
}
