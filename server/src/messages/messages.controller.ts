import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';

@ApiTags('Messages')
@Controller('api/messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  // Get All Messages
  @ApiBearerAuth()
  @ApiOkResponse({ type: Message, isArray: true })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiQuery({ name: 'group_id', required: false })
  getMessages(@Query('group_id') group_id?: string): Promise<Message[]> {
    return this.messagesService.getMessages(+group_id!);
  }

  // Create New Messages
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Message })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Request() req: any,
    @Query('group_id', ParseIntPipe) group_id: number,
  ) {
    return this.messagesService.createMessage(createMessageDto, req, group_id);
  }
}
