import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: '任务标题', type: String, default: '新任务' })
  @IsNotEmpty({ message: '标题不能为空' })
  @IsString({ message: '标题必须是字符串' })
  title: string;

  @ApiProperty({ description: '任务标题', type: String })
  description?: string;

  @ApiProperty({ description: '任务是否完成', type: Boolean })
  done?: boolean;
}
